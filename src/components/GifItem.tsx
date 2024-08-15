/* eslint-disable @next/next/no-img-element */

export const GifItem: React.FC<{ gif: GiphyGif }> = ({ gif }) => (
  <div className="h-[200px]">
    <img
      src={gif.images.preview_gif.url}
      alt={gif.title}
      className="w-full h-full object-contain"
    />
  </div>
);
