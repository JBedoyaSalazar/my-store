import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.send(`
        <h1>Welcome to my store</h1>
        <p>This is a simple store built with Express.js</p>
        `);
});

app.get("/probandoRutas", (req, res) => {
    res.send(`
        <h2>Probando Endpoints</h2>
        <p>Esta es una ruta de prueba</p>
        `);
})

app.get("/json", (req, res) => {
    res.json({
        message: "Esta ruta devuelve un JSON",
        status: 201
    });
})


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
