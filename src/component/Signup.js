import React from 'react';
import {Link, Redirect} from "react-router-dom";
import Loading from "./Loading";
import '../style/register.scss';
import axios from 'axios'

class Signup extends React.Component {
  constructor() {
    super();
    this.state = {
        name: '',
        email: '',
        password:'',
        redir: '/',
        isLoading: false
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
      axios.post('https://mern-todo-ap.herokuapp.com/signup',{
          name: this.state.name,
          email: this.state.email,
          password: this.state.password,
      })
      .then(res => {
        this.setState({
            isLoading: true,
            redir:"/login"
        })
      })
      .catch(err => {
        console.log(err.data);
      })
  }


  render() {
    return(
        <div className="wrapper">
            <Loading loading={this.state.isLoading}/>
            <Redirect to={this.state.redir} />
            <form className="form" onSubmit={this.submitHandler}>
                <label>
                    <p>name:</p>
                    <input 
                    type="text" 
                    name="name" 
                    onChange={this.changeHandller}
                    autoComplete="true"
                    />
                </label>

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
                    <input type="submit" className="signup" value="signup"/>
                    <Link className="login" to="/login">Login</Link>
                </div>
            </form>
        </div>
    )
  }
}

export default Signup;
