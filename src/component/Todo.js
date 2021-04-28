import React from "react";
import { Redirect } from "react-router-dom";
import TodoItem from "./TodoItem";
import Loading from "./Loading";
import axios from "axios";
import "../style/todo.scss";

class Todo extends React.Component {
    constructor() {
        super();
        this.state = {
            todo: {
                description: "",
                completed: "",
            },
            todosData: [],
            name: "",
            redir:"/todo",
            isLoading:false
        };
        this.changeHundler = this.changeHundler.bind(this);
        this.clickHundler = this.clickHundler.bind(this);
        this.deleteClickHudler = this.deleteClickHudler.bind(this);
        this.onChangeHudler = this.onChangeHudler.bind(this);
        this.logoutHundler = this.logoutHundler.bind(this);
    }

    changeHundler(e) {
        this.setState({
            todo: { description: e.target.value, completed: false },
        });
    }


    authHundler(error){
      if(error.response.status === 401){
        this.setState({
          redir: '/login'
        });
        console.clear()
      }
    }


    getTasks() {
        this.setState({isLoading: true});
        axios
            .get("https://mern-todo-ap.herokuapp.com/task/all", {
                headers: {
                    Authorization: localStorage.getItem("token"),
                },
            })
            .then((res) => {
                this.setState({
                    todosData: res.data,
                    isLoading: false
                });
            })
            .catch((error) => {
                this.authHundler(error)
                this.setState({
                    todosData: [],

                });
                console.clear()
            });
    }


    getUser() {
        this.setState({isLoading: true});
        axios
            .get("https://mern-todo-ap.herokuapp.com/user", {
                headers: {
                    Authorization: localStorage.getItem("token"),
                },
            })
            .then((res) => {
                this.setState({
                    name: res.data.name,
                    isLoading: false,
                });
            })
            .catch((error) => {
                this.authHundler(error)
            });
    }

    clickHundler() {
        this.setState({isLoading: true});
        axios
            .post("https://mern-todo-ap.herokuapp.com/task/create", this.state.todo, {
                headers: {
                    Authorization: localStorage.getItem("token"),
                },
            })
            .then((res) => {
                this.setState({
                    todo: { description: "", completed: "" },
                    isLoading: false
                });
                this.getTasks();
            })
            .catch((err) => {
              this.authHundler(err)
            });
    }

    deleteClickHudler(id) {
        this.setState({isLoading: true});
        axios
            .delete(`https://mern-todo-ap.herokuapp.com/task/${id}`, {
                headers: {
                    Authorization: localStorage.getItem("token"),
                },
            })
            .then((res) => {
                this.getTasks();
                this.setState({isLoading: false});
            })
            .catch((err) => {
              this.authHundler(err)
                this.setState({
                    todosData: [],
                });
            });
    }

    onChangeHudler(id) {
        let todo = this.state.todosData.filter((todo) =>
            todo._id === id ? todo : ""
        )[0];
        this.setState({isLoading: true});
        axios
            .patch(
                `https://mern-todo-ap.herokuapp.com/task/update/${id}`,
                { completed: !todo.completed },
                {
                    headers: {
                        Authorization: localStorage.getItem("token"),
                    },
                }
            )
            .then((res) => {
                this.getTasks();
                this.setState({isLoading: false});
            })
            .catch((err) => {
                this.authHundler(err)
            });
    }

    logoutHundler() {
        this.setState({isLoading: true});
        axios
        .post("https://mern-todo-ap.herokuapp.com/logout", null,{
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        })
        .then((res) => {
          this.setState({
            isLoading: false,
            redir:"/login"
           })
        })
        .catch((err) => {
            console.log(err);
        });
    }

    componentDidMount() {
        this.getTasks();
        this.getUser();
    }

    render() {
        return (
            
            <div className="container">
               <Redirect to={this.state.redir}/>
               <Loading loading={this.state.isLoading}/>
                <div className="todo-wrapper">
                    <p className="title">
                        <span>👋 </span>Hey {this.state.name} Let's Manage Your
                        Tasks
                    </p>
                    <div className="input-container">
                        <input
                            type="text"
                            name="description"
                            placeholder="Write Your Tasks Here..."
                            onChange={this.changeHundler}
                            value={this.state.todo.description}
                        />
                        <button onClick={this.clickHundler}>
                            <i className="fas fa-plus"></i>
                        </button>
                    </div>
                    <div className="items-cont">
                        {this.state.todosData.map((data) => (
                            <TodoItem
                                description={data.description}
                                completed={data.completed}
                                deleteClickHudler={this.deleteClickHudler}
                                onChangeHudler={this.onChangeHudler}
                                key={data._id}
                                id={data._id}
                            />
                        ))}
                    </div>
                    <div className="foot">
                        <button className="logout" onClick={this.logoutHundler}>
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Todo;
