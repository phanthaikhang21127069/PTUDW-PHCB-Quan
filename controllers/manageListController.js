const controller = {};
const models = require("../models");
const { Op } = require('sequelize');


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

  res.render("manage-list");
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
// controller.addWard = async (req, res) => {
//   let {wardName, districtName, zipCode, population} = req.body;
//   try {
//     await models.Ward.create({
//       wardName, 
//       districtName, 
//       zipCode, 
//       population
//     });
//     res.redirect("/danh-sach");
//   } catch (error) {
//     res.send("Can't add ward");
//     console.error(error);
//   }
// }


// controller.deleteWard = async (req, res) => {
//   let id = isNaN(req.params.id) ? 0 : parseInt(req.params.id);
//   try {
//     await models.Ward.destroy(
//       {where: {id}}
//     );
//     res.send("Ward deleted!");
//   } catch (error) {
//     res.send("Can't delete ward!");
//     console.error(error);
//   }
// }

module.exports = controller;
