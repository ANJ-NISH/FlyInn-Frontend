import { createSlice } from "@reduxjs/toolkit";


const initialState={
    name: "",
    email: "",
    avatar: "",
};


const basicinfoSlice= createSlice({
    name: "basicinfo",
    initialState,
    reducers:{
      addinfo: (state, action)=>{
        state.name= action.payload.name;
        state.email=action.payload.email;
        state.avatar=action.payload.avatar;
      },
      removeinfo: (state)=>{
        state.name= "";
        state.email="";
        state.avatar="";
      },
    },
});

export const {addinfo, removeinfo}=basicinfoSlice.actions;

export default basicinfoSlice.reducer;