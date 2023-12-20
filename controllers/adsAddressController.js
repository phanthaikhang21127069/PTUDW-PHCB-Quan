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
  // const distinctKhuVuc = await models.Place.findAll({
  //   attributes: [
  //     [models.sequelize.fn('DISTINCT', models.sequelize.col('khuVuc')), 'khuVuc'],
  //   ],
  // });

  // res.locals.places = distinctKhuVuc.map(({ khuVuc }) => ({ khuVuc })); // Map to the required format
  res.render("adsAddress");
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
    res.redirect("/diem-dat-bang-quang-cao");
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
//   // res.send(req.body);
//   // console.log(req);
//   // res.redirect("/phuong-quan");
// }

// controller.editWard = async (req, res) => {
//   let {id, wardName, districtName, zipCode, population} = req.body;
//   try {
//     await models.Ward.update(
//       {wardName, districtName, zipCode, population},
//       {where: {id}}
//     );
//     res.send("Ward updated!");
//   } catch (error) {
//     res.send("Can't update ward!");
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
