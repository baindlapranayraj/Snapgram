import { Outlet } from "react-router-dom"



const AuthLayout = () => {
  const Auth = false;

  if(Auth) return null

  return (
    <>
    <section className="flex flex-1 flex-col justify-center items-center py-10">
      <Outlet/>
    </section>
    <img className="w-1/2 object-cover bg-white" src="images/SideImage.svg" alt="" />
    </>
  )
}

export default AuthLayout