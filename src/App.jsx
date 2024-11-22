import { useRoutes } from "react-router-dom"
import ItemList from "./pages/ItemList"
import ItemEdit from "./pages/ItemEdit"
import AddCart from "./pages/AddCart"
const App =()=>{
  const element = useRoutes([
    {path:'/',element:<ItemList/>},
    {path:'/create',element:<ItemEdit/>},
    {path:'/edit/:id',element:<ItemEdit/>},
    {path:'/cart',element:<AddCart/>}

  ])
  return element
}


export default App
