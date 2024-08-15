export const SearchForm: React.FC<{
  search: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ search, onSearchChange }) => (
  <form className="mb-4" onSubmit={(e) => e.preventDefault()}>
    <input
      type="text"
      placeholder="Search for gifs"
      name="search"
      value={search}
      onChange={onSearchChange}
      className="p-2 border rounded mr-2"
    />
  </form>
);
