//Lista de Compras

//Creo una clase para crear los productos
class Producto {
    constructor (nombre, precio, cantidad, categoria){
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = cantidad;
        this.categoria = categoria;
    }
}

//Creo una clase para crear las categorias

class Categoria {
    constructor(nombre){
        this.nombre = nombre;
        this.productos = [];
    }
}

//Creo algunos Productos
const producto1 = new Producto ("Arroz", 800, 3, "Granos");
const producto2 = new Producto ("Leche", 800, 5, "Lacteos");
const producto3 = new Producto ("Mani", 900, 1, "Frutos Secos");
const producto4 = new Producto ("Queso", 3000, 1, "Lacteos");
const producto5 = new Producto ("Corn Flakes", 2000, 1, "Cereales");

//Constantes
const arrayProductos = [producto1, producto2, producto3, producto4, producto5];
const arrayCategorias = [];

//Vinculo div de categorias de HTML con JS 
const divCategorias = document.getElementById("divCategorias");

//Creo un array para las categorias filtrando el array productos
function filtrarCategorias () {
    
    for (let i= 0; i < arrayProductos.length; i++ ) {
        let nuevaCategoria = arrayProductos[i].categoria;
        //Reviso si existe la categoria
        let validar = arrayCategorias.find(categoria => categoria.nombre == nuevaCategoria); 

        //Si no existe la agrego al array de categorias y agrego el producto
        if (validar === undefined){          
            const productosCategoria = arrayProductos.filter((producto) => 
                        producto.categoria == nuevaCategoria);
            let categoria = new Categoria (nuevaCategoria);
            categoria.productos = productosCategoria;
            arrayCategorias.push(categoria);
        }else{        //Si existe agrego el producto a su categoria

            const producto = arrayProductos[i];
            
                        producto.categoria == nuevaCategoria;
            validar.productos.push(producto); 
        }   
    }

}

//Creo los div de categorias

function crearDivCategorias() {
    // Reiniciar valores
    divCategorias.innerHTML = "";
  
    // Crear divs
    for (const categoria of arrayCategorias) {
      const div = document.createElement("div");
      div.innerHTML = `
        <h3>${categoria.nombre}</h3>
        <ul>
          ${generarProductosHTML(categoria.productos)}
        </ul>
      `;
      divCategorias.appendChild(div);
    }
  }
  
  function generarProductosHTML(productos) {
    return productos
      .map(
        (producto) => `
          <li>
            <input value="${producto.nombre}">
            <input value="${producto.precio}">
            <input value="${producto.cantidad}">
          </li>
        `
      )
      .join("");
  }
  

// function crearDivCategorias (){
//     // Reiniciar valores
//     divCategorias.innerHTML = "";
    
//     filtrarCategorias();

//     //Crear divs
//     for (categoria of arrayCategorias){
//         const div = document.createElement("div");
//         const productosHTML = categoria.productos.map(producto => 
//                                     `
//                                     <input value= "${producto.nombre}">
//                                     <input value= "${producto.precio}">
//                                     <input value= "${producto.cantidad}">
//                                     `).join("");
//         div.innerHTML = 
//                             `
//                                 <h3>${categoria.nombre}</h3>
//                                 <ul>
//                                     ${productosHTML}
//                                 </ul>
//                             `
//         divCategorias.appendChild(div);
//     }
// }

//Crear div de productos

crearDivCategorias();

/*******Agregar Productos*******/
//Asociar elementos HTML con JS
const formulario = document.getElementById("formulario");
//Asigno Evento para recoger datos
formulario.addEventListener("submit", agregarProducto);

//Funcion para agregar producto

function agregarProducto (e) {
    e.preventDefault();

    //Recupero datos del formulario
    const inputNombre = document.getElementById("inputNombre");
    const inputPrecio = document.getElementById("inputPrecio");
    const inputCantidad = document.getElementById("inputCantidad");
    const inputCategoria = document.getElementById("inputCategoria");

    //Creo nuevo producto
    const nuevoProducto = new Producto (
        inputNombre.value,
        inputPrecio.value,
        inputCantidad.value,
        inputCategoria.value,
    );

    //Lo agrego a mi array
    arrayProductos.push(nuevoProducto);
    crearDivCategorias();
    
    //Borro los valores
    formulario.reset();

}


//     const nuevaCategoria = new Categorias(nombreCategoria);
//     //Agrego clase a la categoria q estoy creando
//     categoria.classList.add(nombreCategoria);
//     arrayCategorias.push(nuevaCategoria);

//     // Limpiar el campo de input
//     inputCategoria.value = "";
//     }

// /*******Quitar Categorias*******/
// //Asociar boton de agregar categorias a JS
// const botonCategoriaEliminar = document.getElementById("botonCategoriaEliminar");
// const inputCategoriaEliminar = document.getElementById("inputCategoriaEliminar");

// botonCategoriaEliminar.addEventListener("click", eliminarDivisionCategoria);
// function eliminarDivisionCategoria (e) {
//     e.preventDefault();
    
//     // Obtener el input de categoría
//     const nombreCategoria =(inputCategoriaEliminar.value).toUpperCase();
    
//     // Buscar el índice de la categoría en el array
//     const index = arrayCategorias.findIndex (categoria => categoria.nombre ===nombreCategoria);

//         // Verificar si la categoría existe
//         if (index == -1){
//             alert("No existe una categoria con ese nombre")
//         }else{
//             //Elimino categoria del array y del HTML
//             let eliminar = document.getElementsByClassName(nombreCategoria);
//             arrayCategorias.splice(index, 1);
//             eliminar[0].remove();
//         }
// }

// /********** Editar Productos en Categoria************/

// //Agregar un producto a la categoria
// const botonProducto = document.getElementById("botonProducto");
// const formProducto = document.getElementById("formProducto");
// const inputProducto = document.getElementById("inputProducto");

// botonProducto.addEventListener("submit", agregarProducto);

// //Funcion Crear producto
// function agregarProducto(e) {
//     e.preventDefault();

//     // Obtener el valor del input de producto
//     const nombreProducto = inputProducto.value;
    
//     let nuevoProducto = document.createElement("li");
//     nuevoProducto.innerHTML = `
//                                 <input type="text" id="" value="${nombreProducto}">
//                                 <input type="number" id="" placeholder="Precio">
//                                 <input type="number" id="" placeholder="Cantidad" >
//                                 <input type="checkbox"  id="">
//                             `
//     // Agregar el producto al formulario
//     formProducto.appendChild(nuevoProducto);

//     // Limpiar el campo de input
//     inputProducto.value = "";
// }