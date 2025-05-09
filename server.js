const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/loginDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const User = mongoose.model('User', new mongoose.Schema({
    email: String,
    password: String,
    firstName: String,
    lastName: String,
    displayName: String,
    country: String,
    newsLetter: Boolean,
    agreeWithTOS: Boolean,
}));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'RegistrationPage.html'));
});

app.get('/JavaScript/registrate.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'JavaScript', 'registrate.js'));
});

app.post('/register', async (req, res) => {
    console.log(req.body);
    const { email, password, firstName, lastName, displayName, country, newsLetter, agreeWithTOS } = req.body;

    if (!email || !password || !firstName || !lastName || !displayName || !country) {
        return res.status(400).json({ message: 'Alle velden moeten ingevuld zijn' });
    }

    if (!agreeWithTOS) {
        return res.status(400).json({ message: 'Je moet akkoord gaan met de voorwaarden' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'Gebruiker bestaat al' });

    const user = new User({
        email,
        password,
        firstName,
        lastName,
        displayName,
        country,
        newsLetter,
        agreeWithTOS
    });

    await user.save();
    res.json({ message: 'Registratie gelukt' });
});

app.listen(3000, () => {
    console.log('Server draait op http://localhost:3000');
});