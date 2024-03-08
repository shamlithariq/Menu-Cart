import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
 
export const getMenuList = createAsyncThunk('menu/getMenuList', async ( ) => {
  try {
    const { data } = await axios.get(`https://run.mocky.io/v3/db0018c8-5982-4d89-a54f-f51fe14d3c89`);
    return data?.data[0]?.table_menu_list;
  } catch (error) {
    console.log(error);
  }
});