import { BookIcon, GitForkIcon, StarIcon } from "lucide-react";
import React, { useMemo } from "react";
import { StatBox } from "./StatBox";

const RepoStats = ({ repositories }) => {
  const stats = useMemo(() => {
    const totalRepos = repositories.length;
    const totalStars = repositories.reduce(
      (sum, repo) => sum + repo.stargazers_count,
      0
    );

    const totalForks = repositories.reduce(
      (sum, repo) => sum + repo.forks_count,
      0
    );

    const avgStarsPerRepo =
      totalRepos > 0 ? (totalStars / totalRepos).toFixed(1) : 0;
    const mostStarredRepo =
      repositories.length > 0
        ? repositories.reduce((prev, current) =>
            prev.stargazers_count > current.stargazers_count ? prev : current
          )
        : null;

    return {
      totalForks,
      totalRepos,
      totalStars,
      avgStarsPerRepo,
      mostStarredRepo,
    };
  }, [repositories]);
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Header with gradient */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4">
        <h2 className="text-xl font-bold text-white flex items-center">
          <BookIcon size={20} className="mr-2" />
          Repository Statistics
        </h2>
      </div>

      {/* Stats section */}
      <div className="p-5">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          <StatBox
            value={stats.totalRepos}
            label="Repositories"
            icon={<BookIcon size={18} />}
            bgColor="bg-blue-50"
            textColor="text-blue-700"
          />
          <StatBox
            value={stats.totalStars}
            label="Total Stars"
            icon={<StarIcon size={18} />}
            bgColor="bg-yellow-50"
            textColor="text-yellow-700"
          />
          <StatBox
            value={stats.totalForks}
            label="Total Forks"
            icon={<GitForkIcon size={18} />}
            bgColor="bg-green-50"
            textColor="text-green-700"
          />
        </div>

        {/* Additional stats */}
        <div className="mt-4 border-gray-100 pt-4">
          <h3 className="text-sm font-medium text-gray-600 uppercase tracking-wider mb-3">
            Additional Insight
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Average Stars Per Repo</span>
              <span className="font-medium text-gray-500">
                {stats.avgStarsPerRepo}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Most Starred Repository</span>
              <a
                href={stats.mostStarredRepo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-blue-600 hover:text-blue-800"
              >
                <span className="font-medium mr-1">
                  {stats.mostStarredRepo.name}
                </span>
                <span className="flex items-center text-yellow-600 text-sm">
                  <StarIcon size={14} className="mr-1" />
                  {stats.mostStarredRepo.stargazers_count}
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepoStats;
