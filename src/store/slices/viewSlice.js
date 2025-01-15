import { createSlice } from '@reduxjs/toolkit';

const viewSlice = createSlice({
  name: 'view',
  initialState: {
    isGridView: false
  },
  reducers: {
    toggleView: (state) => {
      state.isGridView = !state.isGridView;
    }
  }
});

export const { toggleView } = viewSlice.actions;
export default viewSlice.reducer; 