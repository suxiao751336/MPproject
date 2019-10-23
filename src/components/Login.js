
import React,{Component} from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

//import mydetial from 'detail';



class Login extends Component {
    constructor(props) {  //构造函数
        super(props);
        this.state = {
            user:'',
            password:'',
        }
        this.userChange = this.userChange.bind(this);
        this.passwordChange = this.passwordChange.bind(this);
        this.submit = this.submit.bind(this);
    }

    userChange(e){
        this.setState({ user : e.target.value })
    }

    passwordChange(e){
        this.setState({ password : e.target.value })
    }

    submit(){
  const username=this.state.user;
  const pass=this.state.password;
  if(username=="huang"&&pass=="123"){
    
       const url = '/src/components/detail.js';
       window.open(url, '_blank');
      
  
  }else{
       
        window.alert("password not right")
  }
    }

    render(){
        return(
        <div style={{margin:'10px'}}>
          
                <h2>please login</h2>
               
    <input id='user' 
                    placeholder='userName' 
                    
                    onChange={this.userChange}/>  
    
    <br/>
    
    <input  id='password' 
                    type='password' 
                    placeholder='password' 
                   
                    onChange={this.passwordChange}/>  
                <br/>
                
                
    
    <button width="200" onClick = { this.submit}>login</button> 
           
        </div>
    )
    }
}
export default Login;