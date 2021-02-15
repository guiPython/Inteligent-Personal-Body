import { Model , DataTypes , Optional } from "sequelize"
import connection  from "../../DataBase/DataBase"

interface AtrCircMusculo {
    id?:number,
    id_cliente:number,
    circBracoD:number,
    circBracoE:number,
    circTorax:number,
    circAbdomen:number,
    circCintura:number,
    circGluteo:number,
    circCoxaD:number,
    circCoxaE:number,
    circPernaD:number,
    circPernaE:number,
}

interface CreateAtrCircMusculo extends Optional<AtrCircMusculo,"id">{}

class CircMusculo extends Model<AtrCircMusculo,CreateAtrCircMusculo> implements AtrCircMusculo{
    public id !: number;
    public id_cliente !: number;
    public circBracoD !: number;
    public circBracoE !: number;
    public circTorax !: number;
    public circAbdomen !: number;
    public circCintura !: number;
    public circGluteo !: number;
    public circCoxaD !: number;
    public circCoxaE !: number;
    public circPernaD !: number;
    public circPernaE !: number;


    public readonly createAt!: Date;
    public readonly updateAt!: Date;
}

CircMusculo.init(
    {
        id:{
            primaryKey:true,
            autoIncrement:true,
            type:DataTypes.INTEGER,
        },
        id_cliente:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        circBracoD:{
            type:DataTypes.FLOAT,
            allowNull:false,
        },
        circBracoE:{
            type:DataTypes.FLOAT,
            allowNull:false,
        },
        circTorax:{
            type:DataTypes.FLOAT,
            allowNull:false,
        },
        circAbdomen:{
            type:DataTypes.FLOAT,
            allowNull:false,
        },
        circCintura:{
            type:DataTypes.FLOAT,
            allowNull:false,
        },
        circGluteo:{
            type:DataTypes.FLOAT,
            allowNull:false,
        },
        circCoxaD:{
            type:DataTypes.FLOAT,
            allowNull:false,
        },
        circCoxaE:{
            type:DataTypes.FLOAT,
            allowNull:false,
        },
        circPernaD:{
            type:DataTypes.FLOAT,
            allowNull:false,
        },
        circPernaE:{
            type:DataTypes.FLOAT,
            allowNull:false,
        },
    },
    {
        sequelize:connection,
        tableName:"Circunferncias"
    }
)

export { CircMusculo , AtrCircMusculo }