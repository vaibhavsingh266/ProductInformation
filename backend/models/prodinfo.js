/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('prodinfo', {
    ProductId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    ProductName: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    Price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    Description: {
      type: DataTypes.CHAR(100),
      allowNull: true
    },
    Rating: {
      type: DataTypes.STRING(10),
      allowNull: true
    }
  }, {
    tableName: 'prodinfo'
  });
};
