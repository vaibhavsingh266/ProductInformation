import React, { Component } from 'react';
class TableRender extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( <tr>
            <td>{this.props.obj.ProductId}</td>
            <td>{this.props.obj.ProductName}</td>
            <td>{this.props.obj.Price}</td>
            <td>{this.props.obj.Description}</td>
            <td>{this.props.obj.Rating}</td>            
                </tr>);
    }
}
 
export default TableRender;