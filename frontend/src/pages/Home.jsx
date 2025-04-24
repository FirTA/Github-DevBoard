import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar"; // Adjust the import path as necessary
import { fetchUserData, fetchUserRepos } from "../services/githubApi"; // Adjust the import path as necessary
import {
  UserIcon,
  UsersIcon,
  BookIcon,
  ActivityIcon,
  GithubIcon,
} from "lucide-react";
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
      setUserData(userData);
      setUserRepo(userRepo);
      console.log("user data :", userData);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      // className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-900 text-white"
      className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50"
    >
      <header
        // className="sticky top-0 z-10 backdrop-blur-md bg-slate-900/70 shadow-lg border-b border-white/10"
        className="sticky top-0 z-10 bg-white shadow-sm"
      >
        <div
          // className="container mx-auto px-4 py-4 md:py-6"
          className="container mx-auto px-4 py-4"
        >
          <div
            // className="flex flex-col md:flex-row justify-between items-center gap-4"
            className="flex flex-col md:flex-row justify-between items-center gap-4"
          >
            <div className="flex items-center">
              <GithubIcon size={28} className="mr-3 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-800">
                GitHub Dashboard
              </h1>
            </div>
            <div className="w-full md:w-auto md:min-w-[400px] lg:min-w-[500px]">
              <SearchBar setUser={setUser} />
            </div>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-6">
        {!userData && !isLoading && (
          <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
            <div className="max-w-lg p-8 rounded-xl bg-white shadow-xl">
              <GithubIcon size={64} className="mx-auto mb-6 text-blue-500" />
              <h2 className="text-2xl font-bold mb-4 text-gray-800">
                Welcome to the GitHub Dashboard
              </h2>
              <p className="mb-6 text-gray-600">
                Search for GitHub users to explore their profiles, repositories,
                and technical skills. Get insights into their coding activities
                and language preferences.
              </p>
              <div className="text-sm text-gray-400">
                Built with React Tailwind CSS
              </div>
            </div>
          </div>
        )}
        {isLoading && <LoadingOverlay />}
        {userData && !isLoading && (
          <>
            <div className="grid grid-cols-1 gap-6 py-6">
              <ProfileCard userData={userData} />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <RepoStats repositories={userRepo} />
                <LanguageUsageCard repositories={userRepo} />
              </div>
              <TechnicalAnaylsis repositories={userRepo} />
              <ActivityCard repositories={userRepo} />
            </div>
          </>
        )}
      </main>
      <footer className="bg-white border-t border-gray-200 py-4 mt-auto">
        <div className="container mx-auto px-4 text-center text-gray-500">
          <p>GitHub Dashboard &copy; {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
