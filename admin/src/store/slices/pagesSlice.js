import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import pageService from "../../services/Page";

// Async thunks
export const fetchPages = createAsyncThunk("pages/fetchAll", async () => {
  const res = await pageService.getAll();
  return res;
});

export const deletePage = createAsyncThunk("pages/delete", async (id) => {
  await pageService.delete(id);
  return id;
});

export const createPage = createAsyncThunk("pages/create", async (data) => {
  const res = await pageService.create(data);
  return res;
});

export const updatePage = createAsyncThunk("pages/update", async ({ id, data }) => {
  const res = await pageService.update(id, data);
  return res;
});

export const togglePagePublish = createAsyncThunk("pages/togglePublish", async (id) => {
  const res = await pageService.togglePublish(id);
  return res;
});

const pagesSlice = createSlice({
  name: "pages",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPages.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchPages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deletePage.fulfilled, (state, action) => {
        state.items = state.items.filter((p) => p.id !== action.payload);
      })
      .addCase(createPage.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(togglePagePublish.fulfilled, (state, action) => {
        const index = state.items.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        state.loading = false;
      })
      .addCase(togglePagePublish.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(togglePagePublish.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updatePage.fulfilled, (state, action) => {
        state.items = state.items.map((p) =>
          p.id === action.payload.id ? action.payload : p
        );
      });
  },
});

export default pagesSlice.reducer;
