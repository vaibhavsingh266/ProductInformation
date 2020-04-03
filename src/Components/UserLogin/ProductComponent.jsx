import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import TableRender from './TableRender';
import Button from 'react-bootstrap/Button';

export default class ProductComponent extends Component {

    constructor(props) {
        super(props);
        this.token = ''; 
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            products: []
          };
    }
    componentDidMount=()=>{
        let tk = sessionStorage.getItem('token');
        if(tk !== null)    {
            this.token = tk;
        }
        else{
            this.props.history.push('/login');
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
          return <TableRender obj={res} key={i} />;
        });
      }
        

    render() {
        return (<div className="table-wrapper">
        <div>
            <h3>Product Information</h3>
    <Link to={"/search"}>
        <Button type="button" style={{float:'right'}}>search</Button>
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
          </tr>
        </thead>
        <tbody>
          {this.DataTable()}
        </tbody>
      </Table>
    </div>);
    }
}