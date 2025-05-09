import express from "express";
import { search } from "./public/TypeScript/searchbar.ts";
import { favorite } from "./public/TypeScript/favorite.ts";
import { Characters, Type, Rarity, Series, Set, Introduction, Images, MetaTags} from "./public/TypeScript/characterAPI.ts";

const app = express();

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
// app.post("/Characterpage/toggleFavorite", (req, res) => {
//     const {characterId} = req.body;

//     if (!characterId) {
//         return res.status(400).json({ error: "Character ID is verplicht"});
//     }

//     if (favoriteCharacters[characterId]) {
//         delete favoriteCharacters[characterId];
//     } else {
//         favoriteCharacters[characterId] = true;
//     }

//     res.json({
//         succes: true,
//         favoriteCharacters,
//     });
// });
app.get("/", (req, res) => {
    res.render("Landingpage", {title: "Landingpage"})
});

app.get("/Accountpage", (req,res) => {
    res.render("Accountpage", {title: "Account"})
})

app.get("/blacklist", (req, res) => {
    res.render("blacklist", {title: "Blacklist"})
})

app.get("/CharacterInfo", (req,res) => {
    res.render("CharacterInfo", {title: "Character Info"})
})

app.get("/Faq", (req,res) => {
    res.render("Faq", {title: "FAQ"})
})

app.get("/favoritePage", (req,res) => {
    res.render("favoritePage", {title: "Favorite"})
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
            (character) => character.type.value === "outfit" && character.introduction?.chapter === "2"
        );

        res.render("Characterpage", {title: "Character Page", characters})
    } catch (error) {
        console.error("Error met ophalen van character data:", error);
        res.status(500).send("Error met ophalen van character data")
    }
})
app.get("/Landingpage", (req, res) => {
    res.render("Landingpage", {title: "Landingpage"})
});

app.listen(app.get("port"), async() => {
    console.log("[server] http://localhost:" + app.get("port"))
});