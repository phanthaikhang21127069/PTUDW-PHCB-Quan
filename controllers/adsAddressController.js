const controller = {};
const models = require("../models");
const { Op } = require('sequelize');
const moment = require('moment');
const cloudinary=require('../middlewares/cloudinary');
const upload=require('../middlewares/multer');

controller.show = async (req, res) => {
  res.locals.wards = await models.Ward.findAll({
    attributes: [
      "id",
      "wardName",
      "districtName",
      "zipCode",
      "population",
      "imagePath",
    ],
    where: {
      districtName: "Quận 1",
    },
    order: [["createdAt", "DESC"]],
  });

  res.locals.adstypes = await models.Adstype.findAll({
    attributes: [
      "id",
      "name",
    ],
    order: [["createdAt", "DESC"]],
  });

  res.locals.places = await models.Place.findAll({
    attributes: [
      "id",
      "diaChi",
      "khuVuc",
      "loaiVT",
      "hinhThuc",
      "quyHoach",
      "hinhAnh",
      "hinhAnhId",
    ],
    where: {
      khuVuc: {
        [Op.like]: '%Quận 1%', // Use the like operator to check for 'Quận 5' in khuVuc
      },
    },
    order: [["createdAt", "DESC"]],
  });

  res.locals.requesteditplaces = await models.Requesteditplace.findAll({
    attributes: [
      "id",
      "diaChi",
      "khuVuc",
      "loaiVT",
      "hinhThuc",
      "quyHoach",
      "hinhAnh",
      "hinhAnhId",
    ],
    where: {
      khuVuc: {
        [Op.like]: '%Quận 1%', // Use the like operator to check for 'Quận 5' in khuVuc
      },
    },
    order: [["createdAt", "DESC"]],
  });
  // const distinctKhuVuc = await models.Place.findAll({
  //   attributes: [
  //     [models.sequelize.fn('DISTINCT', models.sequelize.col('khuVuc')), 'khuVuc'],
  //   ],
  // });

  // res.locals.places = distinctKhuVuc.map(({ khuVuc }) => ({ khuVuc })); // Map to the required format
  res.render("adsAddress");
};


controller.requestEditPlace = async (req, res) => {
  let {id, diaChi, khuVuc, loaiVT, hinhThuc, isQuyHoach, liDoChinhSua, hinhAnh, hinhAnhId} = req.body;
  result = {}
  console.log(hinhAnhId);
  const existingPlace = await models.Requesteditplace.findOne({
    where: {
      placeId: id,
    },
  });
  try {
    if (existingPlace) {
      // Nếu id đã tồn tại, có thể xử lý thông báo hoặc chuyển hướng
      res.send("Vui lòng chỉnh sửa thêm ở danh sách yêu cầu chỉnh sửa điểm đặt bảng quảng cáo");
    }
    else {
      // const result = await cloudinary.uploader.upload(req.file.path,{
      //   folder:'places'
      // });
      if (req.file && req.file.path) {
        result = await cloudinary.uploader.upload(req.file.path, {
          folder: 'places'
        });
      }
      await models.Requesteditplace.create({
        placeId: id,
        diaChi, 
        khuVuc, 
        loaiVT, 
        hinhThuc, 
        quyHoach: isQuyHoach ? "ĐÃ QUY HOẠCH" : "CHƯA QUY HOẠCH",
        liDoChinhSua,
        hinhAnh: result.secure_url ? result.secure_url : hinhAnh,
        hinhAnhId: result.public_id ? result.public_id : hinhAnhId,
      });
      res.redirect("/diem-dat-bang-quang-cao");
    }
  } catch (error) {
    if (result.public_id) {
      await cloudinary.uploader.destroy(result.public_id);
    }
    res.send("Không thể thêm điểm đặt");
    console.error(error);
  }
}

controller.continueEditRequest = async (req, res) => {
  let {id, diaChi, khuVuc, loaiVT, hinhThuc, isQuyHoach, hinhAnhId, liDoChinhSua} = req.body;
  let result = {}
  try {
    if (req.file && req.file.path) {
      result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'places'
      });
    }
    const updateData = {
      diaChi, 
      khuVuc, 
      loaiVT, 
      hinhThuc, 
      quyHoach: isQuyHoach ? "ĐÃ QUY HOẠCH" : "CHƯA QUY HOẠCH",
      liDoChinhSua,
    }
    if (result.secure_url) {
      updateData.hinhAnh = result.secure_url;
      updateData.hinhAnhId = result.public_id;
    }
    await models.Requesteditplace.update(updateData,{where: {id}});
    if (hinhAnhId && result.secure_url) {
      await cloudinary.uploader.destroy(hinhAnhId);
    }
    res.send("Đã cập nhật điểm đặt!");
  } catch (error) {
    if (result.public_id) {
      await cloudinary.uploader.destroy(result.public_id);
    }
    res.send("Không thể cập nhật điểm đặt!");
    console.error(error);
  }
}

module.exports = controller;
