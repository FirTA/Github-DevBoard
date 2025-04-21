import { Loader } from "lucide-react";

const LoadingOverlay = () => {
  return (
    <div className="inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg flex items-center space-x-4">
        <Loader size={32} className="animate-spin text-blue-600" />
        <div>
          <h3 className="text-lg font-medium text-gray-900">Loading</h3>
          <p className="text-sm text-gray-500">
            Please wait while we fetch the data...
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingOverlay;
