import React from 'react'
import CrudTable from '../../components/CrudTable'
import { usersColumn } from '../../constants/columns'
import { useGetUsersQuery } from '../../features/users/usersApiSlice'
import { fakeUsersDataSource } from '../../constants/fake'
type params = {
  type: string ;
}
function Users({type}:params ) {
  const {data}=useGetUsersQuery({})
  return (
    <CrudTable
        columns={usersColumn}
        dataSource={fakeUsersDataSource}
        route="/users"
        defaultActions={['view','edit','delete']}
    />
  )
}

export default Users