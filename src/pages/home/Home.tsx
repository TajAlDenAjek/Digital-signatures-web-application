import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { adminRoutes, governmentOfficerRoutes,userRoutes } from '../../routes/protected/ProtectedRoutes'
import { useSelector } from 'react-redux'
import { selectCurrentPermission } from '../../features/auth/authSlice'
import { Permissions } from '../../features/auth/authSlice'
import CrudTable from '../../components/CrudTable'
import { testColumns } from '../../constants/columns'
import { fakeTableDataSource } from '../../constants/fake'

const Home = () => {
  const navigate = useNavigate()
  const permission: Permissions | null = useSelector(selectCurrentPermission)
  const navigateTo = permission === 'admin' ? adminRoutes[0]?.path : permission === "governmentOfficer" ? governmentOfficerRoutes[0]?.path : userRoutes[0]?.path
  useEffect(() => {
    navigate(String(navigateTo))
  }, [])

  return (
    <div>
      {/* <h1>redirecting...</h1> */}
      <CrudTable
        columns={testColumns}
        dataSource={fakeTableDataSource}
        endpoint={'/api/product'}
        route={'/product'}
      ></CrudTable>
    </div>
  )
}

export default Home