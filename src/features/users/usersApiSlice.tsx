import { apiSlice } from "../../app/api/apiSlice";


// logic on auth route (register,login,logout)

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query({
            query: () => ({
                url: '/admin/getAllUsers',
                method: 'GET'
            }),
            providesTags: ['Users']
        }),
        getUserById: builder.mutation({
            query: ({ id }) => ({
                url: '/admin/users/' + id,
                method: 'GET',
            }),
            // providesTags: ['Users']
        }),
        deleteUser: builder.mutation({
            query: id => {
                return {
                    url: `/admin/deleteUser/${id}`,
                    method: 'DELETE',
                };
            },
            invalidatesTags: ['Users']
        }),
        blockUser: builder.mutation({
            query: data => {
                return {
                    url: `/admin/blockUser/${data?.id}`,
                    method: 'PUT',
                    body: data?.data,
                    formData: true,
                };
            },
            invalidatesTags: ['Users']
        }),
    })
})


export const {
    useGetUsersQuery,
    useDeleteUserMutation,
    useBlockUserMutation

} = usersApiSlice