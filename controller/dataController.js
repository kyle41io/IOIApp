import { AllDataModel } from "../postgres/postgres.js";
import { Den3Model } from "../postgres/postgres.js";

export const getAllData = async (req, res) => {
  try {
    const datas = await AllDataModel.findAll();
    if (datas.length === 0) {
      return res.status(200).json({ "error": "No data found" });
    }
    return res.status(200).json(datas);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ "error": "Internal server error" });
  }
};

export const getAllDen3 = async (req, res) => {
  try {
    const datas = await Den3Model.findAll();
    if (datas.length === 0) {
      return res.status(200).json({ "error": "No data found" });
    }
    return res.status(200).json(datas);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ "error": "Internal server error" });
  }
};

export const createData = async (req, res) => {
  const {den1, den2, den3, densan, nhietdo, doam} = req.body;
  try {
    await AllDataModel.create(req.body);
    return res.status(201).json({message:"Data created successfully"});
  } catch (error) {
    console.error(error);
    return res.status(500).json({ "error": "Internal server error" });
  }
};

export const createDen3 = async (req, res) => {
  const {trangthai, gio, phut} = req.body;
  try {
    await Den3Model.create(req.body);
    return res.status(201).json({message:"Data created successfully"});
  } catch (error) {
    console.error(error);
    return res.status(500).json({ "error": "Internal server error" });
  }
};

export const getDataById = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await AllDataModel.findByPk(id);
    if (!data) {
      return res.status(404).json({ "error": "Data not found" });
    }
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ "error": "Internal server error" });
  }
};

export const updateData = async (req, res) => {
  const { id } = req.params;
  try {
    const [updated] = await AllDataModel.update(req.body, {
      where: { id: id }
    });
    if (updated) {
      const updatedData = await AllDataModel.findByPk(id);
      return res.status(200).json(updatedData);
    }
    return res.status(404).json({ "error": "Data not found" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ "error": "Internal server error" });
  }
};

export const deleteData = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await AllDataModel.destroy({
      where: { id: id }
    });
    if (deleted) {
      return res.status(204).send();
    }
    return res.status(404).json({ "error": "Data not found" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ "error": "Internal server error" });
  }
};