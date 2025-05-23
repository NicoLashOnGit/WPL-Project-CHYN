import dotenv from "dotenv";
dotenv.config();
import express, {Request, Response} from "express";
import { MongoClient, ReturnDocument } from "mongodb";
import { Characters, Type, Rarity, Series, Set, Introduction, Images, MetaTags} from "./public/TypeScript/characterAPI.ts";
import {connect, createUser, findUserByCredentials, getUsers, addFavoriteCharacter, updateUserAccountInfo, collection, addBlacklistedCharacter } from "./database.ts";
import { User , FavoriteCharacter} from "./types";
import session from "./session";
import { title } from "process";
import { stat } from "fs";

const app = express();
app.use(session);

const uri = "mongodb+srv://CHYN-User:t5iKaBbTegc8Ghpw@userdb.tsld2b6.mongodb.net/"
const client = new MongoClient(uri);



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
});
app.get("/", (req, res) => {
    res.render("Landingpage", {title: "Landingpage"})
});

app.get("/Accountpage", (req,res) => {
    res.render("Accountpage", {title: "Account"})
})

app.get("/blacklist", async (req, res) => {
    const displayName = req.session.displayName;
    if (!displayName) {
        res.redirect("/Loginpage");
        return
    }

    const users = await getUsers();
    const user = users.find(u => u.displayName === displayName);
    const characters = user && user.blacklist ? user.blacklist : [];
    res.render("blacklist", { title: "Blacklist", characters });
});

app.post("/blacklist", async (req, res) => {
    const { name, image, reason } = req.body;
    const displayName = req.session.displayName;

    if  (!displayName) {
        res.status(401).json({ message: "Niet ingelogd" });
        return;
    }

    try {
        const users = await getUsers();
        const user = users.find(u => u.displayName === displayName);

        if (!user) {
            res.status(404).json({ message: "Gebruiker niet gevonden" });
            return;
        }

        const result = await addBlacklistedCharacter(user._id.toString(), name, image, reason)

        if (result.modifiedCount === 0) {
            res.status(200).json({ message: "Karakter is al geblacklist"})
            return;
        }

        res.status(200).json({ message: "Character toegevoegd aan blacklist" })
    } catch (err) {
        console.error("Fout bij opslaan van blacklisted karakter:", err)
        res.status(500).json({ message: "Interne serverfout" });
        return
    }
});

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
    const displayName = req.session.displayName;
    if (!displayName) {
        res.redirect("/Loginpage")
        return;
    }

    try {
        const users = await getUsers();
        const user = users.find(u => u.displayName === displayName);

        const characters = user && user.favorites ? user.favorites.filter(fav => fav.name && fav.image) : [];

        res.render("favoritePage", { title: "favorite", characters })
    }
    catch (error) {
        console.error("Error met ophalen van favorite karakters:", error);
        res.status(500).send("Error met ophalen van favoriete karakters")
    }
})

app.post("/favoritePage/updateStats", async (req, res) => {
    const displayName = req.session.displayName;
    const { name, wins, losses } = req.body;

    if (!displayName) {
        res.status(401).json({ message: "Niet ingelogd" })
        return
    }

    try {
        const users = await getUsers();
        const user = users.find(u => u.displayName === displayName)

        if (!user) {
            res.status(404).json({ message: "Gebruiker niet gevonden"})
            return;
        }

        const result = await collection.updateOne(
            { _id: user._id, "favorites.name": name},
            { $set: { "favorites.$.wins": wins, "favorites.$.losses": losses}}
        );

        res.status(200).json({ message: "Statistieken bijgewerkt"});
    } catch (error) {
        console.error("Fout bij opslaan statistieken:", error);
        res.status(500).json({ message: "Interne Serverfout"});
    }
});

app.get("/Homepage", (req,res) => {
    res.render("Homepage", {title: "Home"})
})

app.get("/Loginpage", (req, res) => {
    res.render("Loginpage", {title: "Login"})
})

app.get("/Characterpage", async (req, res) => {
    try {
        const response = await fetch("https://fortnite-api.com/v2/cosmetics/br");
        const data = await response.json();

        let characters = (data.data as Characters[]).filter(
            (character) => character.type.value === "outfit" &&
                        character.introduction?.chapter === "6" &&
                        character.introduction.season === "1"
        );

        const displayName = req.session.displayName;
        if (displayName) {
            const users = await getUsers();
            const user = users.find(u => u.displayName === displayName);
            if ( user  && user.blacklist) {
                const blacklistNames = user.blacklist.map(b => b.name);
                characters = characters.filter(c => !blacklistNames.includes(c.name))
            }
        }
        res.render("Characterpage", { title: "Character Page", characters})
    } catch (error) {
        console.error("Error met ophalen van karakter date:", error);
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
    let user : User = req.body;
    await createUser(user);
    res.redirect("/Loginpage")
})

app.post("/login", async (req, res) => {
    const { displayName, password } = req.body;

    const user = await findUserByCredentials(displayName, password);
    

    if (user) {
        console.log("Ingelogd");
        req.session.displayName = user.displayName
        const username = req.session.displayName;
        console.log(username);
        res.redirect("/shopPage");
    } else {
        console.log("Login mislukt");
        res.status(401).send("Ongeldige gebruikersnaam of wachtwoord");
    }
});

app.post("/favourite", async (req, res) => {
    const { name, image } = req.body;
    const displayName = req.session.displayName;

    if (!displayName) {
        res.status(401).json({ message: "Niet ingelogd" });
        return
    }

    try {
        const users = await getUsers();
        const user = users.find(u => u.displayName === displayName);

        if (!user) {
            res.status(404).json({ message: "Gebruiker niet gevonden" });
            return
        }

        const result = await addFavoriteCharacter(user._id.toString(), name, image);

        if (result.modifiedCount === 0) {
            res.status(200).json({ message: "Character was al favoriet" });
            return
        }

        res.status(200).json({ message: "Character toegevoegd aan favorieten" });
    } catch (err) {
        console.error("Fout bij opslaan favoriete character:", err);
        res.status(500).json({ message: "Interne serverfout" });
        return
    }
});

app.post("/Accountpage", async (req, res) => {
    const displayName = req.session.displayName;

    if (!displayName) {
        res.status(401).send("Niet ingelogd.");
        return;
    }

    const {
        email,
        firstName,
        lastName,
        displayName: newDisplayName,
        language,
        addressLine1,
        addressLine2,
        city,
        region,
        postalCode
    } = req.body;

    try {
        await updateUserAccountInfo(displayName, {
            email,
            firstName,
            lastName,
            displayName: newDisplayName,
            language,
            addressLine1,
            addressLine2,
            city,
            region,
            postalCode
        });

        if (newDisplayName && newDisplayName !== displayName) {
            req.session.displayName = newDisplayName;
        }

        res.redirect("/Accountpage");
    } catch (err) {
        console.error(err);
        res.status(500).send("Fout bij updaten van accountgegevens.");
    }
});

app.listen(app.get("port"), async() => {
    await connect();
    console.log("[server] http://localhost:" + app.get("port"))
});
