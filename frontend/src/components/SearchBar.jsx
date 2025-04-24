import { Loader, SearchIcon, X } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { searchUserAPI } from "../services/githubApi"; // Adjust the import path as necessary
import useDebounce from "../utils/useDecounce"; // Adjust the import path as necessary

function SearchBar({ setUser }) {
  const [inputValue, setInputValue] = useState("");
  const [users, setUsers] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [notFoundState, setNotFoundState] = useState(false);
  const dropdownRef = useRef(null);
  const searchValue = useDebounce(inputValue, 500);

  const showNotFound = () => {
    setNotFoundState(true);
    const handler = setTimeout(() => {
      setNotFoundState(false);
      setShowDropdown(false);
    }, 3000);

    return () => {
      clearTimeout(handler);
    };
  };

  useEffect(() => {
    if (searchValue) {
      searchUser(searchValue);
    } else {
      setUsers([]);
      setShowDropdown(false);
    }
  }, [searchValue]);

  const searchUser = async (username) => {
    if (!username) return;

    setIsLoading(true);
    setNotFoundState(false);

    try {
      // Using async/await pattern
      const res = await searchUserAPI(username);
      console.log("Response:", res);
      const items = res.items || [];
      setUsers(items);
      if (items.length === 0) {
        showNotFound();
      }
      setShowDropdown(true);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setUsers([]);
      showNotFound();
    } finally {
      setIsLoading(false);
    }
  };

  const handleUserSelect = (user) => {
    setUser(user);
    setInputValue(user.login);
    setShowDropdown(false);
    setNotFoundState(false);
  };

  const handleClearInput = () => {
    setInputValue("");
    setUsers([]);
    setShowDropdown(false);
    setNotFoundState(false);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full max-w-2xl mx-auto" ref={dropdownRef}>
      <div className="relative flex items-center">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          <SearchIcon size={18} />
        </div>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Search GitHub users..."
          // className="w-full py-3 pl-10 pr-10 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-300 transition-all duration-300"
          className="w-full py-3 pl-10 pr-10 rounded-lg border border-gray-300 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 
                     transition-all duration-300"
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          {isLoading ? (
            <Loader size={18} className="animate-spin text-blue-300" />
          ) : (
            inputValue && (
              <button
                onClick={handleClearInput}
                // className="text-gray-300 hover:text-white transition-colors duration-200"
                className="text-gray-400 hover:text-gray-700 transition-colors duration-200"
                aria-label="Clear search"
              >
                <X size={18} />
              </button>
            )
          )}
        </div>
      </div>

      {showDropdown && (
        <div
          // className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-30 max-h-80 overflow-y-auto transition-all duration-300 ease-in-out"
          className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg 
                        shadow-xl border border-gray-200 z-30 max-h-80 overflow-y-auto 
                        transition-all duration-300 ease-in-out"
        >
          {notFoundState ? (
            <div
              // className="flex items-center justify-center p-4 text-gray-500 dark:text-gray-400"
              className="flex items-center justify-center p-4 text-gray-500"
            >
              <span>No users found matching "{inputValue}"</span>
            </div>
          ) : users.length > 0 ? (
            <ul className="py-1">
              {users.map((user) => (
                <li
                  key={user.id}
                  // className="px-4 py-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150"
                  className="px-4 py-3 cursor-pointer hover:bg-gray-100 
                             transition-colors duration-150"
                  onClick={() => handleUserSelect(user)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <img
                        src={user.avatar_url}
                        alt={`${user.login}'s avatar`}
                        // className="w-10 h-10 rounded-full object-cover border-2 border-transparent hover:border-blue-500 transition-all duration-200"
                        className="w-10 h-10 rounded-full object-cover border-2 
                               border-transparent hover:border-blue-500 transition-all duration-200"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p
                        // className="font-medium text-gray-900 dark:text-white truncate"
                        className="font-medium text-gray-900 truncate"
                      >
                        {user.login}
                      </p>
                      <p
                        // className="text-sm text-gray-500 dark:text-gray-400 truncate"
                        className="text-sm text-gray-500 truncate"
                      >
                        {user.type}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
