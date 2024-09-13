import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {IContact, IMessage} from "../types";
import {cookieManager} from "../context/AuthContext.tsx";


export const chattyApi = createApi({
    reducerPath: 'chattyApi',
    tagTypes: ['auth', 'users', 'contact', 'messages'],
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_APP_BACKEND_HOST,
        prepareHeaders: (headers: Headers) => {
            const token = cookieManager.get('chatty_user_token');
            if (!headers.has('Authorization') && token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => {
        return {
            loginInUser: builder.mutation({
                query: (userCredentials: { userName: string; password: string }) => ({
                    url: `auth/signin`,
                    method: 'POST',
                    body: userCredentials,
                }),
                transformResponse: (response: { data: any }) => response.data,
                invalidatesTags: ['auth'],
            }),
            registerUser: builder.mutation({
                query: (user: any) => ({
                    url: `auth/signup`,
                    method: 'POST',
                    body: { ...user },
                }),
                transformResponse: (response: { data: any }) => response.data,
                invalidatesTags: ['auth'],
            }),
            logoutUser: builder.mutation({
                query: () => ({
                    url: `auth/logout`,
                    method: 'POST',
                }),
                invalidatesTags: ['auth'],
            }),
            getUserContacts: builder.query({
                query: (userId : string) => ({
                    url: `contacts/list/${userId}`,
                    method: 'GET',
                }),
                transformResponse: (response: { data: any }) => response.data,
                providesTags: ['contact'],
            }),
            getUserContact: builder.query({
                query: (contactId : string) => ({
                    url: `contacts/${contactId}`,
                    method: 'GET',
                }),
                transformResponse: (response: { data: any }) => response.data,
                providesTags: ['contact'],
            }),
            addContact: builder.mutation({
                query: (contact: Partial<IContact>) => ({
                    url: `contacts`,
                    method: 'POST',
                    body: {...contact}
                }),
                invalidatesTags: ['contact'],
            }),
            updateContact: builder.mutation({
                query: ({contactUpdate, contactId}:{contactUpdate: Partial<IContact>; contactId: string}) => ({
                    url: `contacts/${contactId}`,
                    method: 'PUT',
                    body: {...contactUpdate}
                }),
                invalidatesTags: ['contact'],
            }),
            getContactLastMessage: builder.query({
                query: ({userId, contactId}:{userId: string; contactId: string} ) => ({
                    url: `messages/contact/${userId}/${contactId}`,
                    method: 'GET'
                }),
                transformResponse: (response: { data: any }) => response.data,
                providesTags: ['messages'],
            }),
            getUserContactMessages: builder.query({
                query: ({userId, contactId}:{userId: string; contactId: string} ) => ({
                    url: `messages/list/${userId}/${contactId}`,
                    method: 'GET'
                }),
                transformResponse: (response: { data: any }) => response.data,
                providesTags: ['messages'],
            }),
            updateMessage: builder.mutation({
                query: (message: IMessage) => ({
                    url: `messages/${message.id}`,
                    method: 'PUT',
                    body: {...message}
                }),
                invalidatesTags: ['messages'],
            }),
        };
    },
});

export const {
    useLoginInUserMutation,
    useRegisterUserMutation,
    useLogoutUserMutation,
    useGetUserContactsQuery,
    useGetUserContactQuery,
    useGetContactLastMessageQuery,
    useAddContactMutation,
    useUpdateContactMutation,
    useGetUserContactMessagesQuery,
    useUpdateMessageMutation
} = chattyApi;

export const { endpoints, reducerPath, reducer, middleware } = chattyApi;
