import { createSlice } from '@reduxjs/toolkit'


// type of user state information
export type govermentOfficial = {
    id: number | null,
    firstName: string | null,
    lastName:string|null
    email: string ;
    role: string ;
}
// intial State when the app starts
const intiState: govermentOfficial[]= [] ;


const govermentOfficialsSlice = createSlice({
    name: 'govermentOfficials',
    initialState: intiState,
    reducers: {
     
    }
})


// export const { } = usersSlice.actions
export default govermentOfficialsSlice.reducer
