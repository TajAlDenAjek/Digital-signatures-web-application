import React from 'react'
import CrudTable from '../../components/CrudTable'
import { adminsColumns } from '../../constants/columns'
import { fakeAdminsDataSource } from '../../constants/fake'
// import { useGetAllAdminsQuery } from '../../features/goverment-official/govermentOfficialsApiSlice'

const DigitalCertficatesRequestsAdmin=()=> {
//   const {data: Admins  , isLoading} = useGetAllAdminsQuery({});

  return (
    <>
      
      <CrudTable
          columns={adminsColumns}
          dataSource={[]}
          route='/goverment-officiers'
          defaultActions={['view','edit','delete']}
      />
    </>
  )
}

export default DigitalCertficatesRequestsAdmin