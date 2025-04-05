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

