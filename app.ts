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
    res.render("Landingpage")
});

app.get("/Accountpage", (req,res) => {
    res.render("Accountpage")
})

app.get("/blacklist", (req, res) => {
    res.render("blacklist")
})

app.get("/CharacterInfo", (req,res) => {
    res.render("CharacterInfo")
})

app.get("/Faq", (req,res) => {
    res.render("Faq")
})

app.get("/favoritePage", (req,res) => {
    res.render("favoritePage")
})

app.get("/Homepage", (req,res) => {
    res.render("Homepage")
})

app.get("/Landingpage", (req, res) => {
    res.render("Landingpage")
})

app.get("/Loginpage", (req, res) => {
    res.render("Loginpage")
})