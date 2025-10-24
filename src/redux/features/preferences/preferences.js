import { createSlice } from '@reduxjs/toolkit'

const preferencesSlice = createSlice({
  name: 'preferences',
  initialState: {
    darkMode: false,
  },
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
  },
});

export const { toggleDarkMode } = preferencesSlice.actions;
export default preferencesSlice.reducer;
