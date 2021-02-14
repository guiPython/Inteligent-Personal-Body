import { Association, DataTypes, Model , Optional} from "sequelize"
import  connection  from "../../DataBase/DataBase";
import { CircMusculo } from "./circMusculos";
import { DbrCutanea } from "./dbrCutaneas";
import { Medida } from "./medida"

interface AtrCliente {
    id?:number,
    id_usuario:number;
    nome:string,
    cpf:string,
    data_nascimento:Date,
    biotipo:string,
    genero:string,
    email:string,
    status:boolean
}

interface CreateAtrCliente extends Optional<AtrCliente,"id">{}

class Cliente extends Model<AtrCliente,CreateAtrCliente> implements AtrCliente{

    public id !: number;
    public id_usuario !: number;
    public nome !: string;
    public cpf !: string;
    public data_nascimento !: Date;
    public biotipo !: string;
    public genero !: string;
    public email !: string;
    public status !: boolean;

    public readonly createAt!: Date;
    public readonly updateAt!: Date

    public static associations : {
        medidas: Association<Cliente,Medida>,
        dobras:  Association<Cliente,DbrCutanea>
        circunferencias: Association<Cliente,CircMusculo>
    }
}

Cliente.init(
    {
        id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true,
        },
        id_usuario:{
            type:DataTypes.INTEGER,
            allowNull:false,
        },
        nome:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        cpf:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        data_nascimento:{
            type:DataTypes.DATE,
            allowNull:false
        },
        biotipo:{ 
            type:DataTypes.STRING,
            allowNull:false,
        },
        genero:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        email:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        status:{
            type:DataTypes.BOOLEAN,
            allowNull:false
        }
    },
    {
        sequelize:connection,
        tableName:"Clientes"
    }
)

Cliente.hasMany(Medida,{sourceKey:"id",foreignKey:"id_cliente",as:"medidas"})
Cliente.hasMany(DbrCutanea,{sourceKey:"id",foreignKey:"id_cliente",as:"dobras"})
Cliente.hasMany(CircMusculo,{sourceKey:"id",foreignKey:"id_cliente",as:"circunferencias"})

export{ Cliente , AtrCliente }