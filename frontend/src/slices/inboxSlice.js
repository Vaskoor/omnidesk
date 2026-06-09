import { createSlice } from '@reduxjs/toolkit';

const inboxSlice = createSlice({
  name: 'inbox',
  initialState: { conversations: [], currentMessages: [] },
  reducers: {
    setConversations: (state, action) => { state.conversations = action.payload; },
    addMessage: (state, action) => { state.currentMessages.push(action.payload); }
  }
});

export const { setConversations, addMessage } = inboxSlice.actions;
export default inboxSlice.reducer;
