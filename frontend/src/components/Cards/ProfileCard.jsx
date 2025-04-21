import { UserIcon, UsersIcon, BookIcon, ActivityIcon } from "lucide-react";

const ProfileCard = ({ userData }) => {
  if (!userData) {
    return (
      <div className="text-center py-16">
        <h2 className="text-xl font-bold mb-4">
          Welcome to the GitHub Dashboard
        </h2>
        <p className="mb-4 text-gray-600">
          Use the search bar above to find GitHub users and view their profiles.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-6">
        <img
          src={userData.avatar_url}
          alt={`${userData.login}'s avatar`}
          className="w-16 h-16 rounded-full mr-4"
        />
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            {userData.name || userData.login}
          </h2>
          <a
            href={userData.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {`@${userData.login}`}
          </a>
          {userData.created_at && (
            <div className="flex items-center text-gray-700">
              <span>
                Member since:{" "}
                {new Date(userData.created_at).toLocaleDateString()}
              </span>
            </div>
          )}
        </div>
      </div>
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <h3 className="text-lg font-semibold mb-2">User Details</h3>
        <p className="text-gray-700">User ID: {userData.id}</p>
        <p className="text-gray-700">Type: {userData.type}</p>
        {userData.bio && (
          <p className="text-gray-700 mt-2">Bio: {userData.bio}</p>
        )}
        {userData.location && (
          <p className="text-gray-700">Location: {userData.location}</p>
        )}
        {userData.email && (
          <p className="text-gray-700">Email: {userData.email}</p>
        )}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        <div className="bg-gray-50 p-4 rounded-lg justify-items-center">
          <div className="flex gap-2 items-center mb-2">
            <BookIcon size={18} className="text-gray-500 mr-1" />
            <h3 className="text-lg font-semibold">Repositories</h3>
          </div>
          <div>
            <p className="text-gray-600">{userData.public_repos}</p>
          </div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg justify-items-center">
          <div className="flex gap-2 items-center mb-2">
            <UsersIcon size={20} className="text-gray-500 mr-1" />
            <h3 className="text-lg font-semibold">Followers</h3>
          </div>
          <p className="text-gray-600">{userData.followers}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg justify-items-center">
          <div className="flex gap-2 mb-2 items-center">
            <UserIcon size={20} className="text-gray-500 mr-1" />
            <h3 className="text-lg font-semibold">Following</h3>
          </div>
          <p className="text-gray-600">{userData.following}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg justify-items-center">
          <div className="flex gap-2 mb-2 items-center">
            <ActivityIcon size={20} className="text-gray-500 mr-1" />
            <h3 className="text-lg font-semibold">Last Activity</h3>
          </div>
          <p className="text-gray-600">
            {new Date(userData.updated_at).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
