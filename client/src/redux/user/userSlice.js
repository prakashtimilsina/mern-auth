import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    currentUser: null,
    loading: false,
    errorMessage: null,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state)=>{
            state.loading = true;
        },
        signInSuccess: (state, action)=>{
            state.currentUser = action.payload;
            state.loading = false;
            state.errorMessage = '';
        },
        signInFailure:(state, action)=>{
            state.loading = false;
            state.errorMessage = action.payload;
        }
    }
});

export const { signInStart, signInSuccess, signInFailure } = userSlice.actions;

export default userSlice.reducer;