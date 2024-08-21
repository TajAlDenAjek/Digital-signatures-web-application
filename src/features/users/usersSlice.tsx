import { createSlice } from '@reduxjs/toolkit'


// type of user state information
export type User = {
    id: number | null,
    firstName: string | null,
    middleName:string|null,
    lastName:string|null
    email: string ;
}
// intial State when the app starts
const intiState: User[]= [] ;


const usersSlice = createSlice({
    name: 'users',
    initialState: intiState,
    reducers: {
     
    }
})


// export const { } = usersSlice.actions
export default usersSlice.reducer
