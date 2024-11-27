import { BrowserRouter, Route, Routes } from 'react-router-dom'
import OtherPage from './otherPage'
import Fib from './fib'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/other' element={<OtherPage />} />
        <Route path='/' element={<Fib />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App