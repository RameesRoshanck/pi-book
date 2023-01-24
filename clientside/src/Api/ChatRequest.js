import axios from "axios"



const API=axios.create({baseURL :"http://localhost:8000"})



export const userChat=(id)=>API.get(`/chat/${id}`)
// export const addUserChat=(data)=>API.post("/chat",data)

export const getUser=(userId)=>API.get(`/getAuser/${userId}`)

export const getMessages=(chatId)=>API.get(`/chat/message/${chatId}`)
export const addMessage=(data)=>API.post("/chat/message",data)