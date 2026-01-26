

import { create } from "zustand";


export const useMapRefStore = create((set)=>({
    mapRef:null,
    setMapRef:(ref)=> set({mapRef:ref})
}))