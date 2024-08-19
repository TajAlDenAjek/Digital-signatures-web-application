import { apiSlice } from "../../app/api/apiSlice";


// logic on auth route (register,login,logout)

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        register: builder.mutation({
            query: data => ({
                url: '/user/register',
                method: 'POST',
                body: { ...data },
            })
        }),
        login: builder.mutation({
            query: data => ({
                url: '/user/login',
                method: 'POST',
                body: { ...data },
            }),
            invalidatesTags: ['auth','Users','Admins','Documents','Contracts','Digital-certficate-requests','Portals']
        }),
        logout: builder.mutation({
            query: () => ({
                url: '/auth/logout',
                method: 'GET',
            })
        })
    })
})


export const {
    useRegisterMutation,
    useLoginMutation,
    useLogoutMutation,
} = authApiSlice