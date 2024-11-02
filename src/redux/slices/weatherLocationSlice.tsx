import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const GetLocationWeather = createAsyncThunk(
    "weather/GetLocationWeather",

    async ({ city }: { city: string }) => {
        try {
            const response = await axios.get(
                `https://api.weatherapi.com/v1/forecast.json?key=a3fbe1fec67b4a4dab2130608242910&q=${city}&days=7`
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
