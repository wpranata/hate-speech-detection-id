import express from "express";
import axios from "axios";
import axiosRetry from "axios-retry";
import bodyParser from "body-parser";
import cors from "cors";

const PORT = 8000;

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
axiosRetry(axios, { retries: 10 });

app.post("/checkText", async(req, res) => {
    const textToCheck = req.body.textToCheck;
    console.log(`[i] Check Text: ${textToCheck}`);

    if (textToCheck == "") {
        res.send({ error: "empty text" });
        return;
    }

    await axios
        .post(
            "https://api-inference.huggingface.co/models/crazould/indonesian_hate_speech_detection", {
                inputs: textToCheck,
            }, {
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
            console.log(error);
        });
});

app.listen(PORT, () => {
    console.log(`[i] Listening on ${PORT}`);
});