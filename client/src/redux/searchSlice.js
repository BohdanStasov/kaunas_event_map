import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const searchPins = createAsyncThunk('searchPins', async (query) => {
    const response = await axios.get(`api/pins/search?query=${query}`);
    return response.data;
});

export const searchUsers = createAsyncThunk('searchUsers', async (query) => {
    const response = await axios.get(`api/users/search?query=${query}`);
    return response.data;
});

const searchSlice = createSlice({
    name: 'search',
    initialState: [],
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(searchPins.fulfilled, (state, action) => {
            return action.payload;
        })
        .addCase(searchUsers.fulfilled, (state, action) => {
            return action.payload;
        })
    },
});

export default searchSlice.reducer;
