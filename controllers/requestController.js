const controller = {};
const { Op } = require('sequelize');
const models = require("../models");


controller.deleteRequest=async(req,res)=>{
  console.log("ok");
  let id = isNaN(req.params.id) ? 0 : parseInt(req.params.id);
  try {
    await models.Requestadsquan.destroy(
      {where: {id}}
    );
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
    loaiQC,
    kichThuoc,
    soLuong,
    ngayBatDau,
    ngayKetThuc
  } = req.body;
  console.log(req.body);

  const requestPlace = await models.Place.findOne({
    attributes: ["id"],
    where: { diaChi: diaChiRequest }
  });
  let placeId = requestPlace.getDataValue("id");


  try {
    await models.Requestadsquan.create({
      congTy,
      diaChiCongTy,
      dienThoai,
      email,
      placeId: placeId,
      tenBangQuangCao,
      loaiQC,
      kichThuoc,
      soLuong,
      ngayBatDau,
      ngayKetThuc,
      tinhTrang: 'Chờ phê duyệt'
    });
    res.redirect('/yeu-cau');
  } catch (error) {
    res.send('Không thể thêm');
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
  res.locals.requestadsquans = await models.Requestadsquan.findAll({
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
      "loaiQC",
      "kichThuoc",
      "soLuong",
      "ngayBatDau",
      "ngayKetThuc",
      "tinhTrang"
    ],
    order: [["congTy", "ASC"]],
    // where:{
    //   khuVuc:"Phường 4, Quận 5"
    // }
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

  res.locals.adstypes = await models.Adstype.findAll({
    attributes: [
      "id",
      "name",
    ],
    order: [["createdAt", "DESC"]],
  });
  res.render("request");
};

controller.editRequest = async (req, res) => {
  let {id,
    congTy,
    diaChiCongTy,
    dienThoai,
    email,
    diaChiRequest,
    tenBangQuangCao,
    loaiQC,
    kichThuoc,
    soLuong,
    ngayBatDau,
    ngayKetThuc,
    tinhTrang} = req.body;
  
    const requestPlace = await models.Place.findOne({ 
      attributes: ["id"],
      where: {diaChi: diaChiRequest} 
    });
    let placeId = requestPlace.getDataValue("id");
  try {
    await models.Requestadsquan.update(
      { 
        congTy,
        diaChiCongTy,
        dienThoai,
        email,
        placeId:placeId,
        tenBangQuangCao,
        loaiQC,
        kichThuoc,
        soLuong,
        ngayBatDau,
        ngayKetThuc,
        tinhTrang
      },
      {where: {id}}
    );
    res.send("Đã cập nhật yêu cầu!");
  } catch (error) {
    res.send("Không thể cập nhật yêu cầu!");
    console.error(error);
  }
};

module.exports = controller;
