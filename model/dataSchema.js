import { DataTypes } from "sequelize";

const createDataModel = async (sequelize) => {
  const Data = sequelize.define('Data', {
    den1: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    den2: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    densan: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nhietdo: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    doam: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  });

  return Data;
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

const associateModels = (Data, Den3) => {
  // Một bản ghi Data có một bản ghi Den3
  Data.hasOne(Den3, {
    foreignKey: 'dataId', // Khóa ngoại trong bảng Den3
    as: 'den3', // Tên alias
  });

  // Một bản ghi Den3 thuộc về một bản ghi Data
  Den3.belongsTo(Data, {
    foreignKey: 'dataId',
    as: 'data',
  });
};


export {
  createDataModel,
  createDen3Model,
  associateModels
}