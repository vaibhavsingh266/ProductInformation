import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

import { BrowserRouter as Router, Switch, Route,Redirect } from "react-router-dom";


import UserLoginComponent from './Components/UserLogin/UserLogin';
import RegisterComponent from "./Components/UserLogin/UserRegister";
import ProductList from "./Components/Product-list";
import Prod from './Components/newProd';
import UpdateComponent from "./Components/UpdateComponent";
import Searchcomponent from "./Components/UserLogin/SearchComponent";
import ProductComponent from "./Components/UserLogin/ProductComponent";
import AdminLoginComponent from "./Components/AdminLogin/login";
import AdminRegisterComponent from "./Components/AdminLogin/register";
import MainComponent from "./Components/Main";


function App() {
  return (<Router>
    <div className="App">
        <Row>
          <Col md={12}>
            <div className="wrapper">
              <Switch>
              <Route exact path="/" component={MainComponent}></Route>
              <Route exact path='/admin-login' component={AdminLoginComponent}></Route>
              <Route exact path="/login" component={UserLoginComponent}></Route>
              <Route exact path ='/display' component={ProductList}></Route>
              <Route exact path ='/admin-register' component={AdminRegisterComponent}></Route>
              <Route exact path="/register" component={RegisterComponent}></Route>
              <Route exact path ="/new-prod" component={Prod}></Route>
              <Route exact path ="/update-product/:id" component ={UpdateComponent}></Route>
              <Route exact path ='/search' component={Searchcomponent}></Route>
              <Route exact path ='/display-table' component={ProductComponent}></Route>
              <Redirect to="/"/>
              </Switch>
            </div>
          </Col>
        </Row>
    </div>
  </Router>);
}

export default App;