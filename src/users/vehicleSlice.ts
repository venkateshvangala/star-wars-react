import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllVehicles = createAsyncThunk(
  "fetchAllVehicles",
  async () => {
    const result = await axios({
      url: "http://localhost:8080/api/xapi",
      method: "post",
      data: {
        query: `query FetchAllVehicles {
  fetchAllVehicles {
    name
    url
  }
}`,
      },
    });
    return result?.data?.data?.fetchAllVehicles;
  }
);

export const fetchAllVehiclesById = createAsyncThunk(
  "fetchAllVehiclesById",
  async (id: any) => {
    const result = await axios({
      url: "http://localhost:8080/api/xapi",
      method: "post",
      data: {
        query: `query FetchAllVehicles($fetchVehiclesByIdId: Int! = ${id}) {
  fetchVehiclesById(id: $fetchVehiclesByIdId) {
    cost_in_credits
    model
    name
    vehicle_class
  }
}`,
      },
    });
    return result?.data?.data?.fetchVehiclesById;
  }
);

export const vehicleSlice = createSlice({
  name: "vehicle",
  initialState: {
    vehicles: [],
    selectedVehicle: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllVehicles.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllVehicles.fulfilled, (state, action) => {
      state.loading = false;
      state.vehicles = action.payload;
      state.selectedVehicle = null;
    });
    builder.addCase(fetchAllVehicles.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(fetchAllVehiclesById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllVehiclesById.fulfilled, (state, action) => {
      state.loading = false;
      state.selectedVehicle = action.payload;
    });
    builder.addCase(fetchAllVehiclesById.rejected, (state, action) => {
      state.loading = false;
    });
  },
  reducers: {},
});

export default vehicleSlice.reducer;
