import { Model , Optional } from "sequelize"

interface AtrMedida {
    id:number,
    idCliente:number,
    altura:number,
    peso:number,
    idSupMusc:number,
    idInfMusc:number
}

interface CreateAtrMedida extends Optional<AtrMedida,"id">{}

class Medida extends Model<AtrMedida,CreateAtrMedida> implements AtrMedida{
    public id !: number;
    public idCliente !: number;
    public altura !: number;
    public peso !: number;
    public idSupMusc !: number;
    public idInfMusc !: number;
}

export { Medida }