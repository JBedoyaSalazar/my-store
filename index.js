import express from "express";
import { routerApi } from "./routes/index.js";
import { errorHandler, logErrors } from "./middlewares/error.handler.js";

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
    res.send(`
        <h1>Welcome to my store</h1>
        <p>This is a simple store built with Express.js</p>
        `);
});

routerApi(app);

app.use(logErrors);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


