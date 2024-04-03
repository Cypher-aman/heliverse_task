import { createTeam, fetchTeams, fetchTeamById } from '@/api/api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  teams: null,
  team: null,
  loading: false,
  error: null,
  errorMsg: null,
};

export const createTeamAsync = createAsyncThunk('team/createTeam', (name) => {
  return createTeam(name);
});

export const fetchTeamsAsync = createAsyncThunk('team/fetchTeams', () => {
  return fetchTeams();
});

export const fetchTeamByIdAsync = createAsyncThunk(
  'team/fetchTeamById',
  (teamId) => {
    return fetchTeamById(teamId);
  }
);

const teamSlice = createSlice({
  name: 'team',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(createTeamAsync.pending, (state) => {
      state.loading = true;
      state.error = false;
      state.errorMsg = null;
    });
    builder.addCase(createTeamAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.team = action.payload.data;
    });
    builder.addCase(createTeamAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.errorMsg = action.error.message;
    });

    builder.addCase(fetchTeamsAsync.pending, (state) => {
      state.loading = true;
      state.error = false;
      state.errorMsg = null;
    });
    builder.addCase(fetchTeamsAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.teams = action.payload.data;
    });
    builder.addCase(fetchTeamsAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.errorMsg = action.error.message;
    });
    builder.addCase(fetchTeamByIdAsync.pending, (state) => {
      state.loading = true;
      state.error = false;
      state.errorMsg = null;
    });
    builder.addCase(fetchTeamByIdAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.team = action.payload.data;
    });
    builder.addCase(fetchTeamByIdAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.errorMsg = action.error.message;
    });
  },
});

export default teamSlice.reducer;
