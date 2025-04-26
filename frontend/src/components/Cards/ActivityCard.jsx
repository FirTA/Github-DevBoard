import React, { useEffect, useState, useMemo } from "react";
import { ActivityIcon, CalendarIcon, ClockIcon } from "lucide-react";

const ActivityCard = ({ repositories }) => {
  const [recentRepos, setRecentRepos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
        language: repo.language,
        languages_url: repo.languages_url,
        languages: null,
      }));
    return { yearCounts, recentlyUpdated };
  }, [repositories]);

  useEffect(() => {
    if (!activityData) return;

    const fetchAllLanguages = async () => {
      setIsLoading(true);
      try {
        const updatedRepos = await Promise.all(
          activityData.recentlyUpdated.map(async (repo) => {
            try {
              const response = await fetch(repo.languages_url);
              const languagesData = await response.json();

              // Convert languages object to array of {name, bytes} objects
              const languagesArray = Object.entries(languagesData).map(
                ([name, bytes]) => ({
                  name,
                  bytes,
                })
              );
              console.log(languagesArray);
              return {
                ...repo,
                languages: languagesArray,
              };
            } catch (error) {
              console.error(
                `Error fetching languages for ${repo.name}:`,
                error
              );
              return repo; // Return original repo if fetch fails
            }
          })
        );

        setRecentRepos(updatedRepos);
      } catch (error) {
        console.error("Error fetching languages:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllLanguages();
  }, [activityData]);

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
            {recentRepos.length > 0 ? (
              <div className="space-y-3">
                {recentRepos.map((repo) => (
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
                    <div className="mt-2">
                      <div className="text-xs font-medium text-gray-500 mb-1">
                        Languages:
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {repo.languages && repo.languages.length > 0 ? (
                          repo.languages.map((lang) => (
                            <span
                              key={`${repo.name}-${lang.name}`}
                              className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                            >
                              {lang.name}
                            </span>
                          ))
                        ) : repo.language ? (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {repo.language}
                          </span>
                        ) : (
                          <span className="text-xs text-gray-500">
                            No languages detected
                          </span>
                        )}
                      </div>
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
