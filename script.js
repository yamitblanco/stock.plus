


  
// Verificamos si estamos en la página de inicio
if (document.body.id === "inicio") {
    // Código para el formulario de inicio de sesión
    const formLogin = document.getElementById("formulario-inicio-sesion");
    if (formLogin) {
        formLogin.addEventListener("submit", function(e) {
            e.preventDefault();

             // ✅ 1. Obtenemos los datos ingresados por el usuario
  let emailIngresado = document.getElementById("email").value;
  let passwordIngresado = document.getElementById("password").value;

  // ✅ 2. Obtenemos los usuarios guardados en localStorage
  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  // ✅ 3. Buscamos si existe un usuario con ese email y contraseña
  let usuarioEncontrado = usuarios.find(usuario =>
    usuario.email === emailIngresado && usuario.password === passwordIngresado
  );

  // ✅ 4. Verificamos si el usuario existe
  if (usuarioEncontrado) {
    alert("Inicio de sesión exitoso. ¡Bienvenido, " + usuarioEncontrado.nombre + "!");
    window.location.href = "bienvenido.html"; // Cambiar por la página deseada
    // Puedes redirigir a otra página si quieres:
    // window.location.href = "pagina-principal.html";

  } else {
    alert("Correo o contraseña incorrectos.");
  }
})}};



// Verificamos si estamos en la página de gestion inventario
if (document.body.id === "gestion-inventario") {
    // Código para el formulario de registro
    const formProducto = document.getElementById("inventario");
    if (formProducto) {
        formProducto.addEventListener("submit", function(e) {
            e.preventDefault();
            // ✅ 1. Capturamos los valores que el usuario escribió en los campos del formulario

    let numero = document.getElementById("product-id").value;
    let nombrep = document.getElementById("product-name").value;
    let estadop = document.getElementById("status").value;    
    let localizacion = document.getElementById("location").value;
    let cantidad = document.getElementById("quantity").value;
    let precio = document.getElementById("price").value;
    

  
    // ✅ 2. Creamos un objeto con los datos del nuevo usuario
    let nuevoProducto = {
      numero: numero,
      nombrep: nombrep,
      estado: estadop,
      localizacion: localizacion,
      cantidad: cantidad,
      precio: precio,
      fechaRegistro: new Date().toISOString(), // Fecha de registro en formato ISO

    };
  
    // ✅ 3. Revisamos si ya hay usuarios guardados en localStorage
    // Si hay, los convertimos de texto a array con JSON.parse
    // Si no hay, usamos un array vacío []
    let productos = JSON.parse(localStorage.getItem("productos")) || [];
  
    // ✅ 4. Agregamos el nuevo usuario al array de usuarios
    productos.push(nuevoProducto);
  
    // ✅ 5. Guardamos el array actualizado en localStorage
    // Convertimos el array a texto con JSON.stringify antes de guardarlo
    localStorage.setItem("productos", JSON.stringify(productos));
  
    // ✅ 6. Limpiamos el formulario para que quede vacío otra vez
    document.getElementById("inventario").reset();
  
    // ✅ 7. Mostramos un mensaje al usuario para confirmar que fue registrado
    alert("Producto añadido con éxito");
    

  })}};


  document.addEventListener("DOMContentLoaded", () => {
    const btnConsulta = document.getElementById("btn-consulta");
  
    if (btnConsulta) {
      btnConsulta.addEventListener("click", () => {
        const fechaInicio = document.getElementById("start-date")?.value;
        const fechaFin = document.getElementById("end-date")?.value;
  
        if (!fechaInicio || !fechaFin) {
          alert("Por favor selecciona ambas fechas.");
          return;
        }
  
        const inicio = new Date(fechaInicio);
        const fin = new Date(fechaFin);
        fin.setHours(23, 59, 59, 999); // Asegura que incluya toda la fecha final
  
        const productos = JSON.parse(localStorage.getItem("productos")) || [];
  
        const productosFiltrados = productos.filter(p => {
          if (!p.fechaRegistro) return false;
          const fechaProd = new Date(p.fechaRegistro);
          return fechaProd >= inicio && fechaProd <= fin;
        });
  
        // Construir HTML del informe
        let contenidoHTML = `
          <html>
          <head>
            <title>Informe de Productos</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; }
              table { width: 100%; border-collapse: collapse; margin-top: 20px; }
              th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
              th { background-color: #f0f0f0; }
            </style>
          </head>
          <body>
            <h2>Informe de Productos desde ${fechaInicio} hasta ${fechaFin}</h2>
            <table>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Estado</th>
                <th>Localización</th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th>Fecha de Registro</th>
              </tr>`;
  
        if (productosFiltrados.length === 0) {
          contenidoHTML += `<tr><td colspan="7">No se encontraron productos en este rango de fechas</td></tr>`;
        } else {
          productosFiltrados.forEach(p => {
            contenidoHTML += `
              <tr>
                <td>${p.numero}</td>
                <td>${p.nombrep}</td>
                <td>${p.estado}</td>
                <td>${p.localizacion}</td>
                <td>${p.cantidad}</td>
                <td>${p.precio}</td>
                <td>${new Date(p.fechaRegistro).toLocaleDateString()}</td>
              </tr>`;
          });
        }
  
        contenidoHTML += `
            </table>
          </body>
          </html>`;
  
        const nuevaPestana = window.open("", "_blank");
        nuevaPestana.document.write(contenidoHTML);
        nuevaPestana.document.close();
      });
    }
  });
  









  // Verificamos si estamos en la página de registro
if (document.body.id === "registro") {
    // Código para el formulario de registro
    const formRegistro = document.getElementById("formulario-registro");
    if (formRegistro) {
        formRegistro.addEventListener("submit", function(e) {
            e.preventDefault();
            // ✅ 1. Capturamos los valores que el usuario escribió en los campos del formulario
    let nombre = document.getElementById("new-username").value;
    let apellido1 = document.getElementById("primer-apellido").value;
    let apellido2 = document.getElementById("segundo-apellido").value;
    let fechan = document.getElementById("fecha-nacimiento").value;
    let telefono = document.getElementById("telefono").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

  
    // ✅ 2. Creamos un objeto con los datos del nuevo usuario
    let nuevoUsuario = {
      nombre: nombre,
      apellido: apellido1,
      apellido: apellido2,
      fecha: fechan,
      telefono: telefono,
      email: email,
      password: password,

    };
  
    // ✅ 3. Revisamos si ya hay usuarios guardados en localStorage
    // Si hay, los convertimos de texto a array con JSON.parse
    // Si no hay, usamos un array vacío []
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  
    // ✅ 4. Agregamos el nuevo usuario al array de usuarios
    usuarios.push(nuevoUsuario);
  
    // ✅ 5. Guardamos el array actualizado en localStorage
    // Convertimos el array a texto con JSON.stringify antes de guardarlo
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
  
    // ✅ 6. Limpiamos el formulario para que quede vacío otra vez
    document.getElementById("formulario-registro").reset();
  
    // ✅ 7. Mostramos un mensaje al usuario para confirmar que fue registrado
    alert("Usuario registrado con éxito");
    window.location.href = "inicio.html"; // Cambiar por la página deseada
  })}};