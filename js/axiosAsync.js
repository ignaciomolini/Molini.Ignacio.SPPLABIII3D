const divSpinner = document.getElementById("divSpinner");

export const obtenerAnuncios = async (url) => {
  try {
    agregarSpinner();
    const {
      data
    } = await axios.get(url);
    return data;
  } catch (err) {
    return `error: ${err.response.status} - ${err.response.statusText}`;
  } finally {
    eliminarSpinner();
  }
};

export const altaAnuncio = async (url, obj) => {
  try {
    agregarSpinner();
    const {
      data
    } = await axios.post(url, obj);
    console.log(data);
  } catch (err) {
    console.error(`error: ${err.response.status} - ${err.response.statusText}`);
  } finally {
    eliminarSpinner();
  }
};

export const eliminarAnuncio = async (url) => {
  try {
    agregarSpinner();
    const {
      data
    } = await axios.delete(url);
    console.log(data);
  } catch (err) {
    console.error(`error: ${err.response.status} - ${err.response.statusText}`);
  } finally {
    eliminarSpinner();
  }
};

export const modificarAnuncio = async (url, obj) => {
  try {
    agregarSpinner();
    const {
      data
    } = await axios.put(url, obj);
    console.log(data);
  } catch (err) {
    console.error(`error: ${err.response.status} - ${err.response.statusText}`);
  } finally {
    eliminarSpinner();
  }
};

function agregarSpinner() {
  let spinner = document.createElement("img");
  spinner.setAttribute("src", "./image/spinner.gif");
  spinner.setAttribute("alt", "imagen spinner");

  divSpinner.appendChild(spinner);
}

function eliminarSpinner() {
  while (divSpinner.firstChild) {
    divSpinner.removeChild(divSpinner.lastChild);
  }
}