import React, { Component } from 'react'
//import HeaderComponent from './headercomponent';
import SecureCallService from './../../services/securecallservice';
import ValidationComponent from './../ValidationComponent';


class RegisterComponent extends Component   {
    constructor(props)   {
        super(props);
        this.state = {
            username: '',
            password: '',
            password1: '',
            uniqueUsername: true,
            strgpass: false
         };
         this.serv = new SecureCallService();
    }
    clearInputs=() => {
        this.setState({username: ''});
        this.setState({password: ''});
        this.setState({password1:''});

    }

    RegisterUser=()=>{
        if(this.state.username === '' || this.state.password === '')    {
            alert('All input fields are required');
            return;
        }
        if(this.state.uniqueUsername === false || this.state.strgpass === false)  {
            alert('Cannot submit the data');
            return;
        }
        if(!(this.state.password===this.state.password1)){
            alert('Password do not match');
            return;
}
            const user = {
            Username: this.state.username,
            Password: this.state.password
        };
        this.serv.register(user)
        .then((response)=> {
            if(response.data.statusCode === 200)    {
            console.log(JSON.stringify(response.data));
            alert('Added the user successfully');
            }
        }).catch((error)=>{
            console.log(`Error in creating user ${error}`);
            alert('Something went wrong');
        });
        this.clearInputs();
        this.props.history.push('/login');
    }
    handleInput=(evt) => {
        this.setState({[evt.target.id]: evt.target.value})
    }

    checkForUniqueID(evt)  {

        let username = {
            Username: evt.target.value
        }
        this.serv.checkForUniqueId(username)
        .then((response)=> {
            if(response.data.statusCode === 200)    {
            console.log(JSON.stringify(response.data));
            this.setState({uniqueUsername: false});
            }
            else{
                this.setState({uniqueUsername: true});
            }
        }).catch((error)=>{
            console.log(`Error in creating user ${error}`);
            alert('Something went wrong');
        });
    }

    checkPwd(value)  {
        if(this.state.strgpass !== value)   {
            this.setState({strgpass: value});
        }
    }  

    render()    {
        return (
        <div >
        <div className="container" style={{'marginTop':'100px'}}>
        <h2><div className='panel-header' style={{'font-weight': 'bold'}}>SIGN UP</div></h2>
           <div className="form-group"  style={{ marginLeft:'360px'}}>
              <input type="text" placeholder="Username" className="form-control" style={{'width': '50%'}} value={this.state.username} onChange={this.handleInput.bind(this)} onBlur={this.checkForUniqueID.bind(this)} id="username"  required/>
              {/* <ValidationComponent name="Username" data={this.state.uniqueUsername}></ValidationComponent> */}
           </div>
           <div className="form-group" style={{ marginLeft:'360px'}}>
              <input type="password" placeholder="Password" className="form-control" style={{'width': '50%'}} value={this.state.password} onChange={this.handleInput.bind(this)} id="password"  required/>
              <ValidationComponent name="Password" data={this.state.password} Valid={this.checkPwd.bind(this)}></ValidationComponent>
           </div>
           <div className="form-group" style={{ marginLeft:'360px'}}>
              <input type="password" placeholder="Repeat Password" className="form-control" style={{'width': '50%'}} value={this.state.password1}  onChange={this.handleInput.bind(this)} id="password1"  required/>
              <ValidationComponent name="Password" data={this.state.password1} Valid={this.checkPwd.bind(this)}></ValidationComponent>
           </div>
           <div className="form-group" style={{ marginLeft:'360px'}}>
              <input type="submit" value="Submit" className="btn btn-outline-success" onClick={this.RegisterUser}  name="submit" />
           </div> 
           </div>
        </div> 
        );
    }
}

export default RegisterComponent;