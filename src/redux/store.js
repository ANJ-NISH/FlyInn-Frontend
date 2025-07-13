import { configureStore } from '@reduxjs/toolkit';

import basicinfoReducer from './basicinfoSlice';

const store= configureStore({
    reducer:{
        basicinfo: basicinfoReducer,
    },
})


export default store;