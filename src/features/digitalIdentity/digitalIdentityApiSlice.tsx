
import { apiSlice } from "../../app/api/apiSlice";


// logic on auth route (register,login,logout)

export const DigitalIdentityApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        createDigitalCertificate: builder.mutation({
            query: data=>({
                url:'/v2/C_Orders/createDigitalCertificate',
                method:'POST',
                body:data
            }),
            invalidatesTags: ['Digital-certficate-requests']

        }),
        getDigitalCertificatesOrders: builder.query({
            query: () => ({
                url: '/C_Orders/getAllCertificateOrders',
                method: 'GET'
            }),
            providesTags: ['Digital-certficate-requests']
        }),
        updateStatus: builder.mutation({
            query: data=>({
                url:`/C_Orders/changeOrderStatus/${data.id}`,
                method:'POST',
                body:data?.data
            }),
            invalidatesTags: ['Digital-certficate-requests']

        }),
        
    }),
   
})


export const {
    useCreateDigitalCertificateMutation,
    useGetDigitalCertificatesOrdersQuery,
    useUpdateStatusMutation

} = DigitalIdentityApiSlice