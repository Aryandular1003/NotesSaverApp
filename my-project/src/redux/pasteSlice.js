import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';

const initialState = {
  pastes: localStorage.getItem("pastes")
  ?JSON.parse(localStorage.getItem("pastes"))
  :[]
}

export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    addToPastes: (state, action) => {
      const paste = action.payload; 

      if(paste.title === "" || paste.content === ""){
        toast.error("title and content both are required")
        return; 
      }

      if(state.pastes.find((p)=>p.title === paste.title)){
       toast.error("title already exists, please choose a different title")
       return ; 
      }

      state.pastes.push(paste) ; 
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
      toast.success("paste created successfully")
    },
   updateToPastes: (state, action) => {
     const paste = action.payload; 
     const index =  state.pastes.findIndex((p)=>p._id === paste._id)

     if(index ===-1){
       toast.error("paste not found") 
       return ; 
     }

     state.pastes[index] = paste ; 
     localStorage.setItem("pastes", JSON.stringify(state.pastes));
     toast.success("paste updated successfully")
    },
    resetAllPastes: (state) => {
      state.pastes =[]; 
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
     toast.success("all pastes deleted successfully")
      
    },
    removeFromPastes: (state, action) => {
      const pasteId = action.payload;
      const index = state.pastes.findIndex((p) => p._id === pasteId) ;
      if(index !== -1){
        state.pastes.splice(index, 1);
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("paste deleted successfully");
      } else {
        toast.error("paste not found");
      }
    },
  },
})

// Action creators are generated for each case reducer function
export const {  addToPastes,updateToPastes, resetAllPastes,removeFromPastes} = pasteSlice.actions

export default pasteSlice.reducer