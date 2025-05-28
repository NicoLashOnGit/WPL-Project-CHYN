import dotenv from "dotenv";
dotenv.config();
import express, {Request, Response} from "express";
import { MongoClient, ReturnDocument, ObjectId } from "mongodb";
import { Characters, Type, Rarity, Series, Set, Introduction, Images, MetaTags} from "./public/TypeScript/characterAPI.ts";
import {connect, createUser, findUserByCredentials, getUsers, addFavoriteCharacter, updateUserAccountInfo, collection, addBlacklistedCharacter, addPurchaseItem } from "./database.ts";
import { User , FavoriteCharacter, PurchaseItem} from "./types";
import session from "./session";
import { title } from "process";
import { stat } from "fs";

const app = express();
app.use(session);

/* Dit stukje code maakt user available in al de get routes */
/* Is nodig voor vbucks counter omdat de ejs niet kan geraken aan user.vbucks voor een of andere reden */
app.use(async (req, res, next) => {
    const displayName = req.session.displayName;

    if (displayName) {
        try {
            const users = await getUsers();
            const user = users.find(u => u.displayName === displayName);
            res.locals.user = user || null;
        } catch (error) {
            console.error("Fout bij ophalen van user in middleware:", error);
            res.locals.user = null;
        }
    } else {
        res.locals.user = null;
    }

    next();
});



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

function requireLogin(req: Request, res: Response, next: Function) {
    if (!req.session || !req.session.displayName) {
        return res.redirect("/login");
    }
    next();
}

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

app.get("/Accountpage", requireLogin, async (req,res) => {
    const userId = req.session.userId;
    const users = await getUsers();
    const user = users.find(u => u._id.toString() === userId);
    if (!user) {
        res.status(404).send("Gebruiker niet gevonden");
        return
    }
    res.render("Accountpage", {title: "Account", user})
})

app.post("/Accountpage/updateField", requireLogin, async (req, res) => {
    const userId = req.session.userId;
    const { field, value } = req.body;

    try {
        const update = { [field]: value };
        await collection.updateOne(
            { _id: new ObjectId(userId) },
            { $set: update }
        );

        if (field === "displayName") {
            req.session.displayName = value;
        }
        res.status(200).json({ message: "Gegevens bijgewerkt." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Fout bij updaten van accountgegevens." });
    }
});

app.get("/blacklist", requireLogin, async (req, res) => {
    const users = await getUsers();
    const user = users.find(u => u.displayName === req.session.displayName);
    const characters = user?.blacklist ?? [];
    res.render("blacklist", { title: "Blacklist", characters });
});

app.post("/blacklist", requireLogin, async (req, res) => {
    const { name, image, reason } = req.body;
    const users = await getUsers();
    const user = users.find(u => u.displayName === req.session.displayName);

    if (!user) {
        res.status(404).json({ message: "Gebruiker niet gevonden" });
        return;
    }

    const result = await addBlacklistedCharacter(user._id.toString(), name, image, reason)

    if (result.modifiedCount === 0) {
        res.status(200).json({ message: "Karakter is al geblacklist" })
        return;
    }

    res.status(200).json({ message: "Character toegevoegd aan blacklist" })
});

app.post("/buyItem", requireLogin, async (req, res) => {
    const { name, image, price, type } = req.body;
    const users = await getUsers();
    const user = users.find(u => u.displayName === req.session.displayName);

    if (!user) {
        res.status(404).json({ message: "Gebruiker niet gevonden" });
        return;
    }

    if (user.vbucks < price) {
        res.status(400).json({ message: "Niet genoeg V-Bucks" });
        return;
    }

    const updateResult = await collection.updateOne(
        { _id: user._id },
        {
            $inc: { vbucks: -price },
            $addToSet: { purchases: { name, image, type } }
        }
    );

    if (updateResult.modifiedCount === 0) {
        res.status(500).json({ message: "Fout bij aankoop" })
        return
    }

    res.status(200).json({ message: "Aankoop gelukt", newVbucks: user.vbucks - price });
});

app.get("/favoritePage", requireLogin, async (req,res) => {
    const users = await getUsers();
    const user = users.find(u => u.displayName === req.session.displayName);
    const characters = user?.favorites?.filter(fav => fav.name && fav.image) ?? [];
    res.render("favoritePage", { title: "favorite", characters, user });
});

app.post("/favoritePage/updateCosmetics", requireLogin, async (req, res) => {
    const { name, cosmetic1, cosmetic2 } = req.body;
    const users = await getUsers();
    const user = users.find(u => u.displayName === req.session.displayName);

    if (!user) {
        res.status(404).json({ message: "Gebruiker niet gevonden" });
        return;
    }

    const updateResult = await collection.updateOne(
        { _id: user._id, "favorites.name": name },
        {
            $set: {
                "favorites.$.cosmetic1": cosmetic1,
                "favorites.$.cosmetic2": cosmetic2
            }
        }
    );

    if (updateResult.modifiedCount > 0) {
        res.status(200).json({ message: "Cosmetics opgeslagen" });
    } else {
        res.status(400).json({ message: "Favoriet character niet gevonden of ongewijzigd" });
    }
});

app.post("/favoritePage/updateStats", requireLogin, async (req, res) => {
    const { name, wins, losses } = req.body;
    const users = await getUsers();
    const user = users.find(u => u.displayName === req.session.displayName);

    if (!user) {
        res.status(404).json({ message: "Gebruiker niet gevonden" });
        return;
    }

    await collection.updateOne(
        { _id: user._id, "favorites.name": name },
        { $set: { "favorites.$.wins": wins, "favorites.$.losses": losses } }
    );

    res.status(200).json({ message: "Statistieken bijgewerkt" });
});

app.get("/shopPage", requireLogin, async (req, res) => {
    try {
        const response = await fetch("https://fortnite-api.com/v2/cosmetics/br");
        const data = await response.json();

        const prices = {
            backpack: 200,
            pickaxe: 300,
            glider: 250
        };

        const filterBy = (type: string) =>
            (data.data as Characters[]).filter(c =>
                c.type.value === type &&
                c.introduction?.chapter === "6" &&
                c.introduction?.season === "1"
            );

        const backpacks = filterBy("backpack");
        const pickaxes = filterBy("pickaxe");
        const gliders = filterBy("glider");

        res.render("shopPage", { title: "Shop", backpacks, pickaxes, gliders, prices });
    } catch (error) {
        console.error("Error met ophalen van karakter data:", error);
        res.status(500).send("Error met ophalen van karakter data");
    }
});

app.post("/favourite", requireLogin, async (req, res) => {
    const { name, image } = req.body;
    const users = await getUsers();
    const user = users.find(u => u.displayName === req.session.displayName);

    if (!user) {
        res.status(404).json({ message: "Gebruiker niet gevonden" });
        return;
    }

    const result = await addFavoriteCharacter(user._id.toString(), name, image);

    if (result.modifiedCount === 0) {
        res.status(200).json({ message: "Character was al favoriet" });
        return;
    }

    res.status(200).json({ message: "Character toegevoegd aan favorieten" });
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
