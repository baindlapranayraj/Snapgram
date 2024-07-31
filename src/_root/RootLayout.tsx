import { Outlet } from "react-router-dom"
import Topbar from "./components/Topbar"
import LeftBar from "./components/LeftBar"
// import BottomBar from "./components/BottomBar"

const RootLayout = () => {

  return (
    <div className="text-white w-full md:flex flex-col">
      <Topbar />
      <div className="middleBox flex items-start mt-11">
        <LeftBar/>
        <section className="flex flex-1 h-full">
          <Outlet/>
        </section>
      </div>
      {/* <BottomBar/> */}
    </div>
  )
}

export default RootLayout