export const LoadMoreButton: React.FC<{
  isVisible: boolean;
  isLoading: boolean;
  onClick: () => void;
}> = ({ isVisible, isLoading, onClick }) =>
  isVisible && (
    <button
      onClick={onClick}
      className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      disabled={isLoading}
    >
      {isLoading ? "Loading..." : "Load More"}
    </button>
  );
