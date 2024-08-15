import { GifItem } from './GifItem';

export const GifGrid: React.FC<{ gifs: GiphyGif[] }> = ({ gifs }) => (
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {gifs.map((gif) => (
      <GifItem key={gif.id} gif={gif} />
    ))}
  </div>
);
