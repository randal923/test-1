export const config = {
  api: {
    giphy: {
      baseUrl: process.env.GIPHY_URL ?? "https://api.giphy.com/v1/gifs/search",
      apiKey: process.env.GIPHY_API_KEY ?? "pLURtkhVrUXr3KG25Gy5IvzziV5OrZGa",
    },
  },
};
