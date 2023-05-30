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

/****** Constantes*******/
let arrayProductos = [];
let arrayCategorias = [];

/******Vinculo HTML con JS *******/
const divCategorias = document.getElementById("divCategorias");
let montoTotal = document.getElementById("montoTotal");
const formulario = document.getElementById("formulario");
const botonEliminarProducto = document.getElementById("eliminarProducto");
let botonEliminar = document.getElementById("botonEliminar");

//Asigno Evento para recoger datos
formulario.addEventListener("submit", agregarProducto);
botonEliminarProducto.addEventListener("click", eliminarProducto);
botonEliminar.addEventListener("click", vaciarLista);

//Recuperar datos del storage 
let productosTraidosDeStorageEnJson = localStorage.getItem("productos");
let productosTraidosDeStorage = JSON.parse(productosTraidosDeStorageEnJson);

//Inicializo 
revisarStorage();
crearDivCategorias();
totalLista();

/******* FUNCIONES*******/

function revisarStorage(){
//Iniciar variables segun storage

// || productosTraidosDeStorage.length > 0

  if (productosTraidosDeStorage !== null ) {
    arrayProductos = productosTraidosDeStorage;
  }
}
//Actualizo storage
function actualizarStorage(){
  let productosParaEnviarStorageEnJson = JSON.stringify(arrayProductos);
  localStorage.setItem("productos", productosParaEnviarStorageEnJson);
}

//Calculo total a pagar
function totalLista(){
  const nuevoMonto = arrayProductos.reduce((acumulador, elemento) => acumulador + parseInt(elemento.cantidad * elemento.precio), 0);
  montoTotal.innerText = nuevoMonto;
}

//Funcion para agregar producto
function agregarProducto (e) {
  e.preventDefault();

  //Recupero datos del formulario
  const inputNombre = document.getElementById("inputNombre");
  const inputPrecio = document.getElementById("inputPrecio");
  const inputCantidad = document.getElementById("inputCantidad");
  const inputCategoria = document.getElementById("inputCategoria");

  // Convierto las cadenas de texto a números y mayusculas
  const nombre = inputNombre.value.toUpperCase();
  const precio = parseFloat(inputPrecio.value);
  const cantidad = parseFloat(inputCantidad.value);
  const categoria = inputCategoria.value.toUpperCase();


  // Verifico si los valores son números válidos
  if (isNaN(precio) || isNaN(cantidad)) {
    alert("Por favor, ingresa valores numéricos válidos para precio y cantidad.");
    return;
  }

  //Creo nuevo producto
  const nuevoProducto = new Producto (
      nombre,
      precio,
      cantidad,
      categoria,
  );

  //Lo agrego a mi array
  arrayProductos.push(nuevoProducto);

  //Actualizo valores
  crearDivCategorias();
  actualizarStorage();
  totalLista();
  //Borro los valores del formulario
  formulario.reset();
}

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
            validar.productos = validar.productos.filter((p) => p.nombre !== producto.nombre);
            validar.productos.push(producto); 
        }  
    }
}

//Creo en html los div de categorias segun arraycategorias
function crearDivCategorias() { 
  // Reiniciar valores
  filtrarCategorias();
  divCategorias.innerHTML = `<div class="divCategoria"><h3>Categoria</h3>
  <ul class="lista"> 
      <li class="productito">
          <p class="">Nombre</p>
          <p class="">Precio</p>
          <p class="">Cantidad</p>
      </li>
  </ul></div>`;

  // Crear divs
  if (arrayCategorias != []){
    for (const categoria of arrayCategorias) {
      const div = document.createElement("div");
      div.className = "divCategoria";
      div.innerHTML = `
        <h3>${categoria.nombre}</h3>
        <ul class="lista">
          ${generarProductosHTML(categoria.productos)}
        </ul>
      `;
      divCategorias.appendChild(div);
    }
  }
}

//Crea Inner Html para alimentar los div de categorias
function generarProductosHTML(productos) {
  return productos
    .map(
      (producto) => `
        <li class="productito">
          <p class=""> ${producto.nombre}</p>
          <p class=""> ${producto.precio}</p>
          <p class=""> ${producto.cantidad}</p>
        </li>
      `
    )
    .join("");
}

//Eliminar Productos del array productos/
function eliminarProducto(e){
  e.preventDefault();

  //Recupero datos
  const inputNombreEliminar = document.getElementById("inputNombreEliminar").value.toUpperCase();
  const inputCategoriaEliminar = document.getElementById("inputCategoriaEliminar").value.toUpperCase();

  do{
    //Busco index del producto
    let indiceProducto = arrayProductos.findIndex((producto) =>
        producto.nombre === inputNombreEliminar ||
        producto.categoria === inputCategoriaEliminar);

    if (indiceProducto !== -1) {
      arrayProductos.splice(indiceProducto, 1);
      actualizarStorage();
      totalLista();
      crearDivCategorias();
      } 
    }while(indiceProducto != -1);
}


//Eliminar todos los elementos del array productos

function vaciarLista() {

  arrayProductos = [];
  crearDivCategorias();
  actualizarStorage();
  totalLista();
  
}
