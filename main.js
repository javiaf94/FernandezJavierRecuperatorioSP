"use strict";
window.addEventListener("load", function () {
    var main = new Main();
    var selectFiltro = document.getElementById("selectFiltro");
    var btnGuardar = document.getElementById("btnGuardar");
    var btnPromedio = document.getElementById("btnPromedio");
    var btnEliminar = document.getElementById("btnEliminar");
    var btnLimpiar = document.getElementById("btnLimpiar");
    var cboxID = document.getElementById("cboxID");
    var cboxNombre = document.getElementById("cboxNombre");
    var cboxApellido = document.getElementById("cboxApellido");
    var cboxEdad = document.getElementById("cboxEdad");
    selectFiltro.addEventListener("change", main);
    btnGuardar.addEventListener("click", main);
    btnEliminar.addEventListener("click", main);
    btnPromedio.addEventListener("click", main);
    cboxID.addEventListener("change", main);
    cboxNombre.addEventListener("change", main);
    cboxApellido.addEventListener("change", main);
    cboxEdad.addEventListener("change", main);
    btnLimpiar.addEventListener("click", main);
});
var listaPersonas = new Array();
var Main = /** @class */ (function () {
    function Main() {
    }
    Main.prototype.handleEvent = function (ev) {
        var obj = ev.target;
        if (obj.id == "btnGuardar") {
            agregarPersona();
        }
        else if (obj.id == "btnEliminar") {
            var id = Number(document.getElementById("txtid").value);
            eliminarCliente(id);
        }
        else if (obj.id == "selectFiltro") {
            if (document.getElementById("selectFiltro").value == "Masculino") {
                llenarTabla(listaPersonas.filter(function (item) { return item.sexo == Sexo.masculino; }));
            }
            else if (document.getElementById("selectFiltro").value == "Femenino") {
                llenarTabla(listaPersonas.filter(function (item) { return item.sexo == Sexo.femenino; }));
            }
            else if (document.getElementById("selectFiltro").value == "Todos") {
                llenarTabla(listaPersonas);
            }
        }
        else if (obj.id == "cboxID" || obj.id == "cboxNombre" || obj.id == "cboxApellido" || obj.id == "cboxEdad") {
            llenarTabla(listaPersonas);
        }
        else if (obj.id == "btnPromedio") {
            if (document.getElementById("selectFiltro").value == "Masculino") {
                calculaPromedio(listaPersonas.filter(function (item) { return item.sexo == Sexo.masculino; }));
            }
            else if (document.getElementById("selectFiltro").value == "Femenino") {
                calculaPromedio(listaPersonas.filter(function (item) { return item.sexo == Sexo.femenino; }));
            }
            else {
                calculaPromedio(listaPersonas);
            }
        }
        else if (obj.className == "btnSeleccionar") {
            seleccionarCliente((listaPersonas[Number(obj.name)]));
        }
        else if (obj.id == "btnLimpiar") {
            limpiarDatos();
            listaPersonas.splice(0, listaPersonas.length);
            llenarTabla(listaPersonas);
        }
    };
    return Main;
}());
function limpiarTabla() {
    var tCuerpo = document.getElementById("tCuerpo");
    while (tCuerpo.rows.length > 0) {
        tCuerpo.removeChild(tCuerpo.childNodes[0]);
    }
}
function llenarTabla(listaPersonas) {
    limpiarTabla();
    var nombre = "";
    var apellido = "";
    var edad;
    var id;
    var sexo;
    var main = new Main();
    var tCuerpo = document.getElementById("tCuerpo");
    for (var _i = 0, listaPersonas_1 = listaPersonas; _i < listaPersonas_1.length; _i++) {
        var item = listaPersonas_1[_i];
        id = item.id;
        nombre = item.nombre;
        apellido = item.apellido;
        edad = item.edad;
        sexo = item.sexo.toString();
        var btnSeleccionar = document.createElement('input');
        btnSeleccionar.type = 'button';
        btnSeleccionar.className = 'btnSeleccionar';
        btnSeleccionar.value = "Seleccionar";
        btnSeleccionar.name = String(listaPersonas.indexOf(item));
        btnSeleccionar.addEventListener("click", main);
        var tr = document.createElement("tr");
        if (document.getElementById("cboxID").checked) {
            var td1 = document.createElement("td");
            var nodoTexto = document.createTextNode(id);
            td1.appendChild(nodoTexto);
            tr.appendChild(td1);
            document.getElementById("thID").hidden = false;
        }
        else {
            document.getElementById("thID").hidden = true;
        }
        if (document.getElementById("cboxNombre").checked) {
            var td2 = document.createElement("td");
            var nodoTexto = document.createTextNode(nombre);
            td2.appendChild(nodoTexto);
            tr.appendChild(td2);
            document.getElementById("thNombre").hidden = false;
        }
        else {
            document.getElementById("thNombre").hidden = true;
        }
        if (document.getElementById("cboxApellido").checked) {
            var td3 = document.createElement("td");
            var nodoTexto = document.createTextNode(apellido);
            td3.appendChild(nodoTexto);
            tr.appendChild(td3);
            document.getElementById("thApellido").hidden = false;
        }
        else {
            document.getElementById("thApellido").hidden = true;
        }
        if (document.getElementById("cboxEdad").checked) {
            var td4 = document.createElement("td");
            var nodoTexto = document.createTextNode(edad);
            td4.appendChild(nodoTexto);
            tr.appendChild(td4);
            document.getElementById("thEdad").hidden = false;
        }
        else {
            document.getElementById("thEdad").hidden = true;
        }
        var td5 = document.createElement("td");
        var nodoTexto = document.createTextNode(sexo);
        td5.appendChild(nodoTexto);
        tr.appendChild(td5);
        var td6 = document.createElement("td");
        td6.appendChild(btnSeleccionar);
        tr.appendChild(td6);
        tCuerpo.appendChild(tr);
    }
}
function agregarPersona() {
    var id = 1;
    if (listaPersonas.length != 0) {
        var reducePersonas = listaPersonas;
        id = reducePersonas.reduce(function (idMax, persona) {
            if (persona.id > idMax) {
                return persona.id;
            }
            else {
                return idMax;
            }
        }, 0) + 1;
    }
    var nombre = document.getElementById("txtNombre").value;
    var apellido = document.getElementById("txtApellido").value;
    var edad = document.getElementById("numEdad").value;
    var sexo = document.getElementById("selectSexo").value;
    if (sexo == "Masculino") {
        var cliente = new Cliente(Number(edad), id, nombre, apellido, Sexo.masculino);
        listaPersonas.push(cliente);
    }
    else {
        var cliente = new Cliente(Number(edad), id, nombre, apellido, Sexo.femenino);
        listaPersonas.push(cliente);
    }
    limpiarDatos();
    llenarTabla(listaPersonas);
}
function calculaPromedio(listaPers) {
    var promedio = (listaPers.reduce(function (promedio, item) {
        return promedio + item.edad;
    }, 0)) / listaPers.length;
    document.getElementById("numPromedio").value = promedio.toString();
}
function seleccionarCliente(cliente) {
    document.getElementById("txtid").value = cliente.id.toString();
    document.getElementById("txtNombre").value = cliente.nombre;
    document.getElementById("txtApellido").value = cliente.apellido;
    document.getElementById("numEdad").value = cliente.edad.toString();
    if (cliente.sexo = Sexo.masculino) {
        document.getElementById("selectSexo").value = "Masculino";
    }
    else {
        document.getElementById("selectSexo").value = "Femenino";
    }
}
function limpiarDatos() {
    document.getElementById("txtNombre").value = "";
    document.getElementById("txtApellido").value = "";
    document.getElementById("numEdad").value = "";
    document.getElementById("txtid").value = "";
}
function eliminarCliente(id) {
    var persona = listaPersonas.filter(function (item) { return (item).id == id; });
    if (persona.length === 0) {
        alert("ID No valido para borrar, por favor seleccione un cliente de la lista");
    }
    else {
        for (var _i = 0, listaPersonas_2 = listaPersonas; _i < listaPersonas_2.length; _i++) {
            var item = listaPersonas_2[_i];
            if (persona[0].id == item.id) {
                listaPersonas.splice(listaPersonas.indexOf(item), 1);
            }
        }
        alert("Cliente borrado exitosamente");
    }
    limpiarDatos();
    llenarTabla(listaPersonas);
}
