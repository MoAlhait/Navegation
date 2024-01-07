import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import SplashPage from "./SplashPage/SplashPage";
import starSvg from "./star-icon.svg";

function App() {
  const [address, setAddress] = useState("");
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    setLoading(true);
    fetch("https://promptgpt-t2ci4zreuq-uc.a.run.app", {
      method: "POST",
      body: JSON.stringify({ location: address }),
    })
      .then((response) => response.json())
      .then(({ response }) => {
        console.log("response", response);
        // Parse each entry into an object
        const parsedRestaurants = response
          .split("\n\n")
          .map((entry: string, index: number) => {
            console.log("entry", entry);
            const lines = entry.split("\n");
            const dish = lines[0].replace("**Dish:**", "");
            const restaurant = lines[1].replace("**Restaurant:**", "");
            const rating = parseFloat(lines[2].replace("**Rating:**", ""));
            const review = lines[3].replace("**Review:**", "");
            console.log("mink", index, { dish, restaurant, rating, review });
            return { dish, restaurant, rating, review };
          });

        // Update the 'restaurants' state with the parsed data
        setRestaurants(parsedRestaurants);
      })
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  // const ratingWheel = (rating: number) => {
  //   const degree = (rating * 360) / 5;
  //   const style = {
  //     border: `conic-gradient(#FFD700 0deg ${degree}deg, #e0e0e0 ${degree}deg 360deg)`,
  //     // border: "10px solid #e0e0e0",
  //   };

  //   return <div className="ratingWheel" style={style}></div>;
  // };

  const ratingWheel = (rating: number) => {
    const degree = (rating * 360) / 5;
    console.log("degree", degree);
    // const style = {
    //   width: "100px",
    //   height: "100px",
    //   borderRadius: "50%",
    //   display: "flex",
    //   justifyContent: "center",
    //   alignItems: "center",
    //   background: "white", // Or any color or transparent
    //   backgroundImage: `conic-gradient(#FFD700 0deg ${degree}deg, #e0e0e0 ${degree}deg 360deg)`,
    //   border: "10px solid transparent", // Adjust border size as needed
    // };

    return (
      <div className="ratingWheel">
        <img
          src={starSvg}
          alt="star"
          style={{ height: "100px", width: "100px" }}
        />
        {rating} / 5.0
      </div>
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        {loading && <img src={logo} className="App-logo" alt="logo" />}
        <p>Enter your address to find nearby vegan restaurants:</p>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        <ul>
          {restaurants.map((restaurant, index) => (
            <li key={index} className={"card"}>
              <p>{restaurant.dish}</p>
              <p>Restaurant: {restaurant.restaurant}</p>
              <p>Rating: {ratingWheel(parseFloat(restaurant.rating))}</p>
              <p>Review: {restaurant.review}</p>
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
