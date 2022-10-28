import React, { useEffect, useState } from "react";

const Random = ({ KEY }) => {
  const BASE_URL = "https://api.nasa.gov/planetary/apod?api_key=";
  const apodURL = BASE_URL + KEY;
  //   console.log(apodURL);

  // const [apodData, setApodData] = useState({});
  const [displayDate, setDisplayDate] = useState("");
  const [randomApodData, setRandomApodData] = useState({});

  const fetchRandomApod = async (event) => {
    let randomYear;
    let randomMonth;
    let randomDay;
    let randomDate;

    // Today's Date (parameter for GET requests):
    // let today = new Date();
    // const dd = String(today.getDate()).p adStart(2, "0");
    // const mm = String(today.getMonth() + 1).padStart(2, "0");
    // const yyyy = today.getFullYear();
    // const yy = yyyy.toString().slice(2);
    // today = mm + "-" + dd + "-" + yy;
    // // console.log("today's date is: " + today);

    const generateRandomDate = () => {
      randomYear = Math.floor(Math.random() * (2022 - 1995 + 1) + 1995);
      randomMonth = Math.floor(Math.random() * (12 - 1 + 1) + 1);

      if (randomMonth === 2) {
        randomDay = Math.floor(Math.random() * (28 - 1 + 1) + 1);
      } else if (
        randomMonth === 1 ||
        randomMonth === 3 ||
        randomMonth === 5 ||
        randomMonth === 7 ||
        randomMonth === 8 ||
        randomMonth === 10 ||
        randomMonth === 12
      ) {
        randomDay = Math.floor(Math.random() * (31 - 1 + 1) + 1);
      } else {
        randomDay = Math.floor(Math.random() * (30 - 1 + 1) + 1);
      }
    };

    if (!randomYear || !randomMonth || !randomDay || !randomDate) {
      generateRandomDate();
      // adding 0 to dates/months < 10:
      if (randomMonth < 10) {
        randomMonth = "0" + randomMonth;
      }
      if (randomDay < 10) {
        randomDay = "0" + randomDay;
      }

      randomDate = randomYear + "-" + randomMonth + "-" + randomDay;
      console.log("randomDate: " + randomDate);
      setDisplayDate(randomDate);
    }

    if (!randomDate) {
      return;
    }

    await fetch(apodURL + "&date=" + randomDate + "&hd=true")
      .then((response) => response.json())
      .then((result) => {
        if (result.code) {
          console.log(
            "random date outside acceptable parameters, reculculating date..."
          );
          fetchRandomApod();
          generateRandomDate();
          return;
        }

        if (result.media_type === "video" || result.media_type === "other") {
          console.log(
            "Random date is not an image, re-calculating date for image..."
          );
          fetchRandomApod();
          generateRandomDate();
          return;
        }

        console.log("successfully retrieved random date apod data");
        console.log(result);
        setRandomApodData(result);
        return;
      })
      .catch(console.error);
  };

  useEffect(() => {
    fetchRandomApod();
  }, []);

  return (
    <div>
      <div className="home-body">
        <h1>Random APOD</h1>
        <div className="random-apod-container">
          <button onClick={fetchRandomApod} className="random-date-btn">
            Random Date
          </button>
          {displayDate && randomApodData.url ? (
            <div>
              {randomApodData ? (
                <p className="display-date">{displayDate}</p>
              ) : (
                <></>
              )}
              {randomApodData ? (
                <h3 className="random-apod-title">{randomApodData.title}</h3>
              ) : (
                <p>(no title given)</p>
              )}
              <a href={randomApodData.url}>
                <img src={randomApodData.url} className="random-apod-img" />
              </a>
              <div className="random-img-info">
                {randomApodData.copyright ? (
                  <p>Photographer: {randomApodData.copyright}</p>
                ) : (
                  <p>(photographer uncredited)</p>
                )}
                {randomApodData.explanation ? (
                  <p>{randomApodData.explanation}</p>
                ) : (
                  <p>No information available.</p>
                )}
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default Random;
