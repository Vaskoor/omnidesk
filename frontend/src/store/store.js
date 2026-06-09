import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import inboxReducer from '../slices/inboxSlice';
import publisherReducer from '../slices/publisherSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    inbox: inboxReducer,
    publisher: publisherReducer
  }
});
