const controller = {};
const models = require("../models");
const { Op } = require('sequelize');
const moment = require('moment');


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

  res.render("manage-list", {
    placedetails: res.locals.placedetails.map(detail => ({
      ...detail.toJSON(),
      formattedExpireDay: moment(detail.expireDay).format('MM/DD/YYYY'),
    })),  
  });
};

controller.requestEditPlace = async (req, res) => {
  let {diaChi, khuVuc, loaiVT, hinhThuc, isQuyHoach, liDoChinhSua} = req.body;
  try {
    await models.Requesteditplace.create({
      diaChi, 
      khuVuc, 
      loaiVT, 
      hinhThuc, 
      quyHoach: isQuyHoach ? "ĐÃ QUY HOẠCH" : "CHƯA QUY HOẠCH",
      liDoChinhSua
    });
    res.redirect("/danh-sach");
  } catch (error) {
    res.send("Không thể thêm điểm đặt");
    console.error(error);
  }
}

controller.requestEditAds = async (req, res) => {
  let {adName, diaChiAds, adSize, adQuantity, expireDay, liDoChinhSua} = req.body;

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
    await models.Requesteditads.create({
      placeId: placeId,
      adName, 
      adSize, 
      adQuantity, 
      expireDay, 
      liDoChinhSua
    });
    res.redirect("/danh-sach");
  } catch (error) {
    res.send("Không thể gửi yêu cầu chỉnh sửa bảng QC");
    console.error(error);
}
}

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
    res.redirect('/danh-sach');
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
