const controller = {};
const models = require("../models");

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
    order: [["createdAt", "DESC"]],
  });
  res.render("manage-list");
};

controller.addWard = async (req, res) => {
  let {wardName, districtName, zipCode, population} = req.body;
  try {
    await models.Ward.create({
      wardName, 
      districtName, 
      zipCode, 
      population
    });
    res.redirect("/danh-sach");
  } catch (error) {
    res.send("Can't add ward");
    console.error(error);
  }
  // res.send(req.body);
  // console.log(req);
  // res.redirect("/phuong-quan");
}

controller.editWard = async (req, res) => {
  let {id, wardName, districtName, zipCode, population} = req.body;
  try {
    await models.Ward.update(
      {wardName, districtName, zipCode, population},
      {where: {id}}
    );
    res.send("Ward updated!");
  } catch (error) {
    res.send("Can't update ward!");
    console.error(error);
  }
}

controller.deleteWard = async (req, res) => {
  let id = isNaN(req.params.id) ? 0 : parseInt(req.params.id);
  try {
    await models.Ward.destroy(
      {where: {id}}
    );
    res.send("Ward deleted!");
  } catch (error) {
    res.send("Can't delete ward!");
    console.error(error);
  }
}

module.exports = controller;
