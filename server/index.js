const express = require('express');
const multer = require('multer');
const csv = require('csv-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(cors());
app.use(express.json());
app.use(express.static('client/build'));

app.post('/upload', upload.single('file'), (req, res) => {
  const results = [];
  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      fs.unlinkSync(req.file.path);
      // Process the results here
      res.json(groupPlayers(results));
    });
});

function groupPlayers(players) {
  console.log(players);
  players.sort((a, b) => b.rating - a.rating);

  const teams = {};
  players.forEach((player, index) => {
    const teamIndex = index % 4;
    if (!teams[teamIndex]) teams[teamIndex] = [];
    teams[teamIndex].push(player);
  });

  const matches = [];
  for (let i = 0; i < 4; i++) {
    for (let j = i + 1; j < 4; j++) {
      matches.push({
        team1: teams[i][0],
        team2: teams[j][0],
      });
      matches.push({
        team1: teams[i][1],
        team2: teams[j][1],
      });
      matches.push({
        team1: teams[i][2],
        team2: teams[j][2],
      });
      matches.push({
        team1: teams[i][3],
        team2: teams[j][3],
      });
    }
  }
  return matches;
}

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
