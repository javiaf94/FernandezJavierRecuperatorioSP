window.addEventListener("load", ()=>{
    
   
    let main: EventListenerObject = new Main();
    
    let selectFiltro = <HTMLElement> document.getElementById("selectFiltro");
                       
    let btnGuardar = <HTMLElement> document.getElementById("btnGuardar");
        
    let btnPromedio = <HTMLElement> document.getElementById("btnPromedio");

    let btnEliminar = <HTMLElement> document.getElementById("btnEliminar");

    let btnLimpiar = <HTMLElement> document.getElementById("btnLimpiar");

    let cboxID = <HTMLElement> document.getElementById("cboxID");
    let cboxNombre = <HTMLElement> document.getElementById("cboxNombre");
    let cboxApellido = <HTMLElement> document.getElementById("cboxApellido");
    let cboxEdad = <HTMLElement> document.getElementById("cboxEdad");

    selectFiltro.addEventListener("change", main);
    btnGuardar.addEventListener("click", main);
    btnEliminar.addEventListener("click", main);
    btnPromedio.addEventListener("click", main);
    cboxID.addEventListener("change",main);
    cboxNombre.addEventListener("change",main);
    cboxApellido.addEventListener("change",main);
    cboxEdad.addEventListener("change",main);
    btnLimpiar.addEventListener("click",main);
})

var listaPersonas: Array<Persona> = new Array<Persona>();

class Main implements EventListenerObject
{

    public handleEvent(ev:Event)
    {
        let obj:HTMLElement = <HTMLElement> ev.target;
        

        if(obj.id == "btnGuardar")
        {
            agregarPersona();
        }
        else if(obj.id == "btnEliminar")
        {
            let id: number = Number((<HTMLInputElement>document.getElementById("txtid")).value);
            eliminarCliente(id);
        }
        else if(obj.id == "selectFiltro")
        {            
            if((<HTMLInputElement>document.getElementById("selectFiltro")).value == "Masculino")
            {
                llenarTabla(listaPersonas.filter(item => (<Cliente>item).sexo == Sexo.masculino));
            }
            else if((<HTMLInputElement>document.getElementById("selectFiltro")).value == "Femenino")
            {
                llenarTabla(listaPersonas.filter(item => (<Cliente>item).sexo == Sexo.femenino));

            }
            else if((<HTMLInputElement>document.getElementById("selectFiltro")).value == "Todos")
            {
                llenarTabla(listaPersonas);
            }            
        }
        else if(obj.id == "cboxID" || obj.id == "cboxNombre" || obj.id == "cboxApellido" || obj.id == "cboxEdad")
        {
            llenarTabla(listaPersonas);
        }
        else if(obj.id == "btnPromedio")
        {
            if( (<HTMLInputElement>document.getElementById("selectFiltro")).value == "Masculino")
            {                
                calculaPromedio(listaPersonas.filter(item => (<Cliente>item).sexo == Sexo.masculino));
            }
            else if( (<HTMLInputElement>document.getElementById("selectFiltro")).value == "Femenino")
            {                
                calculaPromedio(listaPersonas.filter(item => (<Cliente>item).sexo == Sexo.femenino));

            }
            else
            {                
                calculaPromedio(listaPersonas);
            }
        }
        else if(obj.className== "btnSeleccionar")
        {
            seleccionarCliente((<Cliente>(listaPersonas[Number((<HTMLInputElement>obj).name)])));
        }
        else if(obj.id == "btnLimpiar")
        {
            limpiarDatos();
            listaPersonas.splice(0, listaPersonas.length);
            llenarTabla(listaPersonas);
        }
        
                        
        
    }
        
}

function limpiarTabla():void
{
    let tCuerpo: HTMLTableElement = <HTMLTableElement>document.getElementById("tCuerpo");

    while (tCuerpo.rows.length > 0)
    {
        tCuerpo.removeChild(tCuerpo.childNodes[0]);
    }
}

