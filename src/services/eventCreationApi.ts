import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { EventProps } from '@/types/event';

export const eventCreationApi = createApi({
  reducerPath: 'eventCreationApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
  tagTypes: ['Events'],
  endpoints: (builder) => ({
    events: builder.query<EventProps[], void>({
      query: () => '/api/league/1/events',
      providesTags: ['Events'],
    }),
    event: builder.query<EventProps, string>({
      query: (id) => `/api/league/1/event/${id}`,
      providesTags: ['Events'],
    }),
    addEvent: builder.mutation<string, unknown>({
      query: (event) => ({
        url: '/api/league/1/event',
        method: 'POST',
        body: event,
      }),
      invalidatesTags: ['Events'],
    }),
    deleteEvent: builder.mutation<void, string>({
      query: (id) => ({
        url: `/api/league/1/event/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Events'],
    }),
    updateEvent: builder.mutation<void, unknown>({
      query: ({ id, ...rest }) => ({
        url: `/api/league/1/event/${id}`,
        method: 'PUT',
        body: rest,
      }),
      invalidatesTags: ['Events'],
    }),
  }),
});

export const {
  useEventQuery,
  useEventsQuery,
  useAddEventMutation,
  useDeleteEventMutation,
  useUpdateEventMutation,
} = eventCreationApi;
