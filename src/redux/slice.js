import { createSlice } from '@reduxjs/toolkit';
import { listemploye } from './api'; // Import the async action

import * as API from "./api"

const APIs  =  [API.listemploye ,API.addemploye]

const employeeSlice = createSlice({
  name: 'Employee',
  initialState: {
    error: false,
    loading: false,
    data: [],
  },
  extraReducers: (builder) => {
    APIs.forEach((api) => {
        builder
        .addCase(api.pending, (state) => {
          state.loading = true;
          state.error = false;
        })
        .addCase(api.fulfilled, (state, action) => {
          state.loading = false;
          state.data = action.payload; // Assuming the response contains the list of employes
        })
        .addCase(api.rejected, (state, action) => {
          state.loading = false;
          state.error = true;
        });
    })
  
  },
});

// Export only the reducer
export default employeeSlice.reducer;
