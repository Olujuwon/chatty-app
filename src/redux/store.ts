import {configureStore} from '@reduxjs/toolkit';
import {chattyApi} from './chatty.ts';

export const store = configureStore({
    reducer: {
        [chattyApi.reducerPath]: chattyApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(chattyApi.middleware),
});

