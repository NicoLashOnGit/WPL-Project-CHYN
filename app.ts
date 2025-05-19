import dotenv from "dotenv";
dotenv.config();
import mongoose from 'mongoose';
import User from './models/User';
import express from "express";
import { Characters, Type, Rarity, Series, Set, Introduction, Images, MetaTags} from "./public/TypeScript/characterAPI.ts";

const app = express();

mongoose.connect(process.env.MONGO_URI!)
  .then(() => console.log("Verbonden met MongoDB"))
  .catch((error) => console.error("Fout bij verbinden met MongoDB:", error));

let favoriteCharacters: Record<string, boolean> = {};

app.use(express.static("public", {
    setHeaders: (res, path) => {
        if (path.endsWith(".js")) {
            res.setHeader("Content-Type", "application/javasc")
        }
    }
}));
app.use(express.json({limit: "1mb"}));
app.use(express.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.set("port", 3000);



app.get("/searchBar", (req, res) => {
    const query = req.query.q as string;
    
    const pages: Record<string, string> = {
        "john wick": "/CharacterInfo"
    };

    if (pages[query.toLowerCase()]) {
        res.redirect(pages[query.toLowerCase()]);
    } else {
        res.status(404).send("Page not found")
    }
})
app.post("/Characterpage/toggleFavorite", (req, res) => {
    const blacklistBtns = document.querySelectorAll(".characterPageBtn");
    console.log("knop is aangelklingt")
    blacklistBtns.forEach(function(button) {
      button.addEventListener("click", function() {
        const imgElement = button.querySelector("img");
        console.log("knop is aangelklingt")
        if (imgElement?.src.includes("blackEmptyFavouriteStar.png")) {
          imgElement.src = "/Images/ButtonImages/FilledGoldFavouriteStar.png";
        } else if (imgElement?.src.includes("FilledGoldFavouriteStar.png")) {
          imgElement.src = "/Images/ButtonImages/blackEmptyFavouriteStar.png";
        }
      });
    });
});
app.get("/", (req, res) => {
    res.render("Landingpage", {title: "Landingpage"})
});

app.get("/Accountpage", (req,res) => {
    res.render("Accountpage", {title: "Account"})
})

app.get("/blacklist", async (req, res) => {
        try {
        const response = await fetch("https://fortnite-api.com/v2/cosmetics/br")
        const data = await response.json();

        const characters = (data.data as Characters[]).filter (
            (character) => character.type.value === "outfit" && character.introduction?.chapter === "6" && character.introduction.season === "1"
        );

        res.render("blacklist", {title: "Blacklist", characters})
    } catch (error) {
        console.error("Error met ophalen van karakter data:", error);
        res.status(500).send("Error met ophalen van karakter data")
    }
})

app.get("/CharacterInfo", async (req,res) => {
    const name = (req.query.name as string)?.toLowerCase();
    if (!name) {
        return res.render("CharacterInfo", { character: null, title: "Character Info" });
    }

    try {
        const response = await fetch("https://fortnite-api.com/v2/cosmetics/br")
        const data = await response.json();

        const character = (data.data as Characters[]).find (
            (character) => character.type.value === "outfit" && character.name.toLowerCase() === name
        );

        if (!character) {
            return res.render("CharacterInfo", { character: null, title: "Karakter niet gevonden"});
        }

        res.render("CharacterInfo", { character, title: character.name })
    } catch (error) {
        console.error("Error met ophalen van karakter data:", error);
        res.status(500).send("Error met ophalen van karakter data")
    }
})

app.get("/Faq", (req,res) => {
    res.render("Faq", {title: "FAQ"})
})

app.get("/favoritePage", async (req,res) => {
    try {
        const response = await fetch("https://fortnite-api.com/v2/cosmetics/br")
        const data = await response.json();

        const characters = (data.data as Characters[]).filter (
            (character) => character.type.value === "outfit" && character.introduction?.chapter === "6" && character.introduction.season === "1"
        );

        res.render("favoritePage", {title: "favorite", characters})
    } catch (error) {
        console.error("Error met ophalen van karakter data:", error);
        res.status(500).send("Error met ophalen van karakter data")
    }
})

app.get("/Homepage", (req,res) => {
    res.render("Homepage", {title: "Home"})
})

app.get("/Loginpage", (req, res) => {
    res.render("Loginpage", {title: "Login"})
})

app.get("/Characterpage", async (req, res) => {
    try {
        const response = await fetch("https://fortnite-api.com/v2/cosmetics/br")
        const data = await response.json();

        const characters = (data.data as Characters[]).filter (
            (character) => character.type.value === "outfit" && character.introduction?.chapter === "6" && character.introduction.season === "1"
        );

        res.render("Characterpage", {title: "Character Page", characters})
    } catch (error) {
        console.error("Error met ophalen van karakter data:", error);
        res.status(500).send("Error met ophalen van karakter data")
    }
})
app.get("/Landingpage", (req, res) => {
    res.render("Landingpage", {title: "Landingpage"})
});

app.get("/RegistrationPage", (req, res) => {
    res.render("RegistrationPage", {title: "Registration Page"})
} )

app.get("/shopPage", async (req,res) => {
        try {
        const response = await fetch("https://fortnite-api.com/v2/cosmetics/br")
        const data = await response.json();

        const backpacks = (data.data as Characters[]).filter (
            (character) => character.type.value === "backpack" && character.introduction?.chapter === "6" && character.introduction.season === "1"
        );
        const pickaxes = (data.data as Characters[]).filter (
            (character) => character.type.value === "pickaxe" && character.introduction?.chapter ==="6" && character.introduction?.season ==="1"
        )
        const gliders = (data.data as Characters[]).filter (
            (character) => character.type.value === "glider" && character.introduction?.chapter ==="6" && character.introduction?.season ==="1"
        )
        res.render("shopPage", {title: "Shop", backpacks, pickaxes, gliders})
    } catch (error) {
        console.error("Error met ophalen van karakter data:", error);
        res.status(500).send("Error met ophalen van karakter data")
    }
})



app.post("/register", async (req, res) => {
    const { email, password, firstName, lastName, displayName, country } = req.body;

    try {
        const newUser = new User({
            email,
            password, 
            firstName,
            lastName,
            displayName,
            country
        });

        await newUser.save();

        res.status(201).json({ message: 'Gebruiker succesvol geregistreerd!' });
    } catch (error) {
        console.error('Fout bij het registreren van de gebruiker:', error);
        res.status(500).json({ message: 'Er is een fout opgetreden bij het registreren van de gebruiker.' });
    }
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email, password });

        if (user) {
            console.log("Login succesvol voor gebruiker:", email);
            res.redirect("/Homepage");
        } else {
            console.log("Login mislukt: onjuiste gegevens");
            res.send(`
             <script>
              alert("Ongeldige inloggegevens. Probeer opnieuw.");
              window.location.href = "/Loginpage";
             </script>`);
        }
    } catch (error) {
        console.error("Fout tijdens login:", error);
        res.status(500).send("Er is een fout opgetreden bij het inloggen.");
    }
});

app.listen(app.get("port"), async() => {
    console.log("[server] http://localhost:" + app.get("port"))
});