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
const montoTotal = document.getElementById("montoTotal");
const formulario = document.getElementById("formulario");
const formularioEliminar = document.getElementById("formularioEliminar");
const botonEliminarProducto = document.getElementById("eliminarProducto");
const botonEliminar = document.getElementById("botonEliminar");

//Asigno Eventos a mis botones para recoger datos
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

//Iniciar variables segun storage
function revisarStorage(){
  if (productosTraidosDeStorage !== null ) {
    arrayProductos = productosTraidosDeStorage;
  }
}

//Actualizar storage
function actualizarStorage(){
  const productosParaEnviarStorageEnJson = JSON.stringify(arrayProductos);
  localStorage.setItem("productos", productosParaEnviarStorageEnJson);
}

//Calculo del total a pagar
function totalLista(){
  const nuevoMonto = arrayProductos.reduce(
    (acumulador, elemento) => 
    acumulador + elemento.cantidad * elemento.precio, 0);
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
  const nuevoProducto = new Producto (nombre, precio, cantidad, categoria);
  //Lo agrego a mi array
  arrayProductos.push(nuevoProducto);

  //Actualizo valores
  crearDivCategorias();
  actualizarStorage();
  totalLista();
  //Borro los valores del formulario
  formulario.reset();
}

//Crear un array para de categorias a partir del array productos
function filtrarCategorias () {

    arrayCategorias = [];
    arrayProductos.forEach((producto) => {
    const categoriaExistente = arrayCategorias.find((categoria) => 
    categoria.nombre === producto.categoria);
    
    if (categoriaExistente) {
      categoriaExistente.productos.push(producto);
    } else {
      const nuevaCategoria = new Categoria(producto.categoria);
      nuevaCategoria.productos.push(producto);
      arrayCategorias.push(nuevaCategoria);
    }
  });
}

//Crear los div de categorias  en HTML segun arraycategorias
function crearDivCategorias() { 
  // Reiniciar valores
  filtrarCategorias();

  //Creo div de Titulos
  divCategorias.innerHTML = `
                            <div class="divCategoria">
                              <h3>Categoria</h3>
                              <ul class="lista"> 
                                  <li class="productito">
                                      <p class="">Nombre</p>
                                      <p class="">Precio</p>
                                      <p class="">Cantidad</p>
                                  </li>
                              </ul>
                            </div>`;

  // Crear un div para cada categoria
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

//Crear Inner Html para alimentar cada div de categorias
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

//Eliminar Productos del array productos
function eliminarProducto(e){
  e.preventDefault();

  //Recupero datos
  const inputNombreEliminar = document.getElementById("inputNombreEliminar").value.toUpperCase();
  const inputCategoriaEliminar = document.getElementById("inputCategoriaEliminar").value.toUpperCase();

  let indiceProducto = -1;
  do{
    //Busco index del producto
    indiceProducto = arrayProductos.findIndex((producto) =>
        producto.nombre === inputNombreEliminar ||
        producto.categoria === inputCategoriaEliminar);
    
    //Si existe borrar elemento
    if (indiceProducto !== -1) {
      arrayProductos.splice(indiceProducto, 1);
      actualizarStorage();
      totalLista();
      crearDivCategorias();
      } 
    }while(indiceProducto != -1);

    //Reset valores del formulario
    formularioEliminar.reset();
}


//Eliminar todos los elementos del array productos
function vaciarLista() {

  arrayProductos = [];
  
  crearDivCategorias();
  actualizarStorage();
  totalLista();
  
}
