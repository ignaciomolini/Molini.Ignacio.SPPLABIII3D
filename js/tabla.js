import {
  limpiarForm
} from "./form.js";

export const divTabla = document.getElementById("divTabla");

function crearTabla(items) {
  const tabla = document.createElement("table");
  tabla.classList.add("table");
  tabla.classList.add("table-bordered");
  tabla.classList.add("table-hover");

  tabla.appendChild(crearCabecera(items[0]));
  tabla.appendChild(crearCuerpo(items));

  return tabla;
}

function crearCabecera(item) {
  const thead = document.createElement("thead");
  thead.classList.add("bg-secondary");
  thead.classList.add("text-uppercase");
  thead.classList.add("text-light");
  const tr = document.createElement("tr");
  for (const key in item) {
    if (key != "id") {
      const th = document.createElement("th");
      const texto = document.createTextNode(key);
      th.appendChild(texto);
      tr.appendChild(th);
    }
  }
  thead.appendChild(tr);

  return thead;
}

function crearCuerpo(items) {
  const tbody = document.createElement("tbody");
  tbody.classList.add("text-capitalize");
  items.forEach((item) => {
    const tr = document.createElement("tr");
    for (const key in item) {
      if (key == "id") {
        tr.setAttribute("data-id", item[key]);
      } else {
        const td = document.createElement("td");
        const texto = document.createTextNode(item[key]);
        td.appendChild(texto);
        tr.appendChild(td);
      }
    }
    tbody.appendChild(tr);
  });

  return tbody;
}

export function actualizarLista(lista, contenedor) {
  while (contenedor.firstChild) {
    contenedor.removeChild(contenedor.lastChild);
  }
  if (lista.length > 0) {
    limpiarForm();
    contenedor.appendChild(crearTabla(lista));
  }
}

