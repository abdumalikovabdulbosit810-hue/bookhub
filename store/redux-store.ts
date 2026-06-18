"use client";

import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

type UiState = {
  search: string;
  category: string;
  sort: string;
};

const uiSlice = createSlice({
  name: "ui",
  initialState: { search: "", category: "All", sort: "popular" } as UiState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
    setSort: (state, action: PayloadAction<string>) => {
      state.sort = action.payload;
    }
  }
});

export const { setSearch, setCategory, setSort } = uiSlice.actions;

export const reduxStore = configureStore({
  reducer: {
    ui: uiSlice.reducer
  }
});

export type RootState = ReturnType<typeof reduxStore.getState>;
export type AppDispatch = typeof reduxStore.dispatch;
