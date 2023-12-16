import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import SplashPage from "./SplashPage/SplashPage";

function App() {
  // const [address, setAddress] = useState("");
  // const [restaurants, setRestaurants] = useState([]);

  // const handleSearch = () => {
  //   // Perform API call to fetch vegan restaurants based on the entered address
  //   // Update the 'restaurants' state with the fetched data
  // };

  return (
    <div className="App">
      <SplashPage />
    </div>
  );
  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>Enter your address to find nearby vegan restaurants:</p>
  //       <input
  //         type="text"
  //         value={address}
  //         onChange={(e) => setAddress(e.target.value)}
  //       />
  //       <button onClick={handleSearch}>Search</button>
  //       <ul>
  //         {restaurants.map((restaurant, index) => (
  //           <li key={index}>{restaurant.name}</li>
  //         ))}
  //       </ul>
  //     </header>
  //   </div>
  // );
}

export default App;
