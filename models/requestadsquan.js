"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Requestadsquan extends Model {
        static associate(models) {
        // define association here
        // Tag.belongsToMany(models.Blog, {
        //   through: "BlogTag",
        //   foreignKey: "tagId",
        //   otherKey: "blogId",
        // });
        Requestadsquan.belongsTo(models.Place, { foreignKey: "placeId" });

        }
    }
    Requestadsquan.init(
        {
            congTy: DataTypes.STRING,
            diaChiCongTy: DataTypes.STRING,
            dienThoai: DataTypes.STRING,
            email: DataTypes.STRING,
            // diaChi: DataTypes.STRING,
            // khuVuc: DataTypes.STRING,
            // loaiVT: DataTypes.STRING,
            // longitude: DataTypes.REAL,
            // latitude: DataTypes.REAL,
            placeId: DataTypes.INTEGER,
            tenBangQuangCao:DataTypes.STRING,
            loaiQC:DataTypes.STRING,
            kichThuoc:DataTypes.STRING,
            soLuong:DataTypes.INTEGER,
            ngayBatDau:DataTypes.STRING,
            ngayKetThuc:DataTypes.STRING,
            tinhTrang:DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Requestadsquan",
        }
    );
    return Requestadsquan;
};
