const express = require('express');
const app = express();
const path = require('path');
const sdk = require('./sdk');
const { Gateway, Wallets } = require('fabric-network');
const fs = require('fs');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const PORT = 8001;
const HOST = '0.0.0.0';
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.get('/delete', function (req, res) {
    let a = req.query.a;
    let args = [a];
    sdk.send(false, 'delete', args, res);
});

app.get('/transfer', function (req, res) {
    let sender = req.query.sender;
    let receiver = req.query.receiver;
    let amount = req.query.amount;
    let args = [sender, receiver, amount];
    sdk.send(false, 'transfer', args, res);
});

const ccpPath = path.resolve(__dirname, 'application/connection-org1.json');

app.post('/registerMusic', upload.fields([{ name: 'audioFile', maxCount: 1 }, { name: 'imageFile', maxCount: 1 }]), async (req, res) => {
    console.log(req.body);
    console.log(req.files);

    const { id, title, genre, info, lyrics } = req.body;
    const audioFile = req.files.audioFile[0].filename;
    const imageFile = req.files.imageFile[0].filename;

    if (!id || !title || !genre || !info || !lyrics || !audioFile || !imageFile) {
        console.error('All fields are required');
        return res.status(400).send('All fields are required');
    }

    try {
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);

        const userExists = await wallet.get('user1');
        if (!userExists) {
            console.error('User does not exist in the wallet');
            return res.status(400).send('User does not exist in the wallet');
        }

        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'user1', discovery: { enabled: true, asLocalhost: true } });

        const network = await gateway.getNetwork('mychannel');
        const contract = network.getContract('abstore');

        await contract.submitTransaction('registerMusic', id, title, genre, info, lyrics, audioFile, imageFile);
        res.status(200).send('Music registered successfully');
    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        res.status(500).send(`Failed to submit transaction: ${error}`);
    }
});

app.use(express.static(path.join(__dirname, '../client')));
app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
