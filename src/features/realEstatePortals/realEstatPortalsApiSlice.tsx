import { apiSlice } from "../../app/api/apiSlice";



export const portalsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAdminPortals: builder.query({
            query: () => ({
                url: '/admin/getAllPortalRequests',
                method: 'GET'
            }),
            providesTags: ['Portals']
        }),
        getUserPortals: builder.query({
            query: () => ({
                url: '/user/getUserPortalRequests',
                method: 'GET'
            }),
            providesTags: ['Portals']
        }),
        getGovernmentPortals: builder.query({
            query: () => ({
                url: '/government/getGovPortalRequests',
                method: 'GET'
            }),
            providesTags: ['Portals']
        }),
        deletePortal: builder.mutation({
            query: id => {
                return {
                    url: `/admin/deletePortalRequest/${id}`,
                    method: 'DELETE',
                };
            },
            invalidatesTags: ['Portals']
        }),
        createPortal: builder.mutation({
            query: data => {
                // console.log('here')
                const BodyFormData=new FormData()
                BodyFormData.append('contract',data?.contract?.file?.originFileObj)
                BodyFormData.append('contractName',data?.contractName)
                BodyFormData.append('description',data?.description)
                // BodyFormData.append('contract', data?.contract);
                return {
                    url: `/user/getUserPortalRequests`,
                    method: 'POST',
                    body: BodyFormData,
                    formData: true,
                };
            },
            invalidatesTags: ['Portals']
        }),
        governmentUpdatePortal: builder.mutation({
            query: data => {
                console.log('here')
                const BodyFormData=new FormData()
                BodyFormData.append('contract',data?.contract?.file?.originFileObj)
                BodyFormData.append('contractName',data?.contractName)
                BodyFormData.append('description',data?.description)
                // BodyFormData.append('contract', data?.contract);
                return {
                    url: `/government/processPortalRequest/${data?.id}`,
                    method: 'PUT',
                    body: BodyFormData,
                    formData: true,
                };
            },
            invalidatesTags: ['Portals']
        }),
        adminUpdatePorta: builder.mutation({
            query: data => {
                console.log('here')
                const BodyFormData=new FormData()
                BodyFormData.append('contract',data?.contract?.file?.originFileObj)
                BodyFormData.append('contractName',data?.contractName)
                BodyFormData.append('description',data?.description)
                // BodyFormData.append('contract', data?.contract);
                return {
                    url: `/admin/checkPortalRequest/${data?.id}`,
                    method: 'PUT',
                    body: BodyFormData,
                    formData: true,
                };
            },
            invalidatesTags: ['Portals']
        }),

    })
})


export const {
    useGetAdminPortalsQuery,
    useGetUserPortalsQuery,
    useGetGovernmentPortalsQuery,
    useDeletePortalMutation,
    useCreatePortalMutation

} = portalsApiSlice