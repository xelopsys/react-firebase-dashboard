// import logo from './logo.svg';
import './App.css';
import React, { useContext } from "react"
// import ReactDOM from "react-dom"
// import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Single from './components/single/Single';
import New from './components/new/New';
import Error from './components/404/404';
import List from './components/list/List';
import { AuthContext } from './context/AuthContext'

function App() {
  // const currentUser = false
  const { currentUser } = useContext(AuthContext)

  const RequireAuth = ({ children }) => {
    return currentUser ? (children) : <Navigate to="/login" />;
  }

  // console.log(currentUser)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" >
          <Route path="login" element={<Login />} />
          <Route index element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
          />
          <Route path="/users">
            <Route index element={
              <RequireAuth>
                <List />
              </RequireAuth>
            } />
            <Route path=":userId" element={
              <RequireAuth>
                <Single />
              </RequireAuth>
            } />
            <Route path="new" element={
              <RequireAuth>
                <New />
              </RequireAuth>} />
          </Route>
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
