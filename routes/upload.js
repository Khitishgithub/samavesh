const express = require('express');
const multer = require('multer');
const xlsx = require('xlsx');
const router = express.Router();
const ExcelData = require('../models/ExcelData');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/', upload.single('file'), async (req, res) => {
  try {
    const fileBuffer = req.file.buffer;
    const workbook = xlsx.read(fileBuffer, { type: 'buffer' });
    const jsonData = xlsx.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);

    const { clubName, clubDescription } = req.body; 

    const excelData = new ExcelData({ clubName, clubDescription, data: jsonData });
    await excelData.save();

    res.json({ message: 'File uploaded and data saved to MongoDB!', data: jsonData });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/get-data', async (req, res) => {
  try {
    const storedData = await ExcelData.find();
    console.log('Fetched data from MongoDB:', storedData);

    res.json({ data: storedData });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
