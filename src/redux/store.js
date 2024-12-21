import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from './slice'; // Correctly import the reducer

const store = configureStore({
  reducer: {
    employee: employeeReducer, // Add the employee slice reducer to the store
  },
});

export default store;
