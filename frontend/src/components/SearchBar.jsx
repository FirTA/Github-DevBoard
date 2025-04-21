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
    }, 1000);

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
    setIsLoading(true);

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
    <form className="flex items-center" ref={dropdownRef}>
      <div className="relative flex-1">
        <div className="relative ">
          <input
            type="text"
            name="search"
            id="search"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter Github Username"
            className="w-full py-2 px-4 pr-10 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border-0 text-gray-800"
          />

          {isLoading ? (
            <div className="absolute right-0 top-0 h-full px-3 flex items-center justify-center text-gray-500 hover:text-gray-700">
              <Loader size={24} className="animate-spin text-gray-400" />
            </div>
          ) : (
            inputValue && (
              <button
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                onClick={handleClearInput}
              >
                <X />
              </button>
            )
          )}
        </div>

        {showDropdown && (
          <div className="absolute top-full left-0 right-0 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg z-10 max-h-80 overflow-y-auto">
            {notFoundState ? (
              <div className="px-4 py-3 text-center text-gray-600">
                User not found. Please try a different username.
              </div>
            ) : users.length > 0 ? (
              <ul className="py-1">
                {users.map((user) => (
                  <button
                    key={user.id}
                    onClick={() => setUser(user)}
                    className="w-full"
                  >
                    <li
                      key={user.id}
                      className="px-4 py-2 cursor-pointer flex items-center hover:bg-gray-100"
                      onClick={() => handleUserSelect(user)}
                    >
                      <img
                        src={user.avatar_url}
                        alt={`${user.login}'s avatar`}
                        className="w-8 h-8 rounded-full mr-3"
                      />
                      <div className="w-8 h-8 rounded-full mr-3">
                        <span className="font-medium text-gray-800">
                          {user.login}
                        </span>
                      </div>
                    </li>
                  </button>
                ))}
              </ul>
            ) : null}
          </div>
        )}
      </div>
    </form>
  );
}

export default SearchBar;
