export const frmAnuncio = document.forms[0];
export const btnAlta = document.getElementById("btnAlta");
export const btnBaja = document.getElementById("btnBaja");
export const btnMod = document.getElementById("btnMod");
export const btnCancel = document.getElementById("btnCancel");

export function limpiarForm() {
  frmAnuncio.reset();
  frmAnuncio.id.value = "";
  btnBaja.classList.add("d-none");
  btnMod.classList.add("d-none");
  btnAlta.classList.remove("d-none");
}

export function cargarForm(lista, id) {
  const {
    titulo,
    transaccion,
    descripcion,
    precio,
    puertas,
    kms,
    potencia
  } =
  lista.filter(a => a.id === parseInt(id))[0];

  frmAnuncio.id.value = id;
  frmAnuncio.titulo.value = titulo;
  frmAnuncio.transaccion.value = transaccion;
  frmAnuncio.descripcion.value = descripcion;
  frmAnuncio.precio.value = precio;
  frmAnuncio.puertas.value = puertas;
  frmAnuncio.kms.value = kms;
  frmAnuncio.potencia.value = potencia;
}