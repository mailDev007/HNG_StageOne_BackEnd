const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/* ------------------------ function to get the time ------------------------ */
const getCurrentDate = () => {
  let dateTime = new Date();

  console.log(typeof dateTime)
  return dateTime;
};

const getCurrentDay = () => {
  /* ---------------------------- days in an array ---------------------------- */
  daysArray = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let currentDay = getCurrentDate().getDay();

  /* ----------------- insert the day into the html index page ---------------- */
  return daysArray[currentDay];
};

app.get("/api", (req, res) => {
  console.log(getCurrentDate());
  let user_query = req.query;
  if (user_query.slack_name && user_query.track) {
    if (
      user_query.slack_name.toLowerCase() == "chimakalu" &&
      user_query.track.toLowerCase() == "backend"
    ) {
        const newDate = getCurrentDate();
        console.log(newDate, typeof newDate);
      res.send({
        slack_name: "Chima Kalu",
        current_day: getCurrentDay(),
        utc_time: newDate.toISOString().replace(/\.\d+/, ''),
        track: "backend",
        github_file_url:
          "https://github.com/mailDev007/HNG_StageOne_BackEnd/blob/main/index.js",
        github_repo_url: "https://github.com/mailDev007/HNG_StageOne_BackEnd",
        status_code: 200,
      });
    }
  } else {
    res.send({
      slack_name: "",
      current_day: "Monday",
      utc_time: "2023-08-21T15:04:05Z",
      track: "",
      github_file_url: "",
      github_repo_url: "",
      status_code: 400,
    });
  }
});

app.listen(3000, (err) => {
  if (err) {
    console.log("Connection Failed");
  }
});
