const searchUserAPI = (username) =>
  fetch(`https://api.github.com/search/users?q=${username}`, {
    headers: {
      Accept: "application/vnd.github+json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error fetching user data:", error);
      throw error;
    });

const fetchUserData = (username) =>
  fetch(`https://api.github.com/users/${username}`, {
    headers: {
      Accept: "application/vnd.github+json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error fetching user data:", error);
      throw error;
    });

export { searchUserAPI, fetchUserData };
