import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllFilms = createAsyncThunk("fetchAllFilms", async () => {
  const result = await axios({
    url: "http://localhost:8080/api/xapi",
    method: "post",
    data: {
      query: `
      query FetchAllFilms {
          fetchAllFilms {
            title
            url
          }
        }`,
    },
  });
  return result?.data?.data?.fetchAllFilms;
});

export const fetchFilmsById = createAsyncThunk(
  "fetchFilmsById",
  async (id: any) => {
    const result = await axios({
      url: "http://localhost:8080/api/xapi",
      method: "post",
      data: {
        query: `
              query FetchFilmById($fetchFilmByIdId: Int! = ${id}) {
  fetchFilmById(id: $fetchFilmByIdId) {
    episode_id
    title
  }
}`,
      },
    });
    return result?.data?.data?.fetchFilmById;
  }
);

export const filmsSlice = createSlice({
  name: "films",
  initialState: {
    films: [],
    selectedFilm: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllFilms.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllFilms.fulfilled, (state, action) => {
      state.loading = false;
      state.films = action.payload;
      state.selectedFilm = null;
    });
    builder.addCase(fetchAllFilms.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(fetchFilmsById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchFilmsById.fulfilled, (state, action) => {
      state.loading = false;
      state.selectedFilm = action.payload;
    });
    builder.addCase(fetchFilmsById.rejected, (state, action) => {
      state.loading = false;
    });
  },
  reducers: {},
});

export default filmsSlice.reducer;
