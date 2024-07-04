import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllPlanets = createAsyncThunk("fetchAllPlanets", async () => {
  const result = await axios({
    url: "http://localhost:8080/api/xapi",
    method: "post",
    data: {
      query: `
      query fetchAllPlanets {
        fetchAllPlanets {
          name
          url
        }
      }`,
    },
  });
  return result?.data?.data?.fetchAllPlanets;
});

export const fetchPlanetById = createAsyncThunk(
  "fetchPlanetById",
  async (id: any) => {
    const result = await axios({
      url: "http://localhost:8080/api/xapi",
      method: "post",
      data: {
        query: `
              query FetchPlanetById($fetchPlanetByIdId: Int! = ${id}) {
  fetchPlanetById(id: $fetchPlanetByIdId) {
    climate
    name
    terrain
  }
}`,
      },
    });
    return result?.data?.data?.fetchPlanetById;
  }
);

export const palnentSlice = createSlice({
  name: "planets",
  initialState: {
    planets: [],
    selectedPlanet: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllPlanets.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllPlanets.fulfilled, (state, action) => {
      state.loading = false;
      state.planets = action.payload;
      state.selectedPlanet = null;
    });
    builder.addCase(fetchAllPlanets.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(fetchPlanetById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPlanetById.fulfilled, (state, action) => {
      state.loading = false;
      state.selectedPlanet = action.payload;
    });
    builder.addCase(fetchPlanetById.rejected, (state, action) => {
      state.loading = false;
    });
  },
  reducers: {},
});

export default palnentSlice.reducer;
