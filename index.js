import express from "express";
import cors from "cors";
import { routerApi } from "./routes/index.js";
import { errorHandler, logErrors, boomErrorHandler } from "./middlewares/error.handler.js";

const app = express();
const port = 3000;

app.use(express.json());

const whiteList = ["http://localhost:8080", "http://localhost:5050"];
const options = {
    origin: (origin, callback) => {
        if (whiteList.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
};

app.use(cors(options));

app.get("/", (req, res) => {
    res.send(`
        <h1>Welcome to my store</h1>
        <p>This is a simple store built with Express.js</p>
        `);
});

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
