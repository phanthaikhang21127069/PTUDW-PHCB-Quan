const controller = {};
const models = require("../models");
const { Op } = require('sequelize');
const pool = require("../database/database");

controller.show = async (req, res) => {
  const report = pool.query(`SELECT id, "lat", "lng", "reportername", "typeofreport", "reporteremail", "reporterphonenumber", "reportcontent", "imagepath1", "imagepath2", "locationreport", "adbannerreportid", "handlemethod", "reportlocation"
        FROM "reports"
        ORDER BY "reportlocation" ASC`
        );
  try {
    const [reportResult] = await Promise.all([report]);

    // res.locals.reports = reportResult.rows.map((row) => ({
    //   ...row,
    //   expireDay: moment(row.expireDay).format('MM/DD/YYYY'),
    // }));

    res.locals.reports = reportResult.rows;

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

    res.render("report");
  } catch (error) {
    console.log("Error: ", error);
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
