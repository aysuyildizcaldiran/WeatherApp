import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { WEATHER_API_KEY } from "../../theme";

export const GetLocationWeather = createAsyncThunk(
    "weather/GetLocationWeather",

    async ({ city }: { city: string }) => {
        try {
            const response = await axios.get(
                `https://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=${city}&days=7`
            );
            return response.data;  // Return the data instead of the full response
        } catch (error) {
            console.log("Axios error", error);
            throw error;
        }
    }
);



export const weatherDaySlice = createSlice({
    name: "weather",
    initialState: {
        weather: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(GetLocationWeather.pending, (state) => {
                state.loading = true;
            })
            .addCase(GetLocationWeather.fulfilled, (state, action) => {
                state.loading = false;
                state.weather = action.payload;
            })
            .addCase(GetLocationWeather.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            });
    }
});

export default weatherDaySlice.reducer;
