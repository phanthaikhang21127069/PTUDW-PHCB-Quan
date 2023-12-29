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
  res.locals.places = await models.Place.findAll({
    attributes: [
      "id",
      "diaChi",
      "khuVuc",
      "loaiVT",
      "hinhThuc",
      "hinhAnhId",
      "quyHoach",
      "hinhAnh",
    ],
    where: {
      khuVuc: {
        [Op.like]: '%Quận 1%', // Use the like operator to check for 'Quận 5' in khuVuc
      },
    },
    order: [["createdAt", "DESC"]],
  });

  res.locals.placedetails = await models.Placedetail.findAll({
    include: [{
      model: models.Place,
      attributes: [
        "diaChi",
        "khuVuc",
      ],
    }],
    attributes: [
      "id",
      "adName",
      "adSize",
      "adQuantity",
      "expireDay",
      "imagePath",
      "publicImageId",
    ],
    where: {
      '$Place.khuVuc$': {
        [Op.like]: '%Quận 1%', // Use the like operator to check for 'Quận 5' in khuVuc
      },
    },
    order: [["createdAt", "DESC"]],
    // limit: 10,
  });

  res.locals.requesteditads = await models.Requesteditads.findAll({
    include: [{
      model: models.Place,
      attributes: [
        "diaChi",
        "khuVuc",
      ],
    }],
    attributes: [
      "id",
      "adName",
      "adSize",
      "adQuantity",
      "expireDay",
      "imagePath",
      "publicImageId",
    ],
    where: {
      '$Place.khuVuc$': {
        [Op.like]: '%Quận 1%', // Use the like operator to check for 'Quận 5' in khuVuc
      },
    },
    order: [["createdAt", "DESC"]],
    // limit: 10,
  });

  res.locals.adstypes = await models.Adstype.findAll({
    attributes: [
      "id",
      "name",
    ],
    order: [["createdAt", "DESC"]],
  });

  res.locals.reporttypes = await models.Reporttype.findAll({
    attributes: [
      "id",
      "name",
    ],
    order: [["createdAt", "DESC"]],
  });

  res.render("manage-ads", {
    placedetails: res.locals.placedetails.map(detail => ({
      ...detail.toJSON(),
      formattedExpireDay: moment(detail.expireDay).format('MM/DD/YYYY'),
    })),
    requesteditads: res.locals.requesteditads.map(detail => ({
      ...detail.toJSON(),
      formattedExpireDay: moment(detail.expireDay).format('MM/DD/YYYY'),
    })),   
  });
};

controller.requestEditAds = async (req, res) => {
  let { id, adName, diaChiAds, adSize, adQuantity, expireDay, liDoChinhSua } = req.body;

  const existingPlace = await models.Requesteditads.findOne({
    where: {
      originId: id,
    },
  });

  const parsedDate = moment(expireDay, 'MM/DD/YYYY', true);
  const isValidDate = parsedDate.isValid();

  if (!isValidDate) {
    return res.json({ error: true, message: 'Ngày không hợp lệ!' });
  }

  const adsPlace = await models.Place.findOne({
    attributes: ["id"],
    where: { diaChi: diaChiAds }
  });

  let placeId = adsPlace.getDataValue("id");

  try {
    
    if (existingPlace) {
      // Nếu id đã tồn tại, có thể xử lý thông báo hoặc chuyển hướng
      res.send("Vui lòng chỉnh sửa thêm ở danh sách yêu cầu chỉnh sửa bảng quảng cáo");
    }
    
    else {

      const result = await cloudinary.uploader.upload(req.file.path,{
        folder:'ads'
      });

      await models.Requesteditads.create({
        placeId: placeId,
        originId: id,
        adName,
        adSize,
        adQuantity,
        expireDay,
        liDoChinhSua,
        imagePath:result.secure_url,
        publicImageId:result.public_id,
      });
      res.redirect("/bang-quang-cao");
    }
  } catch (error) {
    res.send("Không thể gửi yêu cầu chỉnh sửa bảng QC");
    console.error(error);
  }
}

controller.continueRequestEditAds = async (req, res) => {
  let {id, originId, adName, diaChiAds, adSize, adQuantity, expireDay, publicImageId} = req.body;

  const parsedDate = moment(expireDay, 'MM/DD/YYYY', true);
  const isValidDate = parsedDate.isValid();

  if (!isValidDate) {
    return res.json({ error: true, message: 'Ngày không hợp lệ!' });
  }

  const adsPlace = await models.Place.findOne({ 
    attributes: ["id"],
    where: {diaChi: diaChiAds} 
  });

  let placeId = adsPlace.getDataValue("id");

  try {
    const result = await cloudinary.uploader.upload(req.file.path,{
      folder:'ads'
    });
    await cloudinary.uploader.destroy(publicImageId);
    await models.Requesteditads.update(
      { 
        placeId: placeId,
        originId: originId,
        adName, 
        adSize, 
        adQuantity, 
        expireDay,
        imagePath:result.secure_url,
        publicImageId:result.public_id,
      },
      {where: {id}}
    );
    res.send("Đã cập nhật bảng QC!");
  } catch (error) {
    res.send("Không thể cập nhật bảng QC!");
    console.error(error);
  }
}
module.exports = controller;
