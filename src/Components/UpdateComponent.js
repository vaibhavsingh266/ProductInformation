import React, { Component } from 'react';
import SecureCallService from './../services/securecallservice';
import axios from "axios";
class UpdateComponent extends Component {
    constructor(props) {
        super(props);
        this.state = 
        { 
            ProductId: this.props.location.ProductId,
            ProductName: this.props.location.ProductName,
            Price: this.props.location.Price,
            Description:this.props.location.Description,
            Rating:this.props.location.Rating
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
    console.log(products);
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
    axios.put('http://localhost:4000/update-product/'+products.ProductId, products,{
      headers:{
        'content-type':'application/json',
        'AUTHORIZATION': `Bearer ${this.token}`
      }
    })
    .then((response)=> {
            if(response.data.statusCode === 200)    {
                 console.log(JSON.stringify(response.data));
            }
        }).catch((error)=>{
            console.log(`error occured ${error}`);
            alert("record not updated check console!");
        });
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
            readOnly
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
            value="Update"
            onClick={this.onSubmit.bind(this)}
            className="btn btn-success"
          />
        </div>
        </div>
          );
    }
};
export default UpdateComponent;