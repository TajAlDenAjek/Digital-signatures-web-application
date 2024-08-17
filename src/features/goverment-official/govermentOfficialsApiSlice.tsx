import { apiSlice } from "../../app/api/apiSlice";


// logic on auth route (register,login,logout)

export const govermentOfficialsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAllAdmins: builder.query({
            query: ()=>({
                url:'/admin/getAllAdmins',
                method:'GET'
            })
        }),
    })
})


export const {
    useGetAllAdminsQuery
    
} = govermentOfficialsApiSlice