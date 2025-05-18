import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import router from "./routes/routesLocation.js";

dotenv.config({ path: ".env" });

const app = express();
const port = process.env.PORT || 3000;


app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
  }),
);
app.use(express.json());

app.use("/api", router);

app.use((err, req, res, next) => {
    console.error("Erreur non attrapée:", err);
    res.status(500).json({ error: "Erreur interne du serveur" });
  });

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
  console.log(process.env.PORT);
});