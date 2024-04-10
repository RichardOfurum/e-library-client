import {create} from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type UserType = {
    id: string,
    username: string,
    isAdmin:boolean,
    token:string,
    isLoggedin:boolean,
}

type UserStoreType = {
    user_data:UserType ;
    reset: () => void;
    // setUserData: (data:any) => <void>;
}



export const useUserStore = create<UserStoreType>()(persist((set) =>({
    user_data:{
        id:"",
        username: "",
        isAdmin:false,
        token:"",
        isLoggedin: false,
    },

    reset: () =>{
        set((state) => (
            {
                user_data:{
                    id: "",
                    username: "",
                    isAdmin: false,
                    token: "",
                    isLoggedin: false
                }
            }
        ))
    }

    // setUserData: (data:UserType) => {
    //    set(() =>{
    //         return {
    //             user_data: data
    //         }
    //    })
    // },
    
}),{
    name:"user_store",
    // storage: createJSONStorage(() => sessionStorage)
}));