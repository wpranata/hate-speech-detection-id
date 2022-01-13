import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const PORT = 8000;

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//   axios
//     .post("http://localhost:8000/", { textToCheck: textToCheck })
//     .then((response) => {
//       res.send(response.data);
//     })
//     .catch((error) => {
//       console.log(error);
//     });

app.post("/checkText", (req, res) => {
  const textToCheck = req.body.textToCheck;
  console.log(`[i] Check Text: ${textToCheck}`);

  let retry = false;

  do {
    retry = false;
    axios
      .post(
        "https://api-inference.huggingface.co/models/crazould/indonesian_hate_speech_detection",
        {
          inputs: textToCheck,
        },
        {
          headers: {
            Authorization: "Bearer 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",
          },
        }
      )
      .then((response) => {
        console.log(response.data[0]);
        res.send(response.data[0]);
      })
      .catch((error) => {
        const err = error.response.data.error;
        console.log(`[!] ${err}`);
        retry =
          err ==
          "Model crazould/indonesian_hate_speech_detection is currently loading";
      });
  } while (retry);
});

app.listen(PORT, () => {
  console.log(`[i] Listening on ${PORT}`);
});
