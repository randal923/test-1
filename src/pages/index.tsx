/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';

import debounce from 'lodash.debounce';
import { GifGrid } from 'src/components/GifGrid';
import { InitialMessage } from 'src/components/InitialMessage';
import { LoadingIndicator } from 'src/components/LoadingIndicator';
import { LoadMoreButton } from 'src/components/LoadMoreButton';
import { NoResultsMessage } from 'src/components/NoResultsMessage';
import { SearchForm } from 'src/components/SearchForm';
import { searchGifs } from 'src/data/searchGifs';

const LIMIT = 10;

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [gifs, setGifs] = useState<GiphyGif[]>([]);
  const [offset, setOffset] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [hasSearched, setHasSearched] = useState(false);

  const fetchGifs = useCallback(
    async (searchTerm: string, newOffset: number) => {
      if (!searchTerm) return;

      setIsLoading(true);
      setHasSearched(true);

      try {
        const response = await searchGifs({
          searchTerm,
          offSet: newOffset,
          limit: LIMIT,
        });

        setGifs((prevGifs) =>
          newOffset === 0 ? response.data : [...prevGifs, ...response.data]
        );

        setTotalCount(response.pagination.total_count);
      } catch (error) {
        console.error("Error searching GIFs", error);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const debouncedSearch = useCallback(
    debounce((searchTerm: string) => {
      setOffset(0);
      fetchGifs(searchTerm, 0);
    }, 300),
    [fetchGifs]
  );

  useEffect(() => {
    if (search) {
      debouncedSearch(search);
    } else {
      setGifs([]);
      setHasSearched(false);
    }
    return () => debouncedSearch.cancel();
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
      <SearchForm search={search} onSearchChange={handleSearchChange} />

      {isLoading && <LoadingIndicator />}
      {!isLoading && !hasSearched && <InitialMessage />}
      {!isLoading && hasSearched && gifs.length === 0 && <NoResultsMessage />}

      <GifGrid gifs={gifs} />

      <LoadMoreButton
        isVisible={gifs.length > 0 && gifs.length < totalCount}
        isLoading={isLoading}
        onClick={handleLoadMore}
      />
    </main>
  );
}
