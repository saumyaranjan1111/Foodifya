
import './App.css';
import Home from './screens/Home';
import {
  BrowserRouter as Router,
  Routes, 
  Route,
  Link
} from 'react-router-dom';

import Login from './screens/Login';
import Signup from './screens/Signup';

import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import { CartProvider } from './components/ContextReducer';
import MyOrder from './screens/MyOrder';

function App() {
  return (
    <CartProvider>

    <Router>
      <div>
        <Routes>
          
          {/* if / endpoint is hit then render the <Home/> component */}

          <Route exact path='/'element={<Home/>} />
          
          {/* if /login endpoint is hit then render the <Login/> component */}

          <Route exact path='/login' element={<Login/>}/>

          {/* if /createuser is hit , then render Signup.js */}
          <Route exact path='/createuser' element={<Signup/>}/>

          <Route exact path='/myOrder' element={<MyOrder/>}/>
        </Routes>
      </div>
    </Router>
    </CartProvider>
  );
}

export default App;
