const controller = {};
const models = require("../models");
const { Op } = require('sequelize');
const moment = require('moment');
const pool = require("../database/database");


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
      "loaiQC",
      "kichThuoc",
      "soLuong",
      "ngayBatDau",
      "ngayKetThuc",
      "tinhTrang",
      "hinhAnh"
    ],
    order: [["congTy", "ASC"]],
    where: {
      '$Place.khuVuc$': {
        [Op.like]: '%Quận 1%', // Use the like operator to check for 'Quận 5' in khuVuc
      },
    },
  });


  // report
  const report = pool.query(`SELECT id, "lat", "lng", "reportername", "typeofreport", "reporteremail", "reporterphonenumber", "reportcontent", "imagepath1", "imagepath2", "locationreport", "adbannerreportid", "handlemethod", "reportlocation"
        FROM "reports"
        ORDER BY "reportlocation" ASC`
        );
  const [reportResult] = await Promise.all([report]);
  res.locals.reports = reportResult.rows;

  res.render("manage-list", {
    placedetails: res.locals.placedetails.map(detail => ({
      ...detail.toJSON(),
      formattedExpireDay: moment(detail.expireDay).format('MM/DD/YYYY'),
    })),
    requestads: res.locals.requestads.map(detail => ({
      ...detail.toJSON(),
      formattedNgayBatDau: moment(detail.ngayBatDau).format('MM/DD/YYYY'),
      formattedNgayKetThuc: moment(detail.ngayKetThuc).format('MM/DD/YYYY'),
    })),   
  });
};

controller.requestEditPlace = async (req, res) => {
  let {id, diaChi, khuVuc, loaiVT, hinhThuc, isQuyHoach, liDoChinhSua} = req.body;
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
      await models.Requesteditplace.create({
        placeId: id,
        diaChi, 
        khuVuc, 
        loaiVT, 
        hinhThuc, 
        quyHoach: isQuyHoach ? "ĐÃ QUY HOẠCH" : "CHƯA QUY HOẠCH",
        liDoChinhSua
      });
      res.redirect("/diem-dat-bang-quang-cao");
    }
  } catch (error) {
    res.send("Không thể thêm điểm đặt");
    console.error(error);
  }
}



controller.requestEditAds = async (req, res) => {
  let {id, adName, diaChiAds, adSize, adQuantity, expireDay, liDoChinhSua} = req.body;

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
    where: {diaChi: diaChiAds} 
  });

  let placeId = adsPlace.getDataValue("id");

  try {
    if (existingPlace) {
      // Nếu id đã tồn tại, có thể xử lý thông báo hoặc chuyển hướng
      res.send("Vui lòng chỉnh sửa thêm ở danh sách yêu cầu chỉnh sửa bảng quảng cáo");
    }
    else {
      await models.Requesteditads.create({
        placeId: placeId,
        originId: id,
        adName, 
        adSize, 
        adQuantity, 
        expireDay, 
        liDoChinhSua
      });
      res.redirect("/danh-sach");
    }
  } catch (error) {
    res.send("Không thể gửi yêu cầu chỉnh sửa bảng QC");
    console.error(error);
  }
}

controller.deleteRequest=async(req,res)=>{
  console.log("ok");
  let id = isNaN(req.params.id) ? 0 : parseInt(req.params.id);
  try {
    await models.Requestads.destroy(
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
    await models.Requestads.create({
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
    await models.Requestads.update(
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

controller.handleReport = async (req, res) => {
  let {id, handlemethodedit} = req.body;
  try {
          const updateQuery = `UPDATE "reports"
                              SET "handlemethod" = $1
                              WHERE id = $2`;
          await pool.query(updateQuery, [
            handlemethodedit,
            id
          ]);
          res.send("Đã cập nhật bảng QC!");
  } catch (error) {
      console.error(error);
  }
}
module.exports = controller;
