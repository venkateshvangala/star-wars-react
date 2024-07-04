import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllStars = createAsyncThunk("fetchAllStars", async () => {
  const result = await axios({
    url: "http://localhost:8080/api/xapi",
    method: "post",
    data: {
      query: `
      query FetchAllStars {
        fetchAllStars {
          name
          url
        }
      }`,
    },
  });
  return result?.data?.data?.fetchAllStars;
});

export const fetchStarById = createAsyncThunk(
  "fetchStarById",
  async (id: any) => {
    const result = await axios({
      url: "http://localhost:8080/api/xapi",
      method: "post",
      data: {
        query: `
              query FetchStartById($fetchStartByIdId: Int! = ${id}) {
          fetchStartById(id: $fetchStartByIdId) {
            birth_year
            height
            name
          }
        }`,
      },
    });
    return result?.data?.data?.fetchStartById;
  }
);

export const appSlice = createSlice({
  name: "starwars",
  initialState: {
    starwars: [],
    selectedStar: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllStars.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllStars.fulfilled, (state, action) => {
      state.loading = false;
      state.starwars = action.payload;
      state.selectedStar = null;
    });
    builder.addCase(fetchAllStars.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(fetchStarById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchStarById.fulfilled, (state, action) => {
      state.loading = false;
      state.selectedStar = action.payload;
    });
    builder.addCase(fetchStarById.rejected, (state, action) => {
      state.loading = false;
    });
  },
  reducers: {},
});

export default appSlice.reducer;
