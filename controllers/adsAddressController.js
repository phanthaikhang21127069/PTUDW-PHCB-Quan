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
  let {id, diaChi, khuVuc, loaiVT, hinhThuc, isQuyHoach, liDoChinhSua} = req.body;

  try {
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
  } catch (error) {
    res.send("Không thể thêm điểm đặt");
    console.error(error);
  }
}

controller.continueEditRequest = async (req, res) => {
  let {id, diaChi, khuVuc, loaiVT, hinhThuc, isQuyHoach} = req.body;
  try {
    await models.Requesteditplace.update(
      { 
        diaChi, 
        khuVuc, 
        loaiVT, 
        hinhThuc, 
        quyHoach: isQuyHoach ? "ĐÃ QUY HOẠCH" : "CHƯA QUY HOẠCH"
      },
      {where: {id}}
    );
    res.send("Đã cập nhật điểm đặt!");
  } catch (error) {
    res.send("Không thể cập nhật điểm đặt!");
    console.error(error);
  }
}

module.exports = controller;
