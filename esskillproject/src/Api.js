const express = require('express');
const bodyParser = require('body-parser');
const csvParser = require('csv-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors');  // Add this line to import the cors middleware

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());  // Add this line to enable CORS for all routes

// Async function to import data from CSV file
const importDataFromCSV = async () => {
  const results = [];

  try {
    const stream = fs.createReadStream(path.join(__dirname, 'import.csv'))
      .pipe(csvParser());

    await new Promise((resolve, reject) => {
      stream
        .on('data', (data) => {
          let id = data.id;
          let blockId = data.blockId;
          let bayNum = data.bayNum;
          let stackNum = data.stackNum;
          let tierNum = data.tierNum;
          let arrivedAt = data.arrivedAt;

          results.push({
            id,
            blockId,
            bayNum,
            stackNum,
            tierNum,
            arrivedAt,
          });
        })
        .on('end', () => {
          const db = require('./src/server/database.json');
          db.stocks = results;
          fs.writeFileSync(path.join(__dirname, './src/server/database.json'), JSON.stringify(db, null, 2));
          resolve();
        })
        .on('error', reject);
    });
  } catch (error) {
    console.error('Error importing data from CSV:', error.message);
  }
};

// Import data on server start
importDataFromCSV();

// API endpoint to get all stocks
app.get('/containers', (req, res) => {
  try {
    const db = require('./src/server/database.json');
    res.json(db.stocks);
  } catch (error) {
    console.error('Error getting container data:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API endpoint to get containers by Id
app.get('/containers/:id', (req, res) => {
  try {
    const db = require('./src/server/database.json');
    const id = req.params.id;
    console.log('Requested id:', id);
    const container = db.stocks.find(container => container.id === id);
    res.json(container ? [container] : []);
  } catch (error) {
    console.error('Error getting container data by id:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
