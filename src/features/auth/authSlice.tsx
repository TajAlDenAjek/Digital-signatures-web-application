import { RootState } from '../../app/store'
import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie';
export type Permissions = "admin" | "governmentOfficial" |  "user"

// type of user state information
export type User = {
    id: number | null,
    firstName: string | null,
    middleName:string|null,
    lastName:string|null
    permission: Permissions | null,
    token: string | null | any,
    certificate : any 
}
// intial State when the app starts
let intiState: User = {
    id: null,
    firstName: null,
    middleName:null,
    lastName:null,
    permission: null,
    token:null,
    certificate:null 
}

intiState = { ...JSON.parse(Cookies.get('digital_signature_website_cookie') || '{}') as User }


// intiState = { ...JSON.parse(Cookies.get('digital_signature_website_cookie') || '{}') as User }
// if(localStorage.getItem('auth')!=null){
    // intiState = { ...JSON.parse(localStorage.getItem('auth') || '{}') as User }
// }

const authSlice = createSlice({
    name: 'auth',
    initialState: intiState,
    reducers: {
        setCredentials: (state, action) => {
            const { data,token } = action.payload
            const user={
                token,id:data?.id,
                firstName:data?.firstName,
                middleName:data?.middleName,
                lastName:data?.lastName,
                email:data?.email,
                permission:data?.role,
                certificate: data?.permission ,

            }
            state.id = user?.id;
            state.firstName = user?.firstName;
            state.middleName = user?.middleName;
            state.lastName = user?.lastName;
            state.email=user?.email
            state.permission = user?.permission;
            state.token = token
            state.certificate = user?.certificate ;
            
            
            // localStorage.setItem('auth',JSON.stringify(user))
            Cookies.set('digital_signature_website_cookie', JSON.stringify(user), {  secure: true });
            
        },
        logOut: (state) => {
            state.id = null
            state.firstName = null
            state.middleName = null
            state.lastName = null
            state.permission = null
            state.token = null
            // localStorage.removeItem('auth')
            Cookies.remove('digital_signature_website_cookie')
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
export const selectCurrentCert = (state: RootState) => state.auth.certificate ;
export const selectUserEmaali = (state: RootState) => state.auth.email ;