const express = require('express');
const path = require('path');
const Nano = require('nano');
const multer = require('multer');
const crypto = require('crypto');
const sdk = require('./sdk');

const app = express();

const PORT = 8001;
const HOST = '0.0.0.0';

const nano = Nano({
  url: 'http://admin:adminpw@localhost:5984',
  parseUrl: false
});

const userDbName = 'channel1_abstore';
const musicDbName = 'music_database';
const userDb = nano.db.use(userDbName);
const musicDb = nano.db.use(musicDbName);

const upload = multer({ dest: 'uploads/' });

async function createDBs() {
  try {
    await nano.db.create(userDbName);
    console.log(`Database '${userDbName}' created successfully.`);
  } catch (error) {
    if (error.statusCode === 412) {
      console.log(`Database '${userDbName}' already exists.`);
    } else {
      console.error('Error creating user database:', error);
    }
  }

  try {
    await nano.db.create(musicDbName);
    console.log(`Database '${musicDbName}' created successfully.`);
  } catch (error) {
    if (error.statusCode === 412) {
      console.log(`Database '${musicDbName}' already exists.`);
    } else {
      console.error('Error creating music database:', error);
    }
  }
}

async function createDesignDoc() {
  const designDoc = {
    _id: '_design/song_views',
    views: {
      by_songName: {
        map: function (doc) {
          if (doc.type === 'song' && doc.songName) {
            emit(doc.songName, doc);
          }
        }.toString()
      },
      by_user: {
        map: function (doc) {
          if (doc.type === 'song' && doc.userID) {
            emit(doc.userID, doc);
          }
        }.toString()
      }
    }
  };

  try {
    await musicDb.insert(designDoc);
    console.log('Design document created successfully in music database.');
  } catch (error) {
    if (error.statusCode === 409) {
      console.log('Design document already exists in music database.');
    } else {
      console.error('Error creating design document in music database:', error);
    }
  }
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/registerMusic', upload.fields([{ name: 'audioFile', maxCount: 1 }, { name: 'imageFile', maxCount: 1 }]), async function (req, res) {
  try {
    console.log('Registering music:', req.body);
    if (!req.files || !req.files['audioFile'] || !req.files['imageFile']) {
      throw new Error('Files are not properly uploaded');
    }

    const userId = req.body.userID;

    if (!userId) {
      return res.status(400).json({ error: 'Invalid parameters', details: 'Missing userID' });
    }

    const user = await userDb.get(userId);
    if (!user) {
      return res.status(400).json({ error: '회원 ID가 유효하지 않습니다.' });
    }

    const song = {
      songName: req.body.songName,
      genre: req.body.genre,
      songInfo: req.body.songInfo,
      lyrics: req.body.lyrics,
      price: req.body.price,
      audioFile: req.files['audioFile'][0].path,
      imageFile: req.files['imageFile'][0].path,
      userID: userId
    };

    const songArgs = [
      song.userID,
      song.songName,
      song.genre,
      song.songInfo,
      song.lyrics,
      song.price.toString(),
      song.audioFile,
      song.imageFile
    ];

    // Chaincode 호출
    sdk.send(false, 'registerMusic', songArgs, res, async (response) => {
      if (response.status === 'SUCCESS' || response.success) {
        console.log('Chaincode transaction successful:', response.message);
        // CouchDB에 데이터 삽입
        try {
          const dbResponse = await musicDb.insert({
            _id: generateUniqueId('song'),
            type: 'song',
            ...song
          });
          console.log('Document inserted into music_database:', dbResponse);
          res.status(200).json({ message: '음원 등록이 성공적으로 완료되었습니다.' });
        } catch (dbError) {
          console.error('Error inserting document into CouchDB:', dbError);
          res.status(500).json({ error: '음원 등록 중 오류가 발생했습니다.', details: dbError.message });
        }
      } else {
        console.error('Chaincode transaction failed:', response.message);
        res.status(500).json({ error: '음원 등록 중 오류가 발생했습니다.', details: response.message });
      }
    });

  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({ error: '음원 등록 중 오류가 발생했습니다.', details: error.message });
  }
});

app.get('/register', function (req, res) {
  let name = req.query.name;
  let id = req.query.id;
  let pw = req.query.pw;
  let phone_number = req.query.phone_number;
  let account_number = req.query.account_number;
  let account_money = req.query.account_money;
  let args = [name, id, pw, phone_number, account_number, account_money];
  sdk.send(false, 'register', args, res);
});

app.get('/login', function (req, res) {
  let userId = req.query.userId;
  let userPw = req.query.userPw;
  let args = [userId, userPw];
  sdk.send(true, 'login', args, res).catch((err) => {
    console.error('Login failed:', err.message);
    res.status(500).send('Internal Server Error');
  });
});

app.get('/charge', function (req, res) {
  let userId = req.query.userId;
  let amount = req.query.amount;
  let args = [userId, amount];
  sdk.send(false, 'charge', args, res);
});

app.get('/exchange', function (req, res) {
  let userId = req.query.userId;
  let amount = req.query.amount;
  let args = [userId, amount];
  sdk.send(false, 'exchange', args, res);
});

app.get('/delete', function (req, res) {
  let name = req.query.name;
  let args = [name];
  sdk.send(false, 'delete', args, res);
});

app.get('/invoke', function (req, res) {
  let sender = req.query.sender;
  let receiver = req.query.receiver;
  let amount = req.query.amount;
  let args = [sender, receiver, amount];
  sdk.send(false, 'invoke', args, res);
});

app.get('/query', function (req, res) {
  let name = req.query.name;
  let args = [name];
  sdk.send(true, 'query', args, res);
});

app.get('/transfer', function (req, res) {
  let sender = req.query.sender;
  let receiver = req.query.receiver;
  let amount = req.query.amount;
  let args = [sender, receiver, amount];
  sdk.send(false, 'transfer', args, res);
});

app.use(express.static(path.join(__dirname, '../client')));

createDBs().then(() => {
  return createDesignDoc();
}).then(() => {
  app.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
  });
}).catch(error => {
  console.error('Error setting up databases:', error);
});

function generateUniqueId(prefix) {
  return `${prefix}:${crypto.randomBytes(16).toString('hex')}`;
}
