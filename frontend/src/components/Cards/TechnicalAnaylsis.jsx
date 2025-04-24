import React, { useMemo } from "react";
import { CodeIcon, GitBranchIcon } from "lucide-react";
const TechnicalAnaylsis = ({ repositories }) => {
  const skillAnalysis = useMemo(() => {
    if (!repositories.length) return null;

    const languages = {};
    let totalSize = 0;
    repositories.forEach((repo) => {
      if (repo.language)
        languages[repo.language] =
          (languages[repo.language] || 0) + (repo.size || 0);
      totalSize += repo.size || 0;
    });

    const languageStats = Object.entries(languages)
      .map(([name, size]) => ({
        name,
        percentage: Math.round((size / totalSize) * 100),
        level:
          size > totalSize / 3
            ? "Expert"
            : size > totalSize / 6
            ? "intermediate"
            : "Beginner",
      }))
      .sort((a, b) => b.percentage - a.percentage)
      .slice(0, 8);
    console.log("Languages Stats: ", languageStats);
    const topics = new Set();
    repositories.forEach((repo) => {
      if (repo.topics) repo.topics.forEach((topic) => topics.add(topic));
    });
    return {
      languages: languageStats,
      topics: Array.from(topics).slice(0, 8),
    };
  }, [repositories]);

  if (!skillAnalysis) return null;
  const levelColors = {
    Expert: "bg-green-100 text-green-800 border-green-200",
    Intermediate: "bg-blue-100 text-blue-800 border-blue-200",
    Beginner: "bg-gray-100 text-gray-800 border-gray-200",
  };
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-6 flex items-center">
        <CodeIcon size={20} className="mr-2" />
        Technical Skill Analysis
      </h2>
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Primary Languages</h3>
        <div className="space-y-4">
          {skillAnalysis.languages.map((lang) => (
            <div key={lang.name} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-800 font-medium">{lang.name}</span>
                <span
                  className={`text-sm px-2 py-1 rounded-full border ${
                    levelColors[lang.level]
                  }`}
                >
                  {lang.level}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="h-2 rounded-full bg-blue-500"
                  style={{
                    width: `${lang.percentage}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      {skillAnalysis.topics.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <GitBranchIcon size={18} className="mr-2" />
            Technologies & Frameworks
          </h3>
          <div className="flex flex-wrap gap-2">
            {skillAnalysis.topics.map((topic) => (
              <span
                key={topic}
                className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm border border-gray-200"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TechnicalAnaylsis;
