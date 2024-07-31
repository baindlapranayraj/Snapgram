import './App.css'
import { Outlet } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'

function App() {

  return (
    <>
    <div className="containerApp flex bg-black h-full">
      <AuthProvider>
         <Outlet/>
      </AuthProvider>
    </div>
    </>
  )
}

export default App
