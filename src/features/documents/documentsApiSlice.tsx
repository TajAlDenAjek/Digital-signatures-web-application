import { apiSlice } from "../../app/api/apiSlice";


// logic on auth route (register,login,logout)

export const documentsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getDocuments : builder.query({
            query: ()=>({
                url:'/admin/getAllDocuments',
                method:'GET'
            }),
            transformResponse(baseQueryReturnValue, meta, arg) {
                return baseQueryReturnValue?.data ;
            },
        }),
        
    })
})


export const {
    useGetDocumentsQuery

} = documentsApiSlice