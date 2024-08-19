
import { apiSlice } from "../../app/api/apiSlice";


// logic on auth route (register,login,logout)

export const DigitalIdentityApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        createDigitalCertificate: builder.mutation({
            query: data=>({
                url:'/v2/C_Orders/createDigitalCertificate',
                method:'POST',
                body:data
            })
        })
        
    })
})


export const {
    useCreateDigitalCertificateMutation

} = DigitalIdentityApiSlice