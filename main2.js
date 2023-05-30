//Lista de Compras
//Constantes
const divCategorias = document.getElementById("divCategorias");

//Inicializo Categorias
const arrayCategorias = ["LACTEOS", "LIMPIEZA", "CHARCUTERIA", "PERFUMERIA", "CARNES"];

//Ingreso Categorias En HTML

for (categoria of arrayCategorias){
    
}

//Creo una clase para crear los productos
class Producto {
    constructor (nombre, precio, cantidad){
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = cantidad;
    }
}
//Crear una clase para cada categoria
class Categorias {
    constructor(nombre){
        // this.id = arrayCategorias.length;
        this.nombre = nombre;
        this.productos = [];
    }
}



/*******Agregar Categorias*******/
//Asociar boton de agregar categorias a JS
const botonCategoria = document.getElementById("botonCategoria");
const inputCategoria = document.getElementById("inputCategoria");

//Asigno Evento 
botonCategoria.addEventListener("click", crearDivisionCategoria);

//Funcion para crear categoria
function crearDivisionCategoria (e) {
e.preventDefault();

    // Obtener el valor del input de categoría
    const nombreCategoria =(inputCategoria.value).toUpperCase();

    //Creo div en html
    const categoria = document.createElement("div")
    categoria.innerHTML = 
                        `
                            <h3>${nombreCategoria}</h3>
                            <ul id="producto${nombreCategoria}">
                                <li>
                                <input type="text" id="inputProducto" placeholder="Nombre">
                                <input type="submit" id="botonProducto" for="inputProducto" value="Agregar Producto">
                                </li>
                            </ul>
                        `
    // Agregar la categoría al divCategorias en el HTML
    divCategorias.appendChild(categoria);

    const nuevaCategoria = new Categorias(nombreCategoria);
    //Agrego clase a la categoria q estoy creando
    categoria.classList.add(nombreCategoria);
    arrayCategorias.push(nuevaCategoria);

    // Limpiar el campo de input
    inputCategoria.value = "";
    }

/*******Quitar Categorias*******/
//Asociar boton de agregar categorias a JS
const botonCategoriaEliminar = document.getElementById("botonCategoriaEliminar");
const inputCategoriaEliminar = document.getElementById("inputCategoriaEliminar");

botonCategoriaEliminar.addEventListener("click", eliminarDivisionCategoria);
function eliminarDivisionCategoria (e) {
    e.preventDefault();
    
    // Obtener el input de categoría
    const nombreCategoria =(inputCategoriaEliminar.value).toUpperCase();
    
    // Buscar el índice de la categoría en el array
    const index = arrayCategorias.findIndex (categoria => categoria.nombre ===nombreCategoria);

        // Verificar si la categoría existe
        if (index == -1){
            alert("No existe una categoria con ese nombre")
        }else{
            //Elimino categoria del array y del HTML
            let eliminar = document.getElementsByClassName(nombreCategoria);
            arrayCategorias.splice(index, 1);
            eliminar[0].remove();
        }
}

/********** Editar Productos en Categoria************/

//Agregar un producto a la categoria
const botonProducto = document.getElementById("botonProducto");
const formProducto = document.getElementById("formProducto");
const inputProducto = document.getElementById("inputProducto");

botonProducto.addEventListener("submit", agregarProducto);

//Funcion Crear producto
function agregarProducto(e) {
    e.preventDefault();

    // Obtener el valor del input de producto
    const nombreProducto = inputProducto.value;
    
    let nuevoProducto = document.createElement("li");
    nuevoProducto.innerHTML = `
                                <input type="text" id="" value="${nombreProducto}">
                                <input type="number" id="" placeholder="Precio">
                                <input type="number" id="" placeholder="Cantidad" >
                                <input type="checkbox"  id="">
                            `
    // Agregar el producto al formulario
    formProducto.appendChild(nuevoProducto);

    // Limpiar el campo de input
    inputProducto.value = "";
}





