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
        getMyDocuments: builder.query({
            query: ()=>({
                url:'/user/getUserDocuments',
                method:'GET'
            }),
            transformResponse(baseQueryReturnValue, meta, arg) {
                return baseQueryReturnValue?.data ;
            },
        }),
        uploadUserData: builder.mutation({
            query:(values)=>{
                const data = new FormData() ;
                data.append('image_backSide', values?.back?.file?.originFileObj);
                data.append('image_frontSide' , values?.front?.file?.originFileObj) ;
                data.append('nationalNumber' , values?.nationalNumber) ;
                data.append('fullName' , values?.fullName) ;
                console.log(data);
                return {
                    url:'/C_Orders/uploadUserData',
                    method:'POST',
                    body:data,
                    formData:true 
                }
            }
        }),
        getDocumentById: builder.query({
            query:()=>({
                url:'document',
                method:'GET',
            })
        }),
        storeDocument: builder.mutation({
            query: (values )=> {
                const data = new FormData() ;
                data.append('emails' , values.emails ) ; 
                data.append('document' , values?.document?.file?.originFileObj);
                data.append('signature' , values.signature) ;
                return {
                    url:'/v2/document/',
                    method:'POST',
                    body: data , 
                    formData: true 
                }
            }
        })
        
    })
})


export const {
    useGetDocumentsQuery,
    useGetMyDocumentsQuery,
    useUploadUserDataMutation,
    useGetDocumentByIdQuery,
    useStoreDocumentMutation

} = documentsApiSlice