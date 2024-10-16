import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

function passwordCheck(req, res, next) {
  const password = (req.body["password"] || "").toLowerCase(); 
  let authorisedPage = "index.html"; 

  switch (password) {
    case "wonder nr.1":
    case "great wall of china":
      authorisedPage = "index1.html";
      break;
    case "wonder nr.2":
    case "petra":
      authorisedPage = "index2.html";
      break;
    case "wonder nr.3":
    case "christ the redeemer":
      authorisedPage = "index3.html";
      break;
    case "wonder nr.4":
    case "machu picchu":
      authorisedPage = "index4.html";
      break;
    case "wonder nr.5":
    case "chichen itza":
      authorisedPage = "index5.html";
      break;
    case "wonder nr.6":
    case "roman colosseum":
      authorisedPage = "index6.html";
      break;
    case "wonder nr.7":
    case "taj mahal":
      authorisedPage = "index7.html";
      break;
    default:
      authorisedPage = "index.html";
  }

  req.authorisedPage = authorisedPage;

  next();
}
app.use(passwordCheck);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/check", (req, res) => {
  res.sendFile(__dirname + `/public/${req.authorisedPage}`);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
export default app;
