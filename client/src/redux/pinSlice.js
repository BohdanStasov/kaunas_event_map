import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPins = createAsyncThunk('pins/fetchPins', async () => {
    const response = await axios.get('/api/pins');
    return response.data;
});

export const fetchUserPins = createAsyncThunk('users/fetchUserPins', async (userId) => {
  const response = await axios.get(`api/users/userpins?userId=${userId}`);
  return response.data;
});

export const fetchUserPinsByUsername = createAsyncThunk('users/fetchUserPinsByUsername', async (username) => {
  const response = await axios.get(`api/pins?username=${username}`);
  return response.data;
});

export const acceptPin = createAsyncThunk('userPins/acceptPin', async (pinId) => {
  const response = await axios.put(`api/userPins/accept/${pinId}`);
  return response.data;
});

export const likePin = createAsyncThunk('pins/likePin', async (pinId) => {
  const response = await axios.put(`api/users/like/${pinId}`);
  console.log(response.data)
  return response.data;
});

export const dislikePin = createAsyncThunk('pins/dislikePin', async (pinId) => {
  const response = await axios.put(`api/users/dislike/${pinId}`);
  console.log(response.data)
  return response.data;
});

export const fetchSelectedPins = createAsyncThunk('pins/searchSearchedPins', async (id) => {
  const response = await axios.get(`api/pins/?query=${id.join(',')}`);
  return response.data;
});

export const fetchPinsByDate = createAsyncThunk('pins/fetchPinsByDate', async (date) => {
  const response = await axios.get(`api/pins?date=${date}`);
  return response.data;
});
  
const pinSlice = createSlice({
  name: 'pins',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPins.fulfilled, (state, action) => {
        return action.payload;
      })  
      .addCase(fetchUserPins.fulfilled, (state, action) => {
        return action.payload.filter((userpin) => userpin.userId === action.meta.arg);
      })  
      .addCase(fetchUserPinsByUsername.fulfilled, (state, action) => {
        return action.payload.filter((pin) => pin.username === action.meta.arg);
      }) 
      .addCase(fetchPinsByDate.fulfilled, (state, action) => {
        return action.payload.filter((pin) => pin.date === action.meta.arg);
      })  
      .addCase(fetchSelectedPins.fulfilled, (state, action) => {
        const searchedPins = action.meta.arg;
        return action.payload.filter((pin) => searchedPins.includes(pin._id));
      })
  },
});


export default pinSlice.reducer;