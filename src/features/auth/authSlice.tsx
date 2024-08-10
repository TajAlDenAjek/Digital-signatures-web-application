import { RootState } from '../../app/store'
import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie';
export type Permissions = "admin" | "governmentOfficer" |  "user"

// type of user state information
export type User = {
    id: number | null,
    firstName: string | null,
    middleName:string|null,
    lastName:string|null
    permission: Permissions | null,
    token: string | null | any
}
// intial State when the app starts
let intiState: User = {
    id: null,
    firstName: null,
    middleName:null,
    lastName:null,
    permission: null,
    token:null
}

// get localstoragestate
intiState = { ...JSON.parse(Cookies.get('digital_signature_website_cookie') || '{}') as User }


const authSlice = createSlice({
    name: 'auth',
    initialState: intiState,
    reducers: {
        setCredentials: (state, action) => {
            const { data,token } = action.payload
            console.log(action.payload)
            const user={
                token,id:data?.id,
                firstName:data?.firstName,
                middleName:data?.middleName,
                lastName:data?.lastName,
                permission:data?.role
            }
            Cookies.set('digital_signature_website_cookie', JSON.stringify(user), {  secure: true });
            state.id = user?.id;
            state.firstName = data?.firstName;
            state.middleName = data?.middleName;
            state.lastName = data?.lastName;
            state.permission = data?.permission;
            state.token = token
        },
        logOut: (state) => {
            Cookies.remove('digital_signature_website_cookie')
            state.id = null
            state.firstName = null
            state.middleName = null
            state.lastName = null
            state.permission = null
            state.token = null
        },
    }
})


export const { setCredentials, logOut } = authSlice.actions
export default authSlice.reducer


//getters
export const selectCurrentId = (state: RootState) => state.auth.id
export const selectCurrentUserName = (state: RootState) => state.auth.firstName
export const selectCurrentPermission = (state: RootState) => state.auth.permission
export const selectCurrentToken = (state: RootState) => state.auth.token