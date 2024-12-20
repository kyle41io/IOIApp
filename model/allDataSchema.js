import { DataTypes } from "sequelize";

const createAllDataModel = async (sequelize) => {
  const AllData = sequelize.define('AllData', {
    den1: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    den2: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    den3: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    densan:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nhietdo:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    doam:{
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  });

  return AllData;
}

const createDen3Model = async (sequelize) => {
  const Den3 = sequelize.define('Den3', {
    trangthai: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    gio: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    phut: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  });

  return Den3;
}

export {
  createAllDataModel,
  createDen3Model
}