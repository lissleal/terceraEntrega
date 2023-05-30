//Lista de Compras

//Creo una clase para crear los productos
class Producto {
    constructor (id, nombre, precio, cantidad, categoria){
        this.id = id;
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
const producto1 = new Producto (0, "Arroz", 800, 3, "Granos");
const producto2 = new Producto (1, "Leche", 800, 5, "Lacteos");
const producto3 = new Producto (2, "Mani", 900, 1, "Frutos Secos");
const producto4 = new Producto (3, "Queso", 3000, 1, "Lacteos");
const producto5 = new Producto (4, "Corn Flakes", 2000, 1, "Cereales");

//Constantes

let arrayProductos = [producto1, producto2, producto3, producto4, producto5];
let arrayCategorias = [];



//Recuperar datos del storage 
const productosGuardadosenJson = localStorage.getItem("productos");
const productosGuardados = JSON.parse(productosGuardadosenJson);

function revisarCarrito(){
//Iniciar variables segun storage
  if (productosGuardados != null && productosGuardados.length > 0) {
    arrayProductos = productosGuardados;
  }
}


//Vinculo div de categorias de HTML con JS 
const divCategorias = document.getElementById("divCategorias");
/****** Acumular total*******/
let montoTotal = document.getElementById("montoTotal");
let montoCheck = document.getElementById("montoCheck");

//Evento de check
const inputCheck = document.getElementById("eliminarSeleccionados");
inputCheck.addEventListener("click", generarMontoCheck);


  function generarMontoCheck(){
      alert("Esta funcionando el check")
  }
// montoCheck.innerText = generarMonto(arrayProductos);


function totalLista (array){
  const monto = array.reduce((acumulador, elemento) => acumulador + parseInt(elemento.cantidad * elemento.precio), 0);
  return monto;
}

//Funcion para agregar producto

function agregarProducto (e) {
  e.preventDefault();

  //Recupero datos del formulario
  const inputNombre = document.getElementById("inputNombre");
  const inputPrecio = document.getElementById("inputPrecio");
  const inputCantidad = document.getElementById("inputCantidad");
  const inputCategoria = document.getElementById("inputCategoria");

// Convierto las cadenas de texto a números
const precio = parseFloat(inputPrecio.value);
const cantidad = parseFloat(inputCantidad.value);

// Verifico si los valores son números válidos
if (isNaN(precio) || isNaN(cantidad)) {
  alert("Por favor, ingresa valores numéricos válidos para precio y cantidad.");
  return;
}

  //Creo nuevo producto
  const nuevoProducto = new Producto (
      arrayProductos.length,
      inputNombre.value,
      precio,
      cantidad,
      inputCategoria.value,
  );

  //Lo agrego a mi array
  arrayProductos.push(nuevoProducto);
  crearDivCategorias();
  //Actualizo storage
  let productosEnStorageJson = JSON.stringify(arrayProductos);
  localStorage.setItem("productos", productosEnStorageJson);
  
  //Actualizo Montos
  const nuevoMonto = totalLista(arrayProductos);
  montoTotal.innerText = nuevoMonto;
  const nuevoMontoCheck = totalCheck(arrayProductos);
  montoCheck.innerText = nuevoMontoCheck;

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

//Creo los div de categorias

function crearDivCategorias() {
    // Reiniciar valores
    divCategorias.innerHTML = "";
    filtrarCategorias();

    // Crear divs
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
  
  function generarProductosHTML(productos) {
    return productos
      .map(
        (producto) => `
          <li class="estaSeleccionado">
            <input value="${producto.nombre}">
            <input value="${producto.precio}">
            <input value="${producto.cantidad}">
            <input type="checkbox" name="productoCheck" class="productoCheck" value="${producto.id}"checked>
          </li>
        `
      )
      .join("");
  }
  
/*******Agregar Productos*******/
//Asociar elementos HTML con JS
const formulario = document.getElementById("formulario");
//Asigno Evento para recoger datos
formulario.addEventListener("submit", agregarProducto);

//Suma de Totales
montoTotal.innerText = totalLista(arrayProductos);
//Verificar Storage
revisarCarrito();
//Crear div de productos
crearDivCategorias();

const elementosSeleccionados = document.getElementsByClassName('productoCheck');
let arraySeleccionados = [];
console.table(elementosSeleccionados);





