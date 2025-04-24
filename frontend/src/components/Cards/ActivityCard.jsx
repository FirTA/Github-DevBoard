import React, { useMemo } from "react";
import { ActivityIcon, ClockIcon } from "lucide-react";

const ActivityCard = ({ repositories }) => {
  const activityData = useMemo(() => {
    if (!repositories.length) return null;

    const now = new Date();
    const currentYear = now.getFullYear();

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
      }));

    return { yearCounts, recentlyUpdated };
  }, [repositories]);

  if (!activityData) return null;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-6 flex items-center">
        <ActivityIcon size={20} className="mr-2" />
        Activity Overview
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">
            Repository Creation by Year
          </h3>
          {activityData.yearCounts.length > 0 ? (
            <div className="space-y-3">
              {activityData.yearCounts.map(({ year, count }) => (
                <div key={year} className="flex items-center">
                  <div className="text-gray-700 w-12">{year}</div>
                  <div className="flex-1 ml-2">
                    <div className="h-6 bg-gray-100 rounded-md relative">
                      <div
                        className="h-full bg-blue-500 rounded-md"
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
                      <div className="absolute right-2 top-0 h-full flex items-center text-sm">
                        {count} {count === 1 ? "repo" : "repos"}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">
              No repository creation data available
            </p>
          )}
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <ClockIcon size={18} className="mr-2" />
            Recently Updated
          </h3>
          {activityData.recentlyUpdated.length > 0 ? (
            <div className="space-y-2">
              {activityData.recentlyUpdated.map((repo) => (
                <a
                  key={repo.name}
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-md transition-colors"
                >
                  <div className="font-medium text-blue-600 truncate max-w-[180px]">
                    {repo.name}
                  </div>
                  <div className="text-sm text-gray-500">{repo.updatedAt}</div>
                </a>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No recent activity data available</p>
          )}
          <div className="mt-4 p-3 bg-yellow-50 rounded-md text-sm text-yellow-700">
            <p>
              Note: GitHub API provides limited activity data for public access.
              For more detailed contribution information, check the user's
              GitHub profile.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;
