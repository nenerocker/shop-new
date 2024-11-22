import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useState, useEffect } from "react";

const apiUrl = "https://fakestoreapi.com/products";



export const fetchItems = createAsyncThunk("items/fetchItems", async () => {
  const response = await axios.get(apiUrl);
  return response.data;
});

export const fetchItem = createAsyncThunk("items/fetchItem", async (itemId) => {
  const response = await axios.get(`${apiUrl}/${itemId}`);
  return response.data;
});

export const createItem = createAsyncThunk("items/createItem", async (item) => {
  const response = await axios.post(apiUrl, item);
  return response.data;
});

export const editItem = createAsyncThunk("items/editItem", async (item) => {
  const response = await axios.put(`${apiUrl}/${item.id}`, item);
  return response.data;
});

export const deleteItem = createAsyncThunk("items/deleteItem", async (itemId) => {
  await axios.delete(`${apiUrl}/${itemId}`);
  return itemId;
});
export const AddItem = createAsyncThunk("items/AddItem", async (item) => {
  const response = await axios.post(apiUrl, item);
  return response.data;
});



const itemSlice = createSlice({
  name: "item",
  initialState: {
    items: [],
    currentItem: null,
    loading: false,
    error: null,
  },
  
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
          state.error = null;
        },
      )
      .addMatcher(
        (action) => action.type.endsWith("/fulfilled"),
        (state, action) => {
          state.loading = false;
          if (action.type.includes("fetchItems")) {
            state.items = action.payload;
          } else if (action.type.includes("fetchItem")) {
            state.currentItem = action.payload;
          } else if (action.type.includes("createItem")) {
            state.items.push(action.payload);
          } else if (action.type.includes("editItem")) {
            const index = state.items.findIndex((item) => item.id === action.payload.id);
            if (index !== -1) {
              state.items[index] = action.payload;
            }
          } else if (action.type.includes("deleteItem")) {
            state.items = state.items.filter((item) => item.id !== action.payload);
          } else if (action.type.includes("AddItem")) {
            const index = state.items.findIndex((item) => item.id === action.payload.id);
            if (index !== -1) {
              state.items[index] = action.payload;
            }
          }
        },
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        },
      );
  },
});

export default itemSlice.reducer;