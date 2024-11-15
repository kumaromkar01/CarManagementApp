import './App.css'
import { BrowserRouter,Router,Routes,Route } from 'react-router-dom'
import Signup from './component/Signup'
import Login from './component/Login'
import List from './component/List'
import View from './component/View'
import Update from './component/Update'
import Add from './component/Add'
function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<List/>}/>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path='/view/:id' element={<View/>}/>
        <Route path='/update/:id' element={<Update/>}/>
        <Route path='/Add' element={<Add/>}/>
      </Routes>
    </>
  )
}
export default App