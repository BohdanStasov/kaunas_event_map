import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAllUserPins = createAsyncThunk('admin/fetchAllUserPins', async (userId) => {
  const response = await axios.get("api/users/userpins");
  return response.data;
});

export const acceptPin = createAsyncThunk('admin/acceptPin', async (pinId) => {
  const response = await axios.put(`api/admin/accept/${pinId}`);
  return response.data;
});

export const declinePin = createAsyncThunk('admin/declinePin', async (pinId) => {
  const response = await axios.put(`api/admin/decline/${pinId}`);
  return response.data;
});
 
const pinSlice = createSlice({
  name: 'userpins',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUserPins.fulfilled, (state, action) => {
        return action.payload;
      }) 
          
  },
});


export default pinSlice.reducer;