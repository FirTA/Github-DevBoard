import { BookIcon } from "lucide-react";
import React, { useMemo } from "react";

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
    return {
      totalForks,
      totalRepos,
      totalStars,
    };
  }, [repositories]);
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl mb-6 font-bold flex items-center">
        <BookIcon size={20} className="mr-2" />
        Repository Statistics
      </h2>
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-blue-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-blue-700">
            {stats.totalRepos}
          </div>
          <div className="text-sm text-gray-600">Repositories</div>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-yellow-700">
            {stats.totalStars}
          </div>
          <div className="text-sm text-gray-600">Total Stars</div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-green-700">
            {stats.totalForks}
          </div>
          <div className="text-sm text-gray-600">Total Forks</div>
        </div>
      </div>
    </div>
  );
};

export default RepoStats;
