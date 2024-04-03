import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUser } from '../../api/api';

const initialState = {
  users: null,
  totalPages: 0,
  loading: false,
  error: null,
  errorMsg: null,
};

export const fetchUserAsync = createAsyncThunk('user/fetchUser', (props) => {
  return fetchUser(props);
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchUserAsync.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchUserAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.totalPages = action.payload.data?.totalPages;
      state.users = action.payload.data?.users;
    });
    builder.addCase(fetchUserAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.errorMsg = action.error.message;
    });
  },
});

export default userSlice.reducer;
