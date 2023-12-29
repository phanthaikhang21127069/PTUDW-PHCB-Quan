const controller = {};
const { Op } = require('sequelize');
const models = require("../models");
const moment = require('moment');
const cloudinary=require('../middlewares/cloudinary');


controller.deleteRequest=async(req,res)=>{
  let id = isNaN(req.params.id) ? 0 : parseInt(req.params.id);
  let hinhAnhId = req.body.hinhAnhId;

  try {
    await models.Requestads.destroy(
      {where: {id}}
    );
    await cloudinary.uploader.destroy(hinhAnhId);

    res.send("Đã xoá yêu cầu!");
  } catch (error) {
    res.send("Không thể xoá yêu cầu!");
    console.error(error);
  }
}


controller.addRequest = async (req, res) => {
  if (!req.body || typeof req.body !== 'object') {
    res.send('Invalid request body');
    return;
  }

  const {
    congTy,
    diaChiCongTy,
    dienThoai,
    email,
    diaChiRequest,
    tenBangQuangCao,
    noiDungQC,
    kichThuoc,
    soLuong,
    ngayBatDau,
    ngayKetThuc, 
  } = req.body;

  const ngayBatDauDate = moment(ngayBatDau, 'MM/DD/YYYY', true);
  const ngayKetThucDate = moment(ngayKetThuc, 'MM/DD/YYYY', true);

  const isValidDateBD = ngayBatDauDate.isValid();
  const isValidDateKT = ngayKetThucDate.isValid();

  if (!isValidDateBD) {
    return res.json({ error: true, message: 'Ngày Bắt Đầu không hợp lệ!' });
  }
  if (!isValidDateKT) {
    return res.json({ error: true, message: 'Ngày Kết Thúc không hợp lệ!' });
  }
  if (ngayBatDauDate.isAfter(ngayKetThucDate)) {
    return res.json({ error: true, message: 'Ngày Bắt Đầu không thể sau Ngày Kết Thúc!' });
  }
  const requestPlace = await models.Place.findOne({
    attributes: ["id"],
    where: { diaChi: diaChiRequest }
  });
  let placeId = requestPlace.getDataValue("id");

  try {
    const result = await cloudinary.uploader.upload(req.file.path,{
      folder:'requestAds'
    });
    await models.Requestads.create({
      congTy,
      diaChiCongTy,
      dienThoai,
      email,
      placeId: placeId,
      tenBangQuangCao,
      noiDungQC,
      kichThuoc,
      soLuong,
      ngayBatDau,
      ngayKetThuc,
      tinhTrang: 'Chờ phê duyệt',
      hinhAnh:result.secure_url,
      hinhAnhId:result.public_id,
    });
    res.redirect('/yeu-cau');
  } catch (error) {
    res.send('Không thể thêm');
    console.error(error);
  }
};

controller.editRequest = async (req, res) => {
  let {id,
    congTy,
    diaChiCongTy,
    dienThoai,
    email,
    diaChiRequest,
    tenBangQuangCao,
    noiDungQC,
    kichThuoc,
    soLuong,
    ngayBatDau,
    ngayKetThuc,
    tinhTrang,
    hinhAnhId
    } = req.body;


    const ngayBatDauDate = moment(ngayBatDau, 'MM/DD/YYYY', true);
    const ngayKetThucDate = moment(ngayKetThuc, 'MM/DD/YYYY', true);
  
    const isValidDateBD = ngayBatDauDate.isValid();
    const isValidDateKT = ngayKetThucDate.isValid();
  
    if (!isValidDateBD) {
      return res.json({ error: true, message: 'Ngày Bắt Đầu không hợp lệ!' });
    }
  
    if (!isValidDateKT) {
      return res.json({ error: true, message: 'Ngày Kết Thúc không hợp lệ!' });
    }
    
    if (ngayBatDauDate.isAfter(ngayKetThucDate)) {
      return res.json({ error: true, message: 'Ngày Bắt Đầu không thể sau Ngày Kết Thúc!' });
    }

    const requestPlace = await models.Place.findOne({ 
      attributes: ["id"],
      where: {diaChi: diaChiRequest} 
    });
    let placeId = requestPlace.getDataValue("id");
  try {
      const result = await cloudinary.uploader.upload(req.file.path,{
        folder:'requestAds'
      });
      await cloudinary.uploader.destroy(hinhAnhId);
  
      await models.Requestads.update(
        { 
          congTy,
          diaChiCongTy,
          dienThoai,
          email,
          placeId:placeId,
          tenBangQuangCao,
          noiDungQC,
          kichThuoc,
          soLuong,
          ngayBatDau,
          ngayKetThuc,
          tinhTrang,
          hinhAnh:result.secure_url,
          hinhAnhId:result.public_id,
        },
        {where: {id}}
      );
      res.send("Đã cập nhật yêu cầu!");
  } catch (error) {
    res.send("Không thể cập nhật yêu cầu!");
    console.error(error);
  }
};



controller.show = async (req, res) => {
  res.locals.places = await models.Place.findAll({
    attributes: [
      "id",
      "diaChi",
      "khuVuc",
      "loaiVT",
      "hinhThuc",
      "quyHoach",
      "hinhAnh",
      "longitude",
      "latitude"
    ],
    order: [["diaChi", "ASC"]],
    where: {
      '$Place.khuVuc$': {
        [Op.like]: '%Quận 1%',
      },
    }
  });
  res.locals.requestads = await models.Requestads.findAll({
    include: [{
      model: models.Place,
      attributes: [
        "diaChi",
        "khuVuc",
        "loaiVT",
        "longitude",
        "latitude"
      ],
    }],
    attributes: [
      "id",
      "congTy",
      "diaChiCongTy",
      "dienThoai",
      "email",
      "tenBangQuangCao",
      "noiDungQC",
      "kichThuoc",
      "soLuong",
      "ngayBatDau",
      "ngayKetThuc",
      "tinhTrang",
      "hinhAnh",
      "hinhAnhId"
    ],
    order: [["congTy", "ASC"]],
    where: {
      '$Place.khuVuc$': {
        [Op.like]: '%Quận 1%',
      },
    }
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
      "longitude",
      "latitude"
    ],
    order: [["diaChi", "ASC"]],
    where: {
      '$Place.khuVuc$': {
        [Op.like]: '%Quận 1%',
      },
    }
  });

  res.render("request",{
    requestads: res.locals.requestads.map(detail => ({
      ...detail.toJSON(),
      formattedNgayBatDau: moment(detail.ngayBatDau).format('MM/DD/YYYY'),
      formattedNgayKetThuc: moment(detail.ngayKetThuc).format('MM/DD/YYYY'),
    })), 
  });
};


module.exports = controller;
