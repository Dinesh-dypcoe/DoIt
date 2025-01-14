import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  lists: [],
  activeList: null
};

const listSlice = createSlice({
  name: 'lists',
  initialState,
  reducers: {
    addList: (state, action) => {
      state.lists.push(action.payload);
    },
    removeList: (state, action) => {
      state.lists = state.lists.filter(list => list.id !== action.payload);
    },
    setActiveList: (state, action) => {
      state.activeList = action.payload;
    }
  }
});

export const { addList, removeList, setActiveList } = listSlice.actions;
export default listSlice.reducer; 