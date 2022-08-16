'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Stage, StageEvent}) {
      // stages
      Event.belongsToMany(Stage, {
        foreignKey: "event_id",
        as: "stages",
        through: StageEvent 
      })
      //meet and greeets
      Event.hasMany(MeetGreet, {
        foreignKey: "event_id",
        as: "meet_greets"
      })
      //setTimes
      Event.hasMany(SetTimes, {
        foreignKey: "event_id",
        as: "set_times"
      } )
    }
  }
  Event.init({
    event_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    date: DataTypes.DATE,
    start_time: DataTypes.DATE,
    end_time: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};