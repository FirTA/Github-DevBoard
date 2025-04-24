import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar"; // Adjust the import path as necessary
import { fetchUserData, fetchUserRepos } from "../services/githubApi"; // Adjust the import path as necessary
import { UserIcon, UsersIcon, BookIcon, ActivityIcon } from "lucide-react";
import ProfileCard from "../components/Cards/ProfileCard";
import LoadingOverlay from "../components/LoadingOverlay";
import LanguageUsageCard from "../components/Cards/LanguageUsageCard";
import TechnicalAnaylsis from "../components/Cards/TechnicalAnaylsis";
import RepoStats from "../components/Cards/RepoStats";
import ActivityCard from "../components/Cards/ActivityCard";

const Home = () => {
  const [user, setUser] = useState("");
  const [userData, setUserData] = useState(null);
  const [userRepo, setUserRepo] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log("User state changed:", user.login);
    fetchUser(user.login);
  }, [user]);

  useEffect(() => {
    console.log("isLoading state:", isLoading);
  }, [isLoading]);

  const fetchUser = async (username) => {
    if (!username) return;
    setIsLoading(true);
    try {
      const [userData, userRepo] = await Promise.all([
        fetchUserData(username),
        fetchUserRepos(username),
      ]);
      const user = await userData;
      const repositories = await userRepo;
      if (user) setUserData(user);
      if (repositories) setUserRepo(repositories);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 mx-auto">
      <header className="bg-gradient-to-r from-gray-700 bg-blue-700 p-4 shadow-md mb-4 text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold mb-2">GitHub Dashboard</h1>
          <p className="text-blue-100 mb-4">
            This is the home page of the app.
          </p>
          <SearchBar setUser={setUser} />
        </div>
      </header>
      <main className="container mx-auto px-4 py-6">
        {!userData && !isLoading && (
          <div className="text-center py-16">
            <h2 className="text-xl font-bold mb-4">
              Welcome to the GitHub Dashboard
            </h2>
            <p className="mb-4 text-gray-600">
              Use the search bar above to find GitHub users and view their
              profiles.
            </p>
          </div>
        )}
        {isLoading && <LoadingOverlay />}
        {userData && !isLoading && (
          <>
            <ProfileCard userData={userData} />
            <LanguageUsageCard repositories={userRepo} />
            <TechnicalAnaylsis repositories={userRepo} />
            <RepoStats repositories={userRepo} />
            <ActivityCard repositories={userRepo} />
          </>
        )}
      </main>
    </div>
  );
};

export default Home;
