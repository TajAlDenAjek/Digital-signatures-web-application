import { apiSlice } from "../../app/api/apiSlice";


// logic on auth route (register,login,logout)

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query({
            query: ()=>({
                url:'/admin/getAllUsers',
                method:'GET'
            })
        }),
        getUserById: builder.mutation({
            query: ({id})=>({
                url:'/admin/users/'+id ,
                method:'GET',
            })
        })
    })
})


export const {
    useGetUsersQuery

} = usersApiSlice