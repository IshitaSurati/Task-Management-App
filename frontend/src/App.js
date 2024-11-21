import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import TaskList from './components/TaskList';
import UserProfile from './pages/UserProfile';
import Logout from './pages/Logout';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

function App() {
  return (
    <Router>
      <Navbar expand="lg" className="navbar">
        <Navbar.Brand href="/">Task Manager</Navbar.Brand>
        <Nav className="ml-auto">
          <Nav.Link href="/login">Login</Nav.Link>
          <Nav.Link href="/register">Register</Nav.Link>
        </Nav>
      </Navbar>

      <div className="d-flex">
        <Sidebar />
        <div className="container mt-4">
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/" exact component={Dashboard} />
            <Route path="/tasks" component={TaskList} />
            <Route path="/profile" component={UserProfile} />
            <Route path="/logout" component={Logout} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
