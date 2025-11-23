import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import appConfig from "../../components/partials/Config";

export const fetchDashboard = createAsyncThunk("dashboard/fetch", async () => {
  const token = localStorage.getItem("token");
  const res = await axios.get(`${appConfig.API_URL}/dashboard`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
});

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: { stats: {}, loading: false },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboard.pending, (state) => { state.loading = true; })
      .addCase(fetchDashboard.fulfilled, (state, action) => {
        state.stats = action.payload;
        state.loading = false;
      })
      .addCase(fetchDashboard.rejected, (state) => { state.loading = false; });
  },
});

export default dashboardSlice.reducer;
