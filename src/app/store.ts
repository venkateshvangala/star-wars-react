import { configureStore } from "@reduxjs/toolkit";
import starwars from "../users/appSlice";
import planets from "../users/planetSlice";
import films from "../users/filmsSlice";
import vehicle from "../users/vehicleSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    app: starwars,
    planets: planets,
    films: films,
    vehicle: vehicle,
  },
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
