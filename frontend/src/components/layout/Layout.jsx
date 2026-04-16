import Footer from "../shared/Footer"
import Header from "../shared/Header"
import { Outlet } from "react-router-dom"
const Layout = () => {
  return (
    <>
      <Header/>
      <main>
        <Outlet/>
      </main>
      <Footer/>
    </>
  )
}

export default Layout
