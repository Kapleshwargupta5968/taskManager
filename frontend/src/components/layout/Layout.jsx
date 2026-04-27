import Footer from "../shared/Footer"
import Header from "../shared/Header"
import { Outlet } from "react-router-dom"
const Layout = () => {
  return (
    <>
      <div className="relative z-50">
        <Header/>
      </div>
      <main className="relative z-10">
        <Outlet/>
      </main>
      <Footer/>
    </>
  )
}

export default Layout
