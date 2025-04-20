"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.static("public"));
app.use(express_1.default.json({ limit: "1mb" }));
app.use(express_1.default.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("port", 3000);
app.listen(app.get("port"), () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("[server] http://localhost:" + app.get("port"));
}));
app.get("/", (req, res) => {
    res.render("Landingpage", { title: "Landingpage" });
});
app.get("/Accountpage", (req, res) => {
    res.render("Accountpage", { title: "Account" });
});
app.get("/blacklist", (req, res) => {
    res.render("blacklist", { title: "Blacklist" });
});
app.get("/CharacterInfo", (req, res) => {
    res.render("CharacterInfo", { title: "Character Info" });
});
app.get("/Faq", (req, res) => {
    res.render("Faq", { title: "FAQ" });
});
app.get("/favoritePage", (req, res) => {
    res.render("favoritePage", { title: "Favorite" });
});
app.get("/Homepage", (req, res) => {
    res.render("Homepage", { title: "Home" });
});
app.get("/Loginpage", (req, res) => {
    res.render("Loginpage", { title: "Login" });
});
app.get("/Characterpage", (req, res) => {
    res.render("Characterpage", { title: "Character" });
});
app.get("/Landingpage", (req, res) => {
    res.render("Landingpage", { title: "Landingpage" });
});
