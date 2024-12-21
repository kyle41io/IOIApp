import { Sequelize } from 'sequelize';
import { createDen3Model, associateModels } from '../model/DataSchema.js';
import { createDataModel } from '../model/DataSchema.js';
import pg from "pg"

const sequelize = new Sequelize('postgres', 'lysa', '1234', {
  host: 'localhost',
  dialect: 'postgres',
  dialectModule: pg
});

let DataModel = null;
let Den3Model = null;

const connection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    DataModel = await createDataModel(sequelize);
    Den3Model = await createDen3Model(sequelize);
    associateModels(DataModel, Den3Model);

  // Đồng bộ database
    await sequelize.sync({ force: true });
    // await sequelize.sync();
    console.log('Data synced successfully.');
    return { DataModel, Den3Model };
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

export {
  connection,
  DataModel,
  Den3Model
}