import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar"; // Adjust the import path as necessary

const Home = () => {
  const [user, setUser] = useState(null);
  const handleSearch = (searchUsername) => {
    // Handle the search logic here
    console.log("Searching for user:", searchUsername);
  };

  useEffect(() => {
    console.log("User state changed:", user);
    // Perform any action when the user state changes
    // For example, you can fetch user data or update the UI
    if (user) {
      console.log("User found:", user);
      // Fetch user data or perform any other action
    } else {
      console.log("No user found.");
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-slate-50 mx-auto">
      <header className="bg-gradient-to-r from-gray-700 bg-blue-700 p-4 shadow-md mb-4 text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold mb-2">GitHub Dashboard</h1>
          <p className="text-blue-100 mb-4">
            This is the home page of the app.
          </p>
        </div>
        <SearchBar onSearch={handleSearch} setUser={setUser} />
      </header>
      <main className="container mx-auto px-4"></main>
      <h2 className="text-xl font-bold mb-4">
        Welcome to the GitHub Dashboard
      </h2>
      <p className="mb-4">
        Use the search bar above to find GitHub users and view their profiles.
      </p>
    </div>
  );
};

export default Home;
