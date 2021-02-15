import { DataTypes ,  Model ,  Optional } from "sequelize"
import connection from "../../DataBase/DataBase";

interface AtrDbrCutanea{
    id?:number,
    id_cliente:number,
    dbrcTricipitalD:number,
    dbrcTricipitalE:number,
    dbrcAbdominal:number,
    dbrcPeitoral:number
}

interface CreateAtrDbrCutanea extends Optional<AtrDbrCutanea,"id">{}

class DbrCutanea extends Model<CreateAtrDbrCutanea,AtrDbrCutanea> implements AtrDbrCutanea{
    public id !: number;
    public id_cliente !: number;
    public dbrcTricipitalD !: number;
    public dbrcTricipitalE !: number;
    public dbrcAbdominal !: number;
    public dbrcPeitoral !: number
}

DbrCutanea.init(
    {
        id:{
            primaryKey:true,
            autoIncrement:true,
            type:DataTypes.INTEGER
        },
        id_cliente:{
            type:DataTypes.INTEGER,
            allowNull:false,
        },
        dbrcTricipitalD:{
            type:DataTypes.FLOAT,
            allowNull:false,
        },
        dbrcTricipitalE:{
            type:DataTypes.FLOAT,
            allowNull:false,
        },
        dbrcAbdominal:{
            type:DataTypes.FLOAT,
            allowNull:false,
        },
        dbrcPeitoral:{
            type:DataTypes.FLOAT,
            allowNull:false,
        }
    },
    {
        sequelize:connection,
        tableName:"Dobras"
    }
)

export { DbrCutanea , AtrDbrCutanea}