import React from 'react'
import CrudTable from '../../components/CrudTable'
import { adminsColumns } from '../../constants/columns'
import { fakeAdminsDataSource } from '../../constants/fake'
import { useGetAllAdminsQuery } from '../../features/goverment-official/govermentOfficialsApiSlice'
function GovermentOfficiers() {
  const {data}=useGetAllAdminsQuery({})
  return (
    <CrudTable
        columns={adminsColumns}
        dataSource={data?.data}
        endpoint='/api/goverment-offiicer'
        route='/goverment-officiers'
    />
  )
}

export default GovermentOfficiers