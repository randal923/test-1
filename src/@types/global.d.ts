interface GiphyImage {
  height: string;
  width: string;
  size: string;
  url: string;
  mp4_size?: string;
  mp4?: string;
  webp_size?: string;
  webp?: string;
  frames?: string;
  hash?: string;
}

interface GiphyImages {
  original: GiphyImage;
  downsized: GiphyImage;
  downsized_large: GiphyImage;
  downsized_medium: GiphyImage;
  downsized_small: GiphyImage;
  downsized_still: GiphyImage;
  fixed_height: GiphyImage;
  fixed_height_downsampled: GiphyImage;
  fixed_height_small: GiphyImage;
  fixed_height_small_still: GiphyImage;
  fixed_height_still: GiphyImage;
  fixed_width: GiphyImage;
  fixed_width_downsampled: GiphyImage;
  fixed_width_small: GiphyImage;
  fixed_width_small_still: GiphyImage;
  fixed_width_still: GiphyImage;
  looping: {
    mp4_size: string;
    mp4: string;
  };
  original_still: GiphyImage;
  original_mp4: GiphyImage;
  preview: GiphyImage;
  preview_gif: GiphyImage;
  preview_webp: GiphyImage;
  "480w_still": GiphyImage;
}

interface GiphyAnalytics {
  onload: {
    url: string;
  };
  onclick: {
    url: string;
  };
  onsent: {
    url: string;
  };
}

interface GiphyGif {
  type: string;
  id: string;
  url: string;
  slug: string;
  bitly_gif_url: string;
  bitly_url: string;
  embed_url: string;
  username: string;
  source: string;
  title: string;
  rating: string;
  content_url: string;
  source_tld: string;
  source_post_url: string;
  is_sticker: number;
  import_datetime: string;
  trending_datetime: string;
  images: GiphyImages;
  analytics_response_payload: string;
  analytics: GiphyAnalytics;
  alt_text: string;
}
