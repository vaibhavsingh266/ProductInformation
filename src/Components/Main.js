import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

class MainComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( <div style={{ marginTop:'160px'}}>
                <div className="mb-2">
                <Link to={"/admin-login"}>
                    <Button variant="primary" size="lg">
                             Admin
                            </Button>
                    </Link>
                    <Link to={"/login"}>
                    <Button variant="secondary" size="lg" style={{'margin':'50px'}}>
                    User
                    </Button>
                    </Link>
                    </div>
        </div> );
    }
}
 
export default MainComponent;