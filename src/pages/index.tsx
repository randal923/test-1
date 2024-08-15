/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';

import axios from 'axios';
import debounce from 'lodash.debounce';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [gifs, setGifs] = useState<GiphyGif[]>([]);
  const [offset, setOffset] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  const LIMIT = 10;

  const fetchGifs = useCallback(
    async (searchTerm: string, newOffset: number) => {
      if (searchTerm) {
        setIsLoading(true);

        try {
          const response = await axios.get(
            `https://api.giphy.com/v1/gifs/search`,
            {
              params: {
                api_key: "pLURtkhVrUXr3KG25Gy5IvzziV5OrZGa",
                q: searchTerm,
                limit: LIMIT,
                offset: newOffset,
                rating: "g",
                lang: "en",
              },
            }
          );

          if (newOffset === 0) {
            setGifs(response.data.data);
          } else {
            setGifs((prevGifs) => [...prevGifs, ...response.data.data]);
          }

          setTotalCount(response.data.pagination.total_count);
        } catch (error) {
          console.error("Error searching GIFs", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setGifs([]);
        setTotalCount(0);
      }
    },
    []
  );

  const debouncedSearch = useCallback(
    debounce((searchTerm) => {
      setOffset(0);
      fetchGifs(searchTerm, 0);
    }, 300),
    [fetchGifs]
  );

  useEffect(() => {
    debouncedSearch(search);

    return () => {
      debouncedSearch.cancel();
    };
  }, [search, debouncedSearch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleLoadMore = () => {
    const newOffset = offset + LIMIT;
    setOffset(newOffset);
    fetchGifs(search, newOffset);
  };

  return (
    <main className="p-4">
      <form className="mb-4" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Search for gifs"
          name="search"
          value={search}
          onChange={handleSearchChange}
          className="p-2 border rounded mr-2"
        />
      </form>

      {isLoading && <p>Loading...</p>}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {gifs.map((gif: any) => (
          <div key={gif.id} className="h-[200px] ">
            <img
              src={gif.images.preview_gif.url}
              alt={gif.title}
              className="w-full h-full object-contain"
            />
          </div>
        ))}
      </div>

      {gifs.length > 0 && gifs.length < totalCount && (
        <button
          onClick={handleLoadMore}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Load More"}
        </button>
      )}
    </main>
  );
}
