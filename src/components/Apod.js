import React, { useEffect, useState } from "react";

const Apod = ({ KEY }) => {
  const BASE_URL = "https://api.nasa.gov/planetary/apod?api_key=";
  const apodURL = BASE_URL + KEY;

  const [apodData, setApodData] = useState({});
  const [displayDate, setDisplayDate] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [searched, setSearched] = useState(false);

  // Today's Date (parameter for GET requests):
  let today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const yyyy = today.getFullYear();
  const inputDateString = yyyy + "-" + mm + "-" + dd;
  const yy = yyyy.toString().slice(2);
  today = mm + "-" + dd + "-" + yy;
  // console.log("today's date is: " + today);

  const apodDateHandler = (event) => {
    event.preventDefault();
    console.log("selected date: " + event.target.value);
    setSelectedDate(event.target.value);
  };

  const dateFormHandler = (event) => {
    event.preventDefault();
    fetchApod(selectedDate);
  };

  const fetchApod = async (date) => {
    if (!date) {
      await fetch(apodURL)
        .then((response) => response.json())
        .then((result) => {
          if (result.date) {
            console.log("Successfully retrieved APOD data.");
            console.log(result);
            setApodData(result);
            setDisplayDate(result.date);
            return;
          }
        })
        .catch(console.error);
    } else {
      await fetch(apodURL + "&date=" + date + "&hd=true")
        .then((response) => response.json())
        .then((result) => {
          if (result.date) {
            console.log("Successfully retrieved APOD data for date: " + date);
            console.log(result);
            setApodData(result);
            setDisplayDate(result.date);
            if (selectedDate === inputDateString) {
              setSearched(false);
            } else {
              setSearched(true);
            }
            return;
          }
        })
        .catch(console.error);
    }
  };

  useEffect(() => {
    fetchApod();
  }, []);

  return (
    <div>
      <div className="home-body">
        <div className="header-and-form">
          {searched ? <h1>Historical Picture</h1> : <h1>Today's Picture</h1>}
          <form onSubmit={dateFormHandler} className="date-form">
            <p>Pick a date</p>
            <input
              type="date"
              defaultValue={inputDateString}
              onChange={apodDateHandler}
              min="1995-06-20"
              max={inputDateString}
              className="calendar"
            />
            <button>Submit</button>
          </form>
        </div>
        <div className="random-apod-container">
          {displayDate && apodData.url ? (
            <div>
              {apodData ? (
                <div className="img-title-date">
                  <h3 className="random-apod-title">
                    {apodData.title} ({displayDate})
                  </h3>
                </div>
              ) : (
                <p>(no title given)</p>
              )}
              {apodData.media_type === "image" ? (
                <a href={apodData.url}>
                  <img src={apodData.url} className="random-apod-img" />
                </a>
              ) : (
                <></>
              )}

              <div className="random-img-info">
                {apodData.copyright ? (
                  <p>Photographer: {apodData.copyright}</p>
                ) : (
                  <p>(photographer uncredited)</p>
                )}
                {apodData.explanation ? (
                  <p>{apodData.explanation}</p>
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

export default Apod;
