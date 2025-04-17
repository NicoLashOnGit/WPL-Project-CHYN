import express from "express"
const app = express();

app.use(express.static("public"));
app.use(express.json({limit: "1mb"}));
app.use(express.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.set("port", 3000);


app.listen(app.get("port"), async() => {
    console.log("[server] http://localhost:" + app.get("port"))
});

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

app.get("/Characterpage", (req, res) => {
    res.render("Characterpage", {title: "Character"})
})
app.get("/Landingpage", (req, res) => {
    res.render("Landingpage", {title: "Landingpage"})
});
