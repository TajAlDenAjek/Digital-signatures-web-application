import { apiSlice } from "../../app/api/apiSlice";


// logic on auth route (register,login,logout)

export const conractsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getContracts: builder.query({
            query: () => ({
                url: '/admin/getAllContracts',
                method: 'GET'
            }),
            providesTags: ['Contracts']
        }),
        deleteContract: builder.mutation({
            query: id => {
                return {
                    url: `/admin/deleteContract/${id}`,
                    method: 'DELETE',
                };
            },
            invalidatesTags: ['Contracts']
        }),
        createContract: builder.mutation({
            query: data => {
                console.log('here')
                const BodyFormData=new FormData()
                BodyFormData.append('contract',data?.contract?.file?.originFileObj)
                BodyFormData.append('contractName',data?.contractName)
                BodyFormData.append('description',data?.description)
                // BodyFormData.append('contract', data?.contract);
                return {
                    url: `/admin/addContract`,
                    method: 'POST',
                    body: BodyFormData,
                    formData: true,
                };
            },
            invalidatesTags: ['Contracts']
        }),
    })
})


export const {
    useGetContractsQuery,
    useDeleteContractMutation,
    useCreateContractMutation

} = conractsApiSlice