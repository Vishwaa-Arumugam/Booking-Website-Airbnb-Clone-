const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const Places = require("./models/Place.js");
const User = require("./models/User.js");
const bcrypt = require("bcryptjs");
const multer = require("multer");
// const { ObjectId } = mongoose.Types;
const fs = require("fs");
const imageDownloader = require("image-downloader");
require("dotenv").config();
const app = express();

const bcryptSalt = bcrypt.genSaltSync(8);
const jwtSecret = "kjsfkdjfdkjfbdkjfh";


app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}));


const mongoUrl = process.env.MONGO_URL

mongoose.connect(mongoUrl)
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log('MongoDB connection error:', err));

app.get('/test', (req, res) => {
    res.json("test ok");
});

app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    console.log(req.body);
    try {
        const userDoc = await User.create({
            name,
            email,
            password: bcrypt.hashSync(password, bcryptSalt),
        });
        res.json(userDoc);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
    const userDOC = await User.findOne({ email });
    if (userDOC) {
        const passOK = bcrypt.compareSync(password, userDOC.password);
        if (passOK) {
            jwt.sign({
                email: userDOC.email,
                id: userDOC._id,
            },
                jwtSecret, {}, (err, token) => {
                    if (err) throw err;
                    res.cookie('token', token).json(userDOC);
                })
        } else {
            res.json("password not ok");
        }
    } else {
        res.json('not found')
    }
});


app.get('/profile', (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, jwtSecret, {}, async (err, user) => {
            if (err) throw err;
            const { name, email, _id } = await User.findById(user.id);
            res.json({ name, email, _id });
        })
    } else {
        res.json(null);
    }
});


app.post('/logout', (req, res) => {
    res.cookie('token', '').json(true);
})


app.post('/upload-by-link', async (req, res) => {
    const { link } = req.body;
    const name = Date.now() + '.jpg';
    if (!link) {
        res.json('please send a valid link');
    }
    await imageDownloader.image({
        url: link,
        dest: __dirname + '/uploads/' + 'photo' + name,
    })
    res.json('photo' + name);
});


const photosMiddleware = multer({
    dest: 'uploads'
});
app.post('/upload', photosMiddleware.array('photos', 100), (req, res) => {
    // console.log(req.files);
    const uploadedFiles = [];
    for (let i = 0; i < req.files.length; i++) {
        const { path, originalname } = req.files[i];
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        const newPath = path + '.' + ext;
        fs.renameSync(path, newPath);
        uploadedFiles.push(newPath.replace('uploads/', ''));
    }
    res.json(uploadedFiles);
})


app.post('/placesData', async (req, res) => {
    const { token } = req.cookies;
    let id;
    const { title,
        address,
        addedPhotos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price } = req.body;
    if (token) {
        jwt.verify(token, jwtSecret, {}, async (err, user) => {
            if (err) throw err;
            const { _id } = await User.findById(user.id);
            console.log(_id);
            try {
                const newPlaces = await Places.create({
                    owner: _id,
                    title,
                    address,
                    photos: addedPhotos,
                    description,
                    perks,
                    extrainfo: extraInfo,
                    checkIn,
                    checkOut,
                    maxGuests,
                    price
                })
                res.json(newPlaces);
            } catch (e) {
                res.json("Error occured during updating places collection", e)
            }
        })
    }
})

app.get('/places', (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (err, user) => {
        if (err) throw err;
        const id = user.id;
        const place = await Places.find({ owner: id });
        console.log(place);
        res.json(place);
    });
});

app.get('/places/:id', async (req, res) => {
    const { id } = req.params;
    const response = await Places.findById(id);
    res.json(response);
});

app.put('/places/:id', (req, res) => {
    const { token } = req.cookies;
    const { id } = req.params;
    const { title,
        address,
        addedPhotos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price } = req.body;
    if (token) {
        jwt.verify(token, jwtSecret, {}, async (err, user) => {
            const placeData = await Places.findById(id);
            if (user.id === placeData.owner.toString()) {
                placeData.set({
                    title,
                    address,
                    photos: addedPhotos,
                    description,
                    perks,
                    extrainfo: extraInfo,
                    checkIn,
                    checkOut,
                    maxGuests,
                    price
                })
                await placeData.save();
            }
        }
        )
        res.json('ok');
    }
})

app.get('/index-places', async (req, res) => {
    res.json(await Places.find());
});

app.listen(4000, () => {
    console.log('Server is running on port 4000');
});
