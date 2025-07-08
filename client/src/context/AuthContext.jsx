import { createContext, useState } from "react";


export const AuthContext=createContext(null);

export function AuthProvider({children}){
    const [Auth,setAuth]=useState(()=>{
        const token=localStorage.getItem('token');
        return token ?{token}: null;
    });

    const login=(token)=>{
        localStorage.setItem('token',token);
        setAuth({token});
    }

    const logout=()=>{
        localStorage.removeItem('token');
        setAuth(null);
    }

    return <AuthContext.Provider value={{Auth,login,logout}}>
        {children}
    </AuthContext.Provider>
};