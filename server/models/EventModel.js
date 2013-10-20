var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var EventSchema = new mongoose.Schema({
  id: String,
  userId: String,
  name: String,
  fields: Schema.Types.Mixed,
  additional: Schema.Types.Mixed
});
module.exports = mongoose.model("Event", EventSchema);
