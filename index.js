const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

dotenv.config();

const PORT = process.env.PORT || 3080;
const key = process.env.API_KEY;

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  organization: "org-gLRCLaxCaoWCjIqrA9uHHu5Z",
  apiKey: key,
});
const openai = new OpenAIApi(configuration);

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send({ message: "Health Route Working" });
});

app.post("/", async (req, res) => {
  const message = req.body;

  console.log(typeof message.message);

  const response = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: `${message.message}`,
    max_tokens: 100,
    temperature: 0.5,
  });

  res.json({
    message: response.data.choices[0].text,
    // data: message,
  });
});

app.listen(PORT, () => {
  console.log("Server Connected Port", PORT);
});
