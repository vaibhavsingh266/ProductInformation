import React, { Component } from 'react';
import SecureCallService from './../services/securecallservice';
import axios from "axios";
class Prod extends Component {
    constructor(props) {
        super(props);
        this.state = 
        { 
            ProductId: 0,
            ProductName: "",
            Price: 0,
            Description:"",
            Rating:0
        }
        this.token = '';
        this.onSubmit = this.onSubmit.bind(this);
        this.handleInputChanges = this.handleInputChanges.bind(this);
        this.serv = new SecureCallService();
    }
    handleInputChanges(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    clearInputs() {
        this.setState({ ProductId: 0 });
        this.setState({ ProductName: "" });
        this.setState({ Price: 0 });
        this.setState({ Description: "" });
        this.setState({ Rating: 0 });
      }

      componentDidMount=()=>{
        let tk = sessionStorage.getItem('token');
        if(tk !== null)    {
            this.token = tk;
        }
        else{
            this.props.history.push('/login');
        }
    }
    onSubmit(e) {
    e.preventDefault()

    const products = {
      ProductId: this.state.ProductId,
      ProductName: this.state.ProductName,
      Price: this.state.Price,
      Description: this.state.Description,
      Rating:this.state.Rating
    };
    // this.serv.postProduct(products)
    //     .then((response)=> {
    //         if(response.data.statusCode === 200)    {
    //         console.log(JSON.stringify(response.data));
    //         }
    //         else{
    //            console.log("hii");
    //         }
    //     }).catch((error)=>{
    //         console.log(`Error in creating user ${error}`);
    //         alert('Something went wrong');
    //     });
    axios.post('http://localhost:4000/create-product', products,{
      headers:{
        'content-type':'application/json',
        'AUTHORIZATION': `Bearer ${this.token}`
      }
    })
    .then(res => console.log(res.data));
    alert("New Product inserted");
    this.props.history.push('/display');
    window.location.reload(1);
    }

    render() { 
        return (
            <div className="container">
        <div className="form-group">
          <label htmlFor="ProductId">Product Id</label>
          <input
            type="text"
            className="form-control"
            value={this.state.ProductId}
            onChange={this.handleInputChanges}
            name="ProductId"
          />
        </div>
        <div className="form-group">
          <label htmlFor="ProductName">Product Name</label>
          <input
            type="text"
            className="form-control"
            value={this.state.ProductName}
            onChange={this.handleInputChanges}
            name="ProductName"
          />
        </div>
        <div className="form-group">
          <label htmlFor="Price">Product Price</label>
          <input
            type="text"
            className="form-control"
            value={this.state.Price}
            onChange={this.handleInputChanges}
            name="Price"
          />
        </div>
        <div className="form-group">
          <label htmlFor="Description">Description</label>
          <input
            className="form-control"
            value={this.state.Description}
            onChange={this.handleInputChanges}
            name="Description">
          </input>
        </div>
        <div className="form-group">
          <label htmlFor="Rating">Rating</label>
          <input
            className="form-control"
            value={this.state.Rating}
            onChange={this.handleInputChanges}
            name="Rating">
          </input>
        </div>
        <div className="form-group">
          <input
            type="button"
            value="Clear"
            onClick={this.clearInputs.bind(this)}
            className="btn btn-default"
          />
          <input
            type="button"
            value="Save"
            onClick={this.onSubmit.bind(this)}
            className="btn btn-success"
          />
        </div>
        </div>
          );
    }
};

export default Prod;