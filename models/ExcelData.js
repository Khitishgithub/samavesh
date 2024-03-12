// backend/models/ExcelData.js
const mongoose = require('mongoose');

const excelDataSchema = new mongoose.Schema({
  clubName: {
    type: String,
    required: true,
  },
  clubDescription: {
    type: String,
    required: true,
  },
  data: {
    type: Array,
    required: true,
  },
});

const ExcelData = mongoose.model('ExcelData', excelDataSchema);

module.exports = ExcelData;
