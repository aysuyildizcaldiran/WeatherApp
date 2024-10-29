import { configureStore } from "@reduxjs/toolkit";
import  weatherReducer  from "./slices/weatherDaySlice";


export const store=configureStore({
               reducer: {
                              weather: weatherReducer
               },
})