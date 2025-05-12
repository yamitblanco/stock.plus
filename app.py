from flask import Flask, render_template, request, redirect, url_for, session, flash
import sqlite3

app = Flask(__name__)
app.secret_key = 'clave_secreta_super_segura'


def connect_db():
    # Establece la conexión con la base de datos (si no existe, la crea)
    conn = sqlite3.connect('stock_plus.db')
    return conn



# Ruta raíz
@app.route('/')
def index():
    return render_template('inicio.html')


# Iniciar sesión
@app.route('/inicio_sesion', methods=['GET', 'POST'])
def inicio():
    if request.method == 'POST':
        # Puedes capturar usuario/contraseña aquí
         
        email = request.form['email']
        contraseña = request.form['contraseña']

        conn = sqlite3.connect('stock_plus.db')
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM usuarios WHERE email = ? AND contraseña = ?', (email, contraseña))
        usuario = cursor.fetchone()
        conn.close()

        if usuario:
            session['usuario_id'] = usuario[0]
            session['usuario_nombre'] = usuario[1]
            return redirect(url_for('bienvenido')) 
        
        # Si el usuario no existe, puedes redirigir a una página de error o mostrar un mensaje
        else:
            flash('Credenciales incorrectas. Intenta de nuevo.')

    return render_template('inicio.html')






# Consulta de productos 
@app.route('/buscar_productos', methods=['POST'])
def buscar_productos():
    fecha_inicio = request.form['fecha_inicio']
    fecha_fin = request.form['fecha_fin']

    conn = sqlite3.connect('stock_plus.db')
    cursor = conn.cursor()
    cursor.execute('''
        SELECT numero_producto, nombre_producto, estado, ubicacion, cantidad, precio, fecha_registro
        FROM productos
        WHERE fecha_registro BETWEEN ? AND ?
        ORDER BY fecha_registro ASC
    ''', (fecha_inicio, fecha_fin))
    productos = cursor.fetchall()
    conn.close()

    return render_template('consulta_productos.html', productos=productos, fecha_inicio=fecha_inicio, fecha_fin=fecha_fin)









# Registro
@app.route('/registro', methods=['GET', 'POST'])
def registro():
    if request.method == 'POST':
        # Aquí puedes guardar el registro del usuario
        nombres = request.form['nombres']
        primer_apellido = request.form['primer_apellido']
        segundo_apellido = request.form['segundo_apellido']
        fecha_nacimiento = request.form['fecha_nacimiento']
        telefono = request.form['telefono']
        email = request.form['email']
        contraseña = request.form['contraseña']

        conn = sqlite3.connect('stock_plus.db')
        cursor = conn.cursor()


        try:
            cursor.execute('INSERT INTO usuarios (nombres, primer_apellido, segundo_apellido, fecha_nacimiento, telefono, email, contraseña) VALUES (?, ?, ?, ?, ?, ?, ?)', (nombres, primer_apellido, segundo_apellido, fecha_nacimiento, telefono,  email, contraseña))
            conn.commit()
            flash('Registro exitoso. Ahora inicia sesión.')
            return redirect(url_for('inicio'))
        except sqlite3.IntegrityError:
            flash('El email ya está registrado.')
            return redirect(url_for('registro'))
        finally:
            conn.close()

    return render_template('registro.html')








# Registro productos
@app.route('/registro_productos', methods=['GET', 'POST'])
def registro_productos():
    if request.method == 'POST':
        # Aquí puedes guardar el registro del usuario
        numero_producto = request.form['numero_producto']
        nombre_producto = request.form['nombre_producto']
        estado = request.form['estado']
        ubicacion = request.form['ubicacion']
        cantidad = request.form['cantidad']
        precio = request.form['precio']
        fecha_registro = request.form['fecha_registro']
        # Puedes capturar la fecha en que se creo el producto

        conn = sqlite3.connect('stock_plus.db')
        cursor = conn.cursor()
        try:
            cursor.execute('INSERT INTO productos (numero_producto, nombre_producto, estado, ubicacion, cantidad, precio) VALUES (?, ?, ?, ?, ?, ?)', (numero_producto, nombre_producto, estado, ubicacion, cantidad, precio))
            conn.commit()
            flash('Registro producto exitoso.')
            return redirect(url_for('bienvenido'))
        except sqlite3.IntegrityError:
            flash('Producto ya registrado, ¿deseas modificarlo?.')
            return redirect(url_for('bienvenido'))
        finally:
            conn.close()

    return render_template('bienvenido.html')





# Bienvenido (después de iniciar sesión)
@app.route('/bienvenido')
def bienvenido():
    return render_template('bienvenido.html')




# Informes
@app.route('/informes')
def informes():
    return render_template('informes.html')



# Contacto sin registrar
@app.route('/contactonoreg', methods=['GET', 'POST'])
def contactonoreg():
    if request.method == 'POST':
        return redirect(url_for('contact_submit'))
    return render_template('contactonoreg.html')



# Contacto ya registrado
@app.route('/contacto', methods=['GET', 'POST'])
def contacto():
    if request.method == 'POST':
        return redirect(url_for('contact_submit'))
    return render_template('contacto.html')



# Simulación de envío del contacto
@app.route('/contact_submit')
def contact_submit():
    return "<h1>Gracias por tu mensaje. Te responderemos pronto.</h1><a href='/'>Volver</a>"

if __name__ == '__main__':
    app.run(debug=True)
