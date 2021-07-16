import { Switch, Route, withRouter } from "react-router-dom";
import React, { Component } from 'react'
import MyNav from './components/MyNav'
import axios from 'axios'
import TodoList from "./components/TodoList";
import TodoDetail from "./components/TodoDetail";
import AddForm from "./components/AddForm";
import EditForm from './components/EditForm'

class App extends Component {

  state = {
    todos: []
  }

  // Make your /api/todos requst here
  async componentDidMount(){
    try {
      // fetch all the initial todos to show on the home page
      let response = await axios.get(`http://localhost:5005/api/todos`)
      console.log(response.data)
      this.setState({
        todos: response.data
      })
    }  
    catch(err){
      console.log('Todo fetch failed', err)
    }
  }

  handleAddTodo = (event) => {

    event.preventDefault()

    let newTodo = {
      name: event.target.name.value,
      description: event.target.description.value,
      completed: false
    }

    // Pass the data in POST requests as the second parameter
    // create the todo in the DB
    axios.post(`http://localhost:5005/api/create`, newTodo)
      .then((response) => {
          // Also update the state locally
          // use the newly created to from your DB and not the local todo that we created above.

          this.setState({
            todos: [response.data, ...this.state.todos]
          }, () => {
              // to do something synchronous with the setState

              // redirects the app to a certain url
              // we're using the history push method to redirect it to any url we want
              this.props.history.push('/')
          })
      })
      .catch(() => {
        console.log('Adding todo failed')
      })

  }

  handleDeleteTodo = (todoId) => {
    // delete the todo from the DB
    axios.delete(`http://localhost:5005/api/todos/${todoId}`)
      .then(() => {
        // and then also filter and remove the todo from the local state
        let filteredTodos = this.state.todos.filter((todo) => {
          return todo._id !== todoId
        })

        //update the state and redirect synchronously
        this.setState({
          todos: filteredTodos
        } , () => {
          this.props.history.push('/')
        })

      })
      .catch(() => {
        console.log('Delete failed')
      })
  }

  handleEditTodo = (event, todo) => {
    event.preventDefault()

    // pass a second parameter to the patch for sending info to your server inside req.body
    axios.patch(`http://localhost:5005/api/todos/${todo._id}`, todo)
      .then(() => {
          // also update your local state here and redirect to home page
          // mapping over all the todos and updating the one that was edited
          let updatedTodos = this.state.todos.map((singleTodo) => {
              if (singleTodo._id === todo._id) {
                singleTodo.name = todo.name
                singleTodo.description = todo.description
              } 
            return singleTodo
          })

          this.setState({
            todos: updatedTodos
          }, () => {
             this.props.history.push('/')
          })
      })
      .catch(() => {
          console.log('Edit failed')
      })
  }


  render() {
    console.log('App props', this.props)
    return (
      <div >
          <MyNav />
          <Switch>
              <Route exact path={'/'}  render={() => {
                return <TodoList  todos={this.state.todos} />
              }} />
              <Route exact path={'/todo/:todoId'} render={(routeProps) => {
                return <TodoDetail {...routeProps} onDelete={this.handleDeleteTodo} />
              }} />
              <Route path={'/todo/:todoId/edit'} render={(routeProps) => {
                return <EditForm {...routeProps}  onEdit={this.handleEditTodo} />
              }} />
              <Route path={'/add-form'} render={() => {
                 return <AddForm onAdd={this.handleAddTodo}/>
              }} />
          </Switch>
      </div>
    );
  }
}

export default withRouter(App);
