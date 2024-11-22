import { api as index } from "..";

type getResponse = {
  forecast: {
    forecastday: {
      date: string;
      day: {
        avgtemp_c: number;
        condition: {
          text: string;
          icon: string;
        };
      };
      hour: {
        time: string;
        temp_c: number;
        condition: {
          text: string;
          icon: string;
        };
      }[];
    }[];
  };
};

type GetRequest = {
  query: string; // Город или местоположение
  days: number; // Количество дней прогноза (1, 3, 7, 14)
};

const api = index.injectEndpoints({
  endpoints: (build) => ({
    getForecast: build.query<getResponse, GetRequest>({
      query: ({ query, days }) => ({
        url: `/forecast.json`,
        method: "GET",
        params: {
          key: import.meta.env.VITE_API_KEY, // Используем ключ API из .env
          q: query, // Название города
          days, // Количество дней
        },
      }),
      providesTags: ["forecast"], // Для кэширования
    }),
  }),
});

export const { useGetForecastQuery } = api; // Генерация хука для использования в компонентах
