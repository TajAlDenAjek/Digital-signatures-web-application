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


const documentsSlice = createSlice({
    name: 'users',
    initialState: intiState,
    reducers: {
     
    }
})


// export const { } = usersSlice.actions
export default documentsSlice.reducer
