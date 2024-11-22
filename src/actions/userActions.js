import axios from "axios";

export const ActionTypes = {
  FETCH_ITEMS: "FETCH_ITEMS",
  FETCH_ITEM: "FETCH_ITEM",
  CREATE_ITEM: "CREATE_ITEM",
  EDIT_ITEM: "EDIT_ITEM",
  DELETE_ITEM: "DELETE_ITEM",
  ADD_CART: 'ADD_CART',
};

const apiUrl = "https://fakestoreapi.com/products";

export function AddCart(payload){
  return {
      type:'ADD_CART',
      payload
  }
}

export const fetchItems = () => async (dispatch) => {
  const response = await axios.get(apiUrl);
  dispatch({ type: ActionTypes.FETCH_ITEMS, payload: response.data });
};

export const fetchItem = (itemId) => async (dispatch) => {
  const response = await axios.get(`${apiUrl}/${itemId}`);
  dispatch({ type: ActionTypes.FETCH_ITEM, payload: response.data });
};

export const createItem = (item) => async (dispatch) => {
  try {
    const response = await axios.post(apiUrl, item);
    dispatch({ type: ActionTypes.CREATE_ITEM, payload: response.data });
    return { success: true };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const editItem = (item) => async (dispatch) => {
  try {
    const response = await axios.put(`${apiUrl}/${item.id}`, item);
    dispatch({ type: ActionTypes.EDIT_ITEM, payload: response.data });
    return { success: true };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const deleteItem = (itemId) => async (dispatch) => {
  await axios.delete(`${apiUrl}/${itemId}`);
  dispatch({ type: ActionTypes.DELETE_ITEM, payload: itemId });
};