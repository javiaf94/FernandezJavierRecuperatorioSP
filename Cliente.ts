enum Sexo {masculino="masculino",femenino="femenino"};

class Cliente extends Persona{
        
    public edad:number;
    public sexo:Sexo;

    public constructor(edad:number,id:number, nombre:string, apellido:string, sexo:Sexo){
        super(id,nombre,apellido);
        this.edad = edad;
        this.sexo = sexo;
    }
}