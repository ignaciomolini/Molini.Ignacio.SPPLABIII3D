import Anuncio_Auto from "./Anuncio.js";
import {
  btnMod,
  btnBaja,
  btnCancel,
  frmAnuncio,
  cargarForm,
  limpiarForm,
} from "./form.js";
import {
  obtenerAnuncios,
  altaAnuncio,
  eliminarAnuncio,
  modificarAnuncio,
} from "./axiosAsync.js";
import {
  actualizarLista,
  divTabla
} from "./tabla.js";

const btnFilter = document.getElementById("btnFilter");
const btnTodos = document.getElementById("btnTodos");
const btnAlquiler = document.getElementById("btnAlquiler");
const btnVenta = document.getElementById("btnVenta");
const checks = document.querySelectorAll(".cb");
const url = "http://localhost:3000/anuncios";
let listaAnuncios;
let listaActual;

window.addEventListener("DOMContentLoaded", inicializarManejadores);

async function inicializarManejadores() {
  listaAnuncios = await obtenerAnuncios(url);
  listaActual = listaAnuncios;
  frmAnuncio.addEventListener("submit", handlerSubmit);
  document.addEventListener("click", handlerClick);
  btnBaja.addEventListener("click", handlerBaja);
  btnMod.addEventListener("click", handlerModificacion);
  btnTodos.addEventListener("click", handlerFilterTodos);
  btnAlquiler.addEventListener("click", handlerFilterAlquiler);
  btnVenta.addEventListener("click", handlerFilterVenta);
  checks.forEach((item) => {
    item.addEventListener("click", handlerCheck);
  });
  btnCancel.addEventListener("click", (e) => {
    e.preventDefault();
    limpiarForm();
  });
  if (listaAnuncios.length > 0) {
    actualizarLista(listaAnuncios, divTabla);
  }
}

function handlerClick(e) {
  if (e.target.matches("td")) {
    const id = e.target.parentNode.dataset.id;
    cargarForm(listaAnuncios, id);
    btnBaja.classList.remove("d-none");
    btnMod.classList.remove("d-none");
    btnAlta.classList.add("d-none");
  }
}

async function handlerSubmit(e) {
  e.preventDefault();
  const nuevoAnuncio = obtenerAnuncio();
  if (nuevoAnuncio) {
    vaciarContenedor(divTabla);
    await altaAnuncio(url, nuevoAnuncio);
    listaAnuncios = await obtenerAnuncios(url);
    actualizarLista(listaAnuncios, divTabla);
    resetInputs();
  }
}

async function handlerBaja(e) {
  e.preventDefault();
  if (confirm("Confirma eliminacion?")) {
    const id = parseInt(frmAnuncio.id.value);
    vaciarContenedor(divTabla);
    await eliminarAnuncio(`${url}/${id}`);
    listaAnuncios = await obtenerAnuncios(url);
    actualizarLista(listaAnuncios, divTabla);
    resetInputs();
  } else {
    limpiarForm();
  }
}

async function handlerModificacion(e) {
  e.preventDefault();
  if (confirm("Confirma modificacion?")) {
    const id = parseInt(frmAnuncio.id.value);
    vaciarContenedor(divTabla);
    await modificarAnuncio(`${url}/${id}`, obtenerAnuncio());
    listaAnuncios = await obtenerAnuncios(url);
    actualizarLista(listaAnuncios, divTabla);
    resetInputs();
  } else {
    limpiarForm();
  }
}

function handlerFilterTodos() {
  btnFilter.removeChild(btnFilter.lastChild);
  btnFilter.appendChild(document.createTextNode("Todos"));

  listaActual = listaAnuncios;
  actualizarLista(listaAnuncios, divTabla);

  inputProm.value = "N/A";
  resetCheckbox();
}

function handlerFilterAlquiler() {
  btnFilter.removeChild(btnFilter.lastChild);
  btnFilter.appendChild(document.createTextNode("Alquiler"));

  const listaAlquileres = listaAnuncios.filter(
    (item) => item.transaccion == "Alquiler"
  );
  listaActual = listaAlquileres;
  actualizarLista(listaAlquileres, divTabla);
  
  inputProm.value = calcularPromedio(listaAlquileres);
  resetCheckbox();
}

function handlerFilterVenta() {
  btnFilter.removeChild(btnFilter.lastChild);
  btnFilter.appendChild(document.createTextNode("Venta"));

  const listaVentas = listaAnuncios.filter(
    (item) => item.transaccion == "Venta"
  );
  listaActual = listaVentas;
  actualizarLista(listaVentas, divTabla);

  inputProm.value = calcularPromedio(listaVentas);
  resetCheckbox();
}

function handlerCheck() {
  const c = {};
  checks.forEach((item) => {
    c[item.name] = item.checked;
  });

  const listaMap = listaActual.map((item) => {
    const f = {};
    for (const key in item) {
      if (c[key] || key == "id") {
        f[key] = item[key];
      }
    }
    return f;
  });
  actualizarLista(listaMap, divTabla);
}

function calcularPromedio(lista) {
  if (lista.length > 0) {
    return parseFloat(
      (
        lista.reduce((acum, item) => acum + parseInt(item.precio), 0) /
        lista.length
      ).toFixed(2)
    );
  }
  return "N/A";
}

function vaciarContenedor(contenedor) {
  while (contenedor.firstChild) {
    contenedor.removeChild(contenedor.lastChild);
  }
}

function resetInputs() {
  resetCheckbox();
  inputProm.value = "N/A";
  btnFilter.removeChild(btnFilter.lastChild);
  btnFilter.appendChild(document.createTextNode("Todos"));
}

function resetCheckbox() {
  checks.forEach((c) => {
    c.checked = true;
  });
}

function obtenerAnuncio() {
  const nuevoAnuncio = new Anuncio_Auto(
    0,
    frmAnuncio.titulo.value,
    frmAnuncio.transaccion.value,
    frmAnuncio.descripcion.value,
    frmAnuncio.precio.value,
    frmAnuncio.puertas.value,
    frmAnuncio.kms.value,
    frmAnuncio.potencia.value
  );

  return nuevoAnuncio;
}