function llenarTabla(listaPersonas:Array<Persona>):void
{
    limpiarTabla();
    let nombre: string = "";
    let apellido: string = "";
    let edad: any;
    let id: any;    
    let sexo: string;
    let main: EventListenerObject = new Main();

    let tCuerpo: HTMLTableElement = <HTMLTableElement>document.getElementById("tCuerpo");

    for (const item of listaPersonas)
    {

        id = item.id;
        nombre = item.nombre;
        apellido = item.apellido;
        edad = (<Cliente>item).edad;
        sexo = (<Cliente>item).sexo.toString();

        let btnSeleccionar:HTMLInputElement = document.createElement('input');
        btnSeleccionar.type = 'button';
        btnSeleccionar.className = 'btnSeleccionar';
        btnSeleccionar.value = "Seleccionar";
        btnSeleccionar.name = String(listaPersonas.indexOf(item));
        btnSeleccionar.addEventListener("click", main);

        let tr: HTMLTableRowElement = document.createElement("tr");

        if((<HTMLInputElement>document.getElementById("cboxID")).checked)
        {
            let td1: HTMLTableDataCellElement = document.createElement("td");
            var nodoTexto = document.createTextNode(id);
            td1.appendChild(nodoTexto);
            tr.appendChild(td1);
            (<HTMLInputElement>document.getElementById("thID")).hidden= false;                            

        }
        else
        {
            (<HTMLInputElement>document.getElementById("thID")).hidden= true;                    
        }

        if((<HTMLInputElement>document.getElementById("cboxNombre")).checked)
        {
            
            let td2: HTMLTableDataCellElement = document.createElement("td");
            var nodoTexto = document.createTextNode(nombre);
            td2.appendChild(nodoTexto);
            tr.appendChild(td2);
            (<HTMLInputElement>document.getElementById("thNombre")).hidden= false;                            

        }
        else
        {
            (<HTMLInputElement>document.getElementById("thNombre")).hidden= true;                    
        }

        if((<HTMLInputElement>document.getElementById("cboxApellido")).checked)
        {
            let td3: HTMLTableDataCellElement = document.createElement("td");
            var nodoTexto = document.createTextNode(apellido);
            td3.appendChild(nodoTexto);
            tr.appendChild(td3);
            (<HTMLInputElement>document.getElementById("thApellido")).hidden= false;                            

        }
        else
        {
            (<HTMLInputElement>document.getElementById("thApellido")).hidden= true;                    
        }

        if((<HTMLInputElement>document.getElementById("cboxEdad")).checked)
        {           
            let td4: HTMLTableDataCellElement = document.createElement("td");
            var nodoTexto = document.createTextNode(edad);
            td4.appendChild(nodoTexto);
            tr.appendChild(td4);
            (<HTMLInputElement>document.getElementById("thEdad")).hidden= false;                            
        }
        else
        {
            (<HTMLInputElement>document.getElementById("thEdad")).hidden= true;                    
        }


        let td5: HTMLTableDataCellElement = document.createElement("td");
        var nodoTexto = document.createTextNode(sexo);
        td5.appendChild(nodoTexto);
        tr.appendChild(td5);

        let td6: HTMLTableDataCellElement = document.createElement("td");
        td6.appendChild(btnSeleccionar);
        tr.appendChild(td6);


        tCuerpo.appendChild(tr);
        
    }
}

function agregarPersona():void{

    let id = 1;
    if(listaPersonas.length != 0)
    {
        let reducePersonas = listaPersonas;
        id = reducePersonas.reduce((idMax, persona) =>
        {
            if(persona.id > idMax)
            {
                return persona.id;
            }
            else
            {
                return idMax;
            }
        },0) + 1;

    }

    let nombre:string = (<HTMLInputElement>document.getElementById("txtNombre")).value;
    let apellido:string = (<HTMLInputElement>document.getElementById("txtApellido")).value;
    let edad:string = (<HTMLInputElement>document.getElementById("numEdad")).value;
    let sexo:string = (<HTMLInputElement>document.getElementById("selectSexo")).value;          

    if(sexo == "Masculino")
    {
        let cliente: Cliente = new Cliente(Number(edad),id,nombre,apellido,Sexo.masculino);
        listaPersonas.push(cliente);
    }
    else
    {
        let cliente: Cliente = new Cliente(Number(edad),id,nombre,apellido,Sexo.femenino);
        listaPersonas.push(cliente);
    }
    limpiarDatos();
    llenarTabla(listaPersonas);

}

function calculaPromedio(listaPers:Array<Persona>)
{
    let promedio = (listaPers.reduce((promedio, item) =>
    {
        return promedio + (<Cliente>item).edad;
    },0) ) / listaPers.length;

    (<HTMLInputElement>document.getElementById("numPromedio")).value = promedio.toString();
}

function seleccionarCliente(cliente:Cliente)
{
    (<HTMLInputElement>document.getElementById("txtid")).value = cliente.id.toString();
    (<HTMLInputElement>document.getElementById("txtNombre")).value = cliente.nombre;
    (<HTMLInputElement>document.getElementById("txtApellido")).value = cliente.apellido;
    (<HTMLInputElement>document.getElementById("numEdad")).value = cliente.edad.toString();
    if(cliente.sexo = Sexo.masculino)
    {

        (<HTMLInputElement>document.getElementById("selectSexo")).value = "Masculino";  
    }
    else
    {
        (<HTMLInputElement>document.getElementById("selectSexo")).value = "Femenino";  
    }
}

function limpiarDatos()
{
    (<HTMLInputElement>document.getElementById("txtNombre")).value = "";
    (<HTMLInputElement>document.getElementById("txtApellido")).value ="";
    (<HTMLInputElement>document.getElementById("numEdad")).value = "";
    (<HTMLInputElement>document.getElementById("txtid")).value = "";
}

function eliminarCliente(id:number)
{
     
    let persona = listaPersonas.filter(item => (item).id == id);
    if(persona.length === 0)
    {
        alert("ID No valido para borrar, por favor seleccione un cliente de la lista");
    }
    else
    {
        for(const item of listaPersonas)
        {
            if((<Cliente>persona[0]).id== item.id)
            {
                listaPersonas.splice(listaPersonas.indexOf(item),1);
            }
        }
        alert("Cliente borrado exitosamente");
        
    }
    limpiarDatos();
    llenarTabla(listaPersonas);
}