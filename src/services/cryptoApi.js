import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "https://api.coincap.io/v2";

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    // Fetch list of cryptocurrencies
    getCryptos: builder.query({
      query: () => "/assets",
    }),

    // Fetch details of a single cryptocurrency
    getCryptoDetails: builder.query({
      query: (coinId) => `/assets/${coinId}`,
    }),

    // Fetch historical price data for a specific cryptocurrency
    getCryptoHistory: builder.query({
      query: ({ coinId, interval = "d1" }) => {
        const end = Date.now(); // Current timestamp in milliseconds
        const start = end - 5 * 365 * 24 * 60 * 60 * 1000; // Five years back

        return `/assets/${coinId}/history?interval=${interval}&start=${start}&end=${end}`;
      },
    }),

    // Fetch global statistics
    getGlobalStats: builder.query({
      query: () => "/assets",
      transformResponse: (response) => {
        const totalMarketCap = response?.data.reduce((acc, coin) => acc + parseFloat(coin.marketCapUsd || 0), 0);
        const totalVolume24h = response?.data.reduce((acc, coin) => acc + parseFloat(coin.volumeUsd24Hr || 0), 0);
        const bitcoin = response?.data.find((coin) => coin.id === "bitcoin");
        const bitcoinDominance = bitcoin ? (parseFloat(bitcoin.marketCapUsd) / totalMarketCap) * 100 : null;

        return {
          totalCryptos: response?.data.length,
          totalMarketCap,
          totalVolume24h,
          bitcoinDominance,
        };
      },
    }),
  }),
});

export const {
  useGetCryptosQuery,
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
  useGetGlobalStatsQuery,
} = cryptoApi;
