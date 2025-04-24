import {
  UserIcon,
  UsersIcon,
  BookIcon,
  ActivityIcon,
  MailIcon,
  GlobeIcon,
  GithubIcon,
  MapPinIcon,
} from "lucide-react";

// Helper component for stats cards
const StatCard = ({
  icon,
  value,
  label,
  bgColor,
  textColor,
  isDate = false,
}) => (
  <div
    className={`${bgColor} rounded-lg p-4 text-center transition-all duration-300 hover:shadow-md`}
  >
    <div className="flex justify-center mb-2">{icon}</div>
    <div
      className={`${isDate ? "text-sm" : "text-2xl"} font-bold ${textColor}`}
    >
      {value}
    </div>
    <div className="text-xs uppercase tracking-wider text-gray-500 mt-1">
      {label}
    </div>
  </div>
);
const ProfileCard = ({ userData }) => {
  return (
    <div
      // className="bg-white/10 backdrop-blur-md rounded-xl shadow-xl border border-white/10 overflow-hidden transition-all duration-300 hover:shadow-blue-600/10"
      className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100"
    >
      {/* Two-column layout on medium screens and up */}
      <div className="md:flex">
        {/* Left column - Avatar section */}
        <div
          // className="md:w-1/3 bg-gradient-to-br from-blue-600/20 to-purple-600/20 p-6 flex flex-col items-center justify-center"
          className="md:w-1/3 bg-gradient-to-br from-blue-50 to-indigo-50 p-6 flex flex-col items-center justify-center"
        >
          <img
            src={userData.avatar_url}
            alt={`${userData.login}'s avatar`}
            // className="w-32 h-32 md:w-48 md:h-48 rounded-full border-4 border-white/20 shadow-lg object-cover"
            className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-lg object-cover"
          />
          <h2
            // className="text-2xl font-bold text-white mt-4 text-center"
            className="text-2xl font-bold text-gray-800 mt-4 text-center"
          >
            {userData.name || userData.login}
          </h2>
          <a
            href={userData.html_url}
            target="_blank"
            rel="noopener noreferrer"
            // className="text-blue-300 hover:text-blue-200 hover:underline transition-colors flex items-center gap-1 mt-1"
            className="text-blue-600 hover:text-blue-800 hover:underline transition-colors flex items-center gap-1 mt-1"
          >
            <GithubIcon size={16} />
            {`@${userData.login}`}
          </a>
          {userData.created_at && (
            <div
              // className="mt-2 text-gray-300 text-sm"
              className="mt-2 text-gray-500 text-sm"
            >
              <span>
                Member since:{" "}
                {new Date(userData.created_at).toLocaleDateString()}
              </span>
            </div>
          )}
        </div>

        <div className="md:w-2/3 p-6">
          <div className="mb-6">
            {userData.bio && (
              <div className="mb-3">
                <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-1">
                  Bio
                </h3>
                <p className="text-gray-700">{userData.bio}</p>
              </div>
            )}
            <div className="flex flex-wrap gap-4 mt-3">
              {userData.location && (
                <div className="flex items-center text-gray-600">
                  <MapPinIcon size={16} className="mr-1 text-gray-400" />
                  <span>{userData.location}</span>
                </div>
              )}
              {userData.email && (
                <div className="flex items-center text-gray-600">
                  <MailIcon size={16} className="mr-1 text-gray-400" />
                  <span>{userData.email}</span>
                </div>
              )}
              <div className="flex items-center text-gray-600">
                <UserIcon size={16} className="mr-1 text-gray-400" />
                <span>{userData.type}</span>
              </div>
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard
              icon={<BookIcon size={20} className="text-blue-500" />}
              value={userData.public_repos}
              label="Repositories"
              bgColor="bg-blue-50"
              textColor="text-blue-700"
            />

            <StatCard
              icon={<UsersIcon size={20} className="text-green-500" />}
              value={userData.followers}
              label="Followers"
              bgColor="bg-green-50"
              textColor="text-green-700"
            />

            <StatCard
              icon={<UserIcon size={20} className="text-yellow-500" />}
              value={userData.following}
              label="Following"
              bgColor="bg-yellow-50"
              textColor="text-yellow-700"
            />

            <StatCard
              icon={<ActivityIcon size={20} className="text-purple-500" />}
              value={new Date(userData.updated_at).toLocaleDateString()}
              label="Last Activity"
              bgColor="bg-purple-50"
              textColor="text-purple-700"
              isDate={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
