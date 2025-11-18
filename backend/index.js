import express from "express";
import path from "path";
import fetch from "node-fetch";

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "../frontend")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

app.get("/api/contactos", async (res) => {
    const data = await fetch("http://www.raydelto.org/agenda.php");
    const json = await data.json();
    res.json(json);
});

app.post("/api/contactos", async (req, res) => {
    const data = await fetch("http://www.raydelto.org/agenda.php", {
        method: "POST",
        body: JSON.stringify(req.body)
    });
    const json = await data.json();
    res.json(json);
});

app.listen(3001, () => {
    console.log("Servidor en http://localhost:3001");
});
