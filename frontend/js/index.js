let contactosGlobal = [];
let paginaActual = 1;
const porPagina = 350;

window.onload = () => {
    cargarContactos();
};


async function cargarContactos() {
    try {
        const res = await fetch("http://localhost:3001/api/contactos");
        const contactos = await res.json();

        contactosGlobal = contactos;
        mostrarContactos();
        mostrarPaginacion();

    } catch (err) {
        console.error("Error cargando contactos:", err);
    }
}

async function guardarContacto() {
    const contacto = {
        nombre: document.getElementById("nombre").value,
        apellido: document.getElementById("apellido").value,
        telefono: document.getElementById("telefono").value
    };

    try {
        await fetch("http://localhost:3001/api/contactos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(contacto)
        });

        cargarContactos();


    } catch (err) {
        console.error("Error guardando contacto:", err);
    }
}


function mostrarContactos() {
    const lista = document.getElementById("lista");
    lista.innerHTML = "";

    const inicio = (paginaActual - 1) * porPagina;
    const fin = inicio + porPagina;

    const paginaContactos = contactosGlobal.slice(inicio, fin);

    paginaContactos.forEach(c => {
        const li = document.createElement("li");
        li.textContent = `${c.nombre} ${c.apellido} - ${c.telefono}`;
        lista.appendChild(li);
    });
}


function mostrarPaginacion() {
    const totalPaginas = Math.ceil(contactosGlobal.length / porPagina);
    const pagDiv = document.getElementById("paginacion");

    pagDiv.innerHTML = "";

    for (let i = 1; i <= totalPaginas; i++) {
        let btn = document.createElement("button");
        btn.textContent = i;

        btn.onclick = () => {
            paginaActual = i;
            mostrarContactos();
            mostrarPaginacion();
        };

        if (i === paginaActual) {
            btn.style.fontWeight = "bold";
            btn.style.background = "#007bff";
            btn.style.color = "white";
        }

        pagDiv.appendChild(btn);
    }
}


