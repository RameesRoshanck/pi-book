import { createSlice} from '@reduxjs/toolkit'

const defaultUser=JSON.parse(localStorage.getItem('user'))

console.log(defaultUser,'dedff');

if(defaultUser){
    var{_id,username,email,profilePicture,status,coverPicture,followers,followings,createdAt}=defaultUser
}else{

}

const userSlice=createSlice({
    name:'user',
    initialState:{
        _id,
        username,
        email,
        profilePicture,
        status,
        coverPicture,
        followers,
        followings,
        createdAt
    },

    reducers:{
        login:(state,action)=>{
            state._id=action.payload._id
            state.username=action.payload.username
            state.email=action.payload.email
            state.profilePicture=action.payload.profilePicture
            state.status=action.payload.status
            state.coverPicture=action.payload.coverPicture
            state.followers=action.payload.followers
            state.followings=action.payload.followings
            state.createdAt=action.payload.createdAt
        },
        logout:(state)=>{state={}}
    }
})

export const{login,logout}=userSlice.actions;
export default userSlice.reducer;