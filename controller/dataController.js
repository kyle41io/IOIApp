import { DataModel, Den3Model } from "../postgres/postgres.js";

export const getData = async (req, res) => {
  try {
    const datas = await DataModel.findAll({
      include: {
        model: Den3Model,
        as: "den3", // Alias đã định nghĩa trong quan hệ
      },
    });

    if (datas.length === 0) {
      return res.status(200).json({ error: "No data found" });
    }

    // Tùy chỉnh cấu trúc trả về
    const formattedData = datas.map((data) => {
      const { id, den1, den2, densan, nhietdo, doam, den3 } = data.toJSON();
      return {
        id,
        den1,
        den2,
        densan,
        nhietdo,
        doam,
        den3: den3 ? { trangthai: den3.trangthai, gio: den3.gio, phut: den3.phut } : null,
      };
    });

    return res.status(200).json(formattedData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};


export const createData = async (req, res) => {
  const { den1, den2, den3, densan, nhietdo, doam } = req.body;

  try {
    // Tạo bản ghi trong bảng Data
    const data = await DataModel.create({ den1, den2, densan, nhietdo, doam });

    // Nếu `den3` tồn tại, tạo bản ghi trong bảng Den3
    if (den3) {
      await Den3Model.create({
        ...den3, // { trangthai, gio, phut }
        dataId: data.id, // Liên kết với Data
      });
    }

    return res.status(201).json({ message: "Data created successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const updateData = async (req, res) => {
  const { id } = req.params; // Lấy ID của bản ghi cần cập nhật từ URL
  const { den1, den2, den3, densan, nhietdo, doam } = req.body;

  try {
    // Tìm bản ghi trong bảng Data
    const data = await DataModel.findByPk(id, {
      include: {
        model: Den3Model,
        as: "den3", // Bao gồm liên kết Den3
      },
    });

    if (!data) {
      return res.status(404).json({ error: "Data not found" });
    }

    // Cập nhật bảng Data
    await data.update({ den1, den2, densan, nhietdo, doam });

    // Cập nhật bảng Den3 nếu thông tin tồn tại
    if (den3) {
      if (data.den3) {
        // Nếu đã có liên kết trong Den3, cập nhật
        await data.den3.update(den3); // den3: { trangthai, gio, phut }
      } else {
        // Nếu chưa có, tạo mới liên kết
        await Den3Model.create({
          ...den3, // { trangthai, gio, phut }
          dataId: data.id, // Liên kết với Data
        });
      }
    }

    // Lấy lại dữ liệu đã cập nhật để trả về
    const updatedData = await DataModel.findByPk(id, {
      include: {
        model: Den3Model,
        as: "den3",
      },
    });

    // Định dạng kết quả trả về
    const { den3: updatedDen3 } = updatedData.toJSON();
    return res.status(200).json({
      id: updatedData.id,
      den1: updatedData.den1,
      den2: updatedData.den2,
      densan: updatedData.densan,
      nhietdo: updatedData.nhietdo,
      doam: updatedData.doam,
      den3: updatedDen3
        ? { trangthai: updatedDen3.trangthai, gio: updatedDen3.gio, phut: updatedDen3.phut }
        : null,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
