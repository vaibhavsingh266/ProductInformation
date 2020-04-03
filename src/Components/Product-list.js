import React, { Component } from "react";
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import ProductComponent from './ProductComponent';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';



export default class ProductList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      products: []
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.token = '';
  }

  componentDidMount() {
    let tk = sessionStorage.getItem('token');
    if(tk !== null)    {
        this.token = tk;
    }
    else{
        this.props.history.push('/admin-login');
    }
    axios.get('http://localhost:4000/display', {
      headers: {
          'AUTHORIZATION': `Bearer ${this.token}`}
      })
      .then(res => {
        this.setState({
            products: res.data.data
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }
  onSubmit(e)    {
    e.preventDefault();
    sessionStorage.clear();
    this.props.history.push('/');
}

  DataTable() {
    let data = Array.from(this.state.products);
    return data.map((res, i) => {
      return <ProductComponent obj={res} key={i} />;
    });
  }


  render() {
    return (
    <div className="table-wrapper">
        <div>
            <h3>Product Information</h3>
    <Link to={"/new-prod"}>
        <Button type="button" style={{float:'right'}}>Add New Product</Button>
    </Link>
        <Button type="button" style={{float:'right'}} onClick={this.onSubmit.bind(this)}>Log out</Button>    
    </div>   
        <Table striped bordered hover>
        <thead>
          <tr>
            <th>Product Id</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Rating</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {this.DataTable()}
        </tbody>
      </Table>
    </div>);
  }
}