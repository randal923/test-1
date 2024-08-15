export const config = {
  api: {
    giphy: {
      baseUrl: process.env.GIPHY_URL ?? "",
      apiKey: process.env.GIPHY_API_KEY ?? "",
    },
  },
};
