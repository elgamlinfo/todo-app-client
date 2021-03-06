
import React from 'react';
import {Link,Redirect} from "react-router-dom";
import Loading from "./Loading";
import Messages from "./Messages";
import '../style/register.scss';
import axios from 'axios'


class Login extends React.Component {
  constructor() {
    super();
    this.state = {
        email: '',
        password:'',
        redir:'/login',
        message: ''
    }
    this.changeHandller = this.changeHandller.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  changeHandller = (e) => {
      const { name, value } = e.target;
      this.setState({
          [name]:value
      })
  }

  submitHandler = (e) => {
      e.preventDefault();
      this.setState({isLoading: true});
      axios.post('https://mern-todo-ap.herokuapp.com/login',this.state)
      .then(res => {
          localStorage.setItem("token",`Bearer ${res.data.token}`)
          this.setState({
            isLoading: true,
            redir:'/todo'
          })
      })
      .catch(err => {
        this.setState({
            message:'email or password not match',
            isLoading: false
        })
        setTimeout(() => {
            this.setState({
                message:''
            })
        },3000)
      })
     
  }


  render() {
    return(
        <div className="wrapper">
            <Loading loading={this.state.isLoading}/>
            <Redirect to={this.state.redir} />
            <Messages message={this.state.message} />
            <form className="form" onSubmit={this.submitHandler}>
                <label>
                    <p>email:</p>
                    <input 
                    type="email" 
                    name="email" 
                    onChange={this.changeHandller}
                    autoComplete="true"
                    />
                </label>

                <label>
                    <p>password:</p> 
                    <input 
                    type="password" 
                    name="password"
                    onChange={this.changeHandller}
                    autoComplete="true"
                    />
                </label>
                <div className="btns">
                    <input type="submit" className="signup" value="login"/>
                    <Link className="login" to="/">Signup</Link>
                </div>
            </form>
        </div>
    )
  }
}

export default Login;
