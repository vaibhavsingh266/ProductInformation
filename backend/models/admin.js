/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('admin', {
    Username: {
      type: DataTypes.STRING(30),
      allowNull: false,
      primaryKey: true
    },
    Password: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    tableName: 'admin'
  });
};
