import { Model , Optional , DataTypes } from "sequelize"
import connection from "../../DataBase/DataBase";

interface AtrMedida {
    id?:number,
    id_cliente:number,
    altura:number,
    peso:number,
}

interface CreateAtrMedida extends Optional<AtrMedida,"id">{}

class Medida extends Model<AtrMedida,CreateAtrMedida> implements AtrMedida{
    public id !: number;
    public id_cliente !: number;
    public altura !: number;
    public peso !: number;

    public readonly createAt!: Date;
    public readonly updateAt!: Date;
}

Medida.init(
    {
        id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true,
        },
        id_cliente:{
            type:DataTypes.INTEGER,
            allowNull:false,
        },
        altura:{
            type:DataTypes.FLOAT,
            allowNull:false,
        },
        peso:{
            type:DataTypes.FLOAT,
            allowNull:false,
        },
    },
    {
        sequelize:connection,
        tableName:"Medidas"
    }
)


export { Medida , AtrMedida }