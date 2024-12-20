import { Sequelize } from 'sequelize';
import { createDen3Model } from '../model/allDataSchema.js';
import { createAllDataModel } from '../model/allDataSchema.js';
import pg from "pg"

const sequelize = new Sequelize('postgres', 'lysa', '1234', {
  host: 'localhost',
  dialect: 'postgres',
  dialectModule: pg
});

let AllDataModel = null;
let Den3Model = null;

const  connection = async()=>{
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    AllDataModel = await createAllDataModel(sequelize);
    Den3Model = await createDen3Model(sequelize);
    await sequelize.sync();
    console.log('Data synced successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

export {
  connection,
  AllDataModel,
  Den3Model
}