export const LoginStart=(userCrendentiala)=>({
    type:"LOGIN_START",
});


export const LoginSuccess=(user)=>({
    type:"LOGIN_SUCCESS",
    payload:user,
});

export const LoginFailer=(user)=>({
    type:"LOGIN_FAILER",
    payload:error,
});