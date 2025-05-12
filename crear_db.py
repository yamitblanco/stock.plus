import sqlite3

# 1. Crear conexión con la base de datos
conn = sqlite3.connect("stock_plus.db")
cursor = conn.cursor()

# 2. Crear la tabla de usuarios
cursor.execute("""
CREATE TABLE IF NOT EXISTS usuarios (
    id_usuario INTEGER PRIMARY KEY AUTOINCREMENT,
    nombres TEXT NOT NULL,
    primer_apellido TEXT NOT NULL,
    segundo_apellido TEXT,
    fecha_nacimiento TEXT NOT NULL,
    telefono TEXT,
    email TEXT UNIQUE NOT NULL,
    contraseña TEXT NOT NULL
);
""")

# 3. Crear la tabla de productos
cursor.execute("""
CREATE TABLE IF NOT EXISTS productos (
    numero_producto TEXT PRIMARY KEY,
    nombre_producto TEXT NOT NULL,
    estado TEXT CHECK(estado IN ('disponible', 'agotado', 'en camino')) NOT NULL,
    ubicacion TEXT NOT NULL,
    cantidad INTEGER NOT NULL,
    precio REAL NOT NULL,
    fecha_registro TEXT DEFAULT CURRENT_TIMESTAMP
);
""")

# (Opcional) Relacionar productos con usuarios (si cada usuario tiene su inventario)
cursor.execute("""
ALTER TABLE productos
ADD COLUMN id_usuario INTEGER REFERENCES usuarios(id_usuario);
""")

# 4. Confirmar los cambios
conn.commit()

# 5. Cerrar la conexión
conn.close()

print("Base de datos creada con éxito.")


