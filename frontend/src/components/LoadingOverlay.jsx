import { Loader } from "lucide-react";

const LoadingOverlay = () => {
  return (
    <div className="fixed inset-0 bg-black/10 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl flex items-center space-x-4 border border-gray-200 max-w-md mx-4">
        <div className="relative">
          <Loader size={32} className="animate-spin text-blue-600" />
          {/* Create a pulse effect around the spinner */}
          <div className="absolute inset-0 rounded-full bg-blue-100 animate-ping opacity-30"></div>
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-900">Loading data</h3>
          <p className="text-sm text-gray-500 mt-1">
            Fetching GitHub profile information...
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingOverlay;
