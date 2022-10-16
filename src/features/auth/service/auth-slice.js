import { createSlice } from '@reduxjs/toolkit';
import { loadTokenState } from '../../../utils/local-storage';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: loadTokenState(),
        user: ""
    },
    reducers: {
        setToken: (state, { payload }) => {
            state.token = payload
            return state
        },

        setUser: (state, { payload }) => {
            state.user = payload
            return state
        }
    },
});

export const { setToken, setUser } = authSlice.actions;
export default authSlice.reducer;