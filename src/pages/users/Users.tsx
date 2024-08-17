import React from 'react'
import CrudTable from '../../components/CrudTable'
import { usersColumn } from '../../constants/columns'
import { fakeUsersDataSource } from '../../constants/fake'
type params = {
  type: string ;
}
function Users({type}:params ) {

  return (
    <CrudTable
        columns={usersColumn}
        dataSource={fakeUsersDataSource}
        endpoint="/api/users"
        route="/users"
    />
  )
}

export default Users