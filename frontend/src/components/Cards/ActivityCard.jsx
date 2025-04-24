import React, { useMemo } from "react";
import { ActivityIcon, CalendarIcon, ClockIcon } from "lucide-react";

const ActivityCard = ({ repositories }) => {
  console.log("repositories :", repositories);
  const activityData = useMemo(() => {
    if (!repositories.length) return null;

    const reposByYear = {};
    repositories.forEach((repo) => {
      const createdYear = new Date(repo.created_at).getFullYear();
      reposByYear[createdYear] = (reposByYear[createdYear] || 0) + 1;
    });

    const years = Object.keys(reposByYear)
      .sort((a, b) => b - a)
      .slice(0, 5);

    const yearCounts = years.map((year) => ({
      year,
      count: reposByYear[year],
    }));

    const recentlyUpdated = [...repositories]
      .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
      .slice(0, 5)
      .map((repo) => ({
        name: repo.name,
        updatedAt: new Date(repo.updated_at).toLocaleDateString(),
        url: repo.html_url,
        description: repo.description,
        stars: repo.stargazers_count,
        language: repo.languages_url,
      }));

    return { yearCounts, recentlyUpdated };
  }, [repositories]);

  if (!activityData) return null;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Header with gradient */}
      <div className="bg-gradient-to-r from-cyan-600 to-teal-600 p-4">
        <h2 className="text-xl font-bold text-white flex items-center">
          <ActivityIcon size={20} className="mr-2" />
          Activity Overview
        </h2>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center text-gray-800">
              <CalendarIcon size={18} className="mr-2 text-cyan-600" />
              Repository Creation by Year
            </h3>

            {activityData.yearCounts.length > 0 ? (
              <div className="space-y-4">
                {activityData.yearCounts.map(({ year, count }, index) => (
                  <div key={year} className="relative">
                    <div className="flex items-center mb-2">
                      <div className="font-medium text-gray-800">{year}</div>
                      <div className="ml-2 text-sm text-gray-500">
                        ({count} {count === 1 ? "repository" : "repositories"})
                      </div>
                    </div>

                    <div className="h-8 bg-gray-100 rounded-md relative overflow-hidden">
                      <div
                        className="h-full bg-cyan-500 rounded-md transition-all duration-500 ease-out"
                        style={{
                          width: `${Math.min(
                            100,
                            (count /
                              Math.max(
                                ...activityData.yearCounts.map((y) => y.count)
                              )) *
                              100
                          )}%`,
                        }}
                      />
                      {/* <div className="absolute inset-y-0 flex items-center justify-end px-3">
                        <div className="font-medium text-white text-sm">
                          {count}
                        </div>
                      </div> */}
                    </div>

                    {index < activityData.yearCounts.length - 1 && (
                      <div className="absolute left-0 top-full h-4 border-l-2 border-dashed border-gray-300 ml-4"></div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-gray-50 rounded-lg p-4 text-gray-500 text-center">
                No repository creation data available
              </div>
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center text-gray-800">
              <ClockIcon size={18} className="mr-2 text-cyan-600" />
              Recently Updated
            </h3>
            {activityData.recentlyUpdated.length > 0 ? (
              <div className="space-y-3">
                {activityData.recentlyUpdated.map((repo) => (
                  <a
                    key={repo.name}
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-3 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors group"
                  >
                    <div className="flex justify-between items-start">
                      <div className="font-medium text-blue-600 group-hover:text-blue-800 transition-colors">
                        {repo.name}
                      </div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <CalendarIcon size={14} className="mr-1" />
                        {repo.updatedAt}
                      </div>
                    </div>
                    {repo.description && (
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                        {repo.description}
                      </p>
                    )}
                    <div className="flex items-center mt-2 space-x-4 text-sm">
                      {/* {repo.language && (
                        <div className="flex items-center text-gray-600">
                          <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 mr-1.5"></span>
                          {repo.language}
                        </div>
                      )} */}
                      {repo.stars > 0 && (
                        <div className="flex items-center text-gray-600">
                          <TrendingUpIcon size={14} className="mr-1" />
                          {repo.stars} stars
                        </div>
                      )}
                    </div>
                  </a>
                ))}
              </div>
            ) : (
              <div className="bg-gray-50 rounded-lg p-4 text-gray-500 text-center">
                No recent activity data available
              </div>
            )}
            <div className="mt-4 p-3 bg-yellow-50 rounded-md text-sm text-yellow-700">
              <p>
                Note: GitHub API provides limited activity data for public
                access. For more detailed contribution information, check the
                user's GitHub profile.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;
