import { Sequelize } from "sequelize"
import path from "path"

const connection = new Sequelize({
    dialect:"sqlite",
    storage:path.resolve(__dirname,"db.sqlite"),
    logging:false,
    define:{timestamps:true}
})

export { connection }