import { createContext, PropsWithChildren, useEffect, useState,useContext } from "react";
import { IUser } from "../types";
import { VerficationAccount } from "../appwrite/Authentication";
import { useNavigate } from "react-router-dom";


type ContextType = {
  user:IUser,
  setUser: React.Dispatch<React.SetStateAction<IUser>>,
  isLoading:boolean,
  isAuthenticated:boolean,
  setIsAuthenticated:React.Dispatch<React.SetStateAction<boolean>>
  checkAuth:()=>Promise<boolean>
}

const INITIAL_USER:IUser = {
  id: "",
  name: "",
  username: "",
  email: "",
  imageUrl: "",
  bio: "",
};

const INITIAL_STATE = {
  user: INITIAL_USER,
  setUser: () => {},
  isLoading: false,
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  checkAuth:async ()=>false as boolean
};

const AuthContext = createContext<ContextType>(INITIAL_STATE);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<IUser>(INITIAL_USER);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate()

  const checkAuth = async ()=>{
    setIsLoading(true)
    try {
      const currentUser = await VerficationAccount()
      if(currentUser){
        setUser({
          id:currentUser.$id,
          name:currentUser.name,
          username:currentUser.username,
          email:currentUser.email,
          bio:currentUser.bio,
          imageUrl:currentUser.imageUrl
        })
        setIsAuthenticated(true);
        console.log(currentUser);
        return true
      }
      return false
    } catch (error) {
      console.log(error)
      return false
    }finally{
      setIsLoading(false)
    }
  }

  useEffect( ()=>{
    const cookieFallback = localStorage.getItem("cookieFallback");
    if(cookieFallback==="[]"||
      cookieFallback===null||
      cookieFallback==undefined
    ){
      navigate('/sign-up')
    }
    else{
      navigate('/')
    }
     checkAuth()
  },[])

  const data = {
    user,
    setUser,
    isAuthenticated,
    setIsAuthenticated,
    isLoading,
    checkAuth
  };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};


export const useAuthContext = ()=>{
  const context = useContext(AuthContext);
  return context;
}