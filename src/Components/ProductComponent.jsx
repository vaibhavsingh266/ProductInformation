import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

export default class ProductComponent extends Component {

    constructor(props) {
        super(props);
        this.deleteProduct = this.deleteProduct.bind(this);
        this.token = ''; 
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

    deleteProduct() {
        axios.delete('http://localhost:4000/delete-product/' + this.props.obj.ProductId,{
            headers: {
                'AUTHORIZATION': `Bearer ${this.token}`
            }
        })
            .then((res) => {
                {console.log('Product successfully deleted!')
                alert(`record ${this.props.obj.ProductId} deleted`);
                //window.location.reload(false);
                // this.props.history.push(/display);
                // window.location.reload(1);
            }
            }).catch((error) => {
                console.log(error)
            });
        window.location.reload(1);
    }

    render() {
        return (
            <tr>
                <td>{this.props.obj.ProductId}</td>
                <td>{this.props.obj.ProductName}</td>
                <td>{this.props.obj.Price}</td>
                <td>{this.props.obj.Description}</td>
                <td>{this.props.obj.Rating}</td>            
                <td>
                    {/* <Link className="edit-link" to={"/edit-product/"+ this.props.obj.ProductId}>
                        Edit */}
                        {/* <Link to={"/update-product/"+this.props.obj}>
                            <Button type="button">Edit</Button>
                        </Link>                         */}
                        <Link to={{pathname:`/update-product/${this.props.obj.ProductId}` ,
                                   ProductId: this.props.obj.ProductId,
                                   ProductName:this.props.obj.ProductName,
                                   Price:this.props.obj.Price,
                                   Description:this.props.obj.Description,
                                   Rating:this.props.obj.Rating}}>
                            <Button type="button">Edit</Button>
                        </Link> 
                    <Button onClick={this.deleteProduct} size="sm" variant="warning">Delete</Button>
                </td>
            </tr>
        );
    }
}