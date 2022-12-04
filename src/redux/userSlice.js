// import { createSlice } from "@reduxjs/toolkit";

// const STATUSES = Object.freeze({
//     IDLE:"idle",
//     ERROR:"error",
//     LOADING:"loading",
// });

// const userSlice = createSlice({
//     name:"user",
//     initialState:{
//         data:[],
//         status:STATUSES.IDLE,
//     },

//     reducers : {
//         setUser(state,action){
//             state.data=action.payload;
//         },
//         setStatus(state,action){
//             state.status=action.payload;
//         },
//     },
// });

// export const {setUser,setStatus}=userSlice.actions;
// export default userSlice.reducer;


// export function fetchUser(){
//     return async function fetchUserThunk(dispatch,getState){
//         dispatch(setStatus(STATUSES.LOADING));
//         try{
//             const res = await fetch("https://jsonplaceholder.typicode.com/posts");
//             const data = await res.json();
//             dispatch(setUser(data));
//             dispatch(setStatus(STATUSES.IDLE));
//         } catch (err) {
//             console.log(err);
//             dispatch(setStatus(STATUSES.ERROR));
//         }
//     }
// }

import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  users: [],
  error: ''
}

// Generates pending, fulfilled and rejected action types
export const fetchUser = createAsyncThunk('user/fetchUsers', async () => {
  const response = await axios
        .get('https://jsonplaceholder.typicode.com/users')
    return response.data
})

const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchUser.pending, state => {
      state.loading = true
    })
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.loading = false
      state.users = action.payload
      state.error = ''
    })
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.loading = false
      state.users = []
      state.error = action.error.message
    })
  }
})

export default userSlice.reducer