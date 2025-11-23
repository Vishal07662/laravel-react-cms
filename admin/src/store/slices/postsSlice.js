import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import postService from "../../services/Post";


export const fetchPosts = createAsyncThunk("posts/fetchAll", async () => {
  const res = await postService.getAll();
  return res;
});

export const deletePost = createAsyncThunk("posts/delete", async (id) => {
  await postService.delete(id);
  return id;
});

export const createPost = createAsyncThunk("posts/create", async (data) => {
  const res = await postService.create(data);
  return res;
});

export const updatePost = createAsyncThunk("posts/update", async ({ id, data }) => {
  const res = await postService.update(id, data);
  return res;
  });

export const togglePostPublish = createAsyncThunk("posts/togglePublish", async (id) => {
  const res = await postService.togglePublish(id);
  return res;
});

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.items = state.items.filter((p) => p.id !== action.payload);
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.items = state.items.map((p) =>
          p.id === action.payload.id ? action.payload : p
        );
      })
      .addCase(togglePostPublish.fulfilled, (state, action) => {
        const index = state.items.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        state.loading = false;
      })
      .addCase(togglePostPublish.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(togglePostPublish.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default postsSlice.reducer;
