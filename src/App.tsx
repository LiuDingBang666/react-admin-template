
import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./pages/login.tsx";
import Admin from "@/pages/admin.tsx";
import DemoCrud from "@/pages/system/demo-crud.tsx";

function App() {
  return (
      <BrowserRouter>
         <Routes>
             <Route path="/" element={<Login/>}/>
             <Route path="/admin" element={<Admin/>}>
                 <Route index element={<DemoCrud/>}/>
             </Route>
         </Routes>
      </BrowserRouter>
  )
}

export default App
