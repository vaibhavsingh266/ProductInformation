import React, { Component } from 'react';
import SecureCallService from './../../services/securecallservice';
import Table from 'react-bootstrap/Table';
import TableRender from './TableRender';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

class Searchcomponent extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            products:[]
         }
        this.token='';
        this.serv= new SecureCallService();
    }

    componentDidMount() {
        let tk = sessionStorage.getItem('token');
        if(tk !== null)    {
            this.token = tk;
        }
        else{
            this.props.history.push('/login');
        }
    }
    DataTable() {
        let data = Array.from(this.state.products);
        return data.map((res, i) => {
          return <TableRender obj={res} key={i} />;
        });
      }

    search(evt){
        let id = evt.target.value;
        //console.log(id);

        const token = sessionStorage.getItem('token'); 
         this.serv.getProductsById(id,token)
         .then((response)=>{
            this.setState({products : response.data.data})
         }).catch((error)=>{
             console.log(`Error Occured ${error}`);
    });
}
    render() { 
        return ( 
        <div className="table-wrapper">

        <input type="text" name="searchBox" value={this.state.search} onBlur={this.search.bind(this)} style={{'width':'500px'}} placeholder="Please provide the exact value"/> 
        <Button type="button" onClick={this.search.bind(this)} style={{'marginLeft':'10px'}}>Search</Button> 
        <Link to='/display-table'>
        <Button type="button" onClick={this.search.bind(this)} style={{'marginLeft':'10px'}}>Click to go back</Button> 
        </Link>
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
      </div>
      );
    }
}
 
export default Searchcomponent;