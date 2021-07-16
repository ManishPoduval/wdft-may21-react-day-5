import { Switch, Route, withRouter } from "react-router-dom";
import React, { useState, useEffect }from 'react'
import MyNav from './components/MyNav'
import axios from 'axios'
import TodoList from "./components/TodoList";
import TodoDetail from "./components/TodoDetail";
import AddForm from "./components/AddForm";
import EditForm from './components/EditForm'

function App(props) {

  const [todos, updateTodos] = useState([])

  useEffect(async () => {
    try {
      // fetch all the initial todos to show on the home page
      let response = await axios.get(`http://localhost:5005/api/todos`)
      updateTodos(response.data)
    }  
    catch(err){
      console.log('Todo fetch failed', err)
    }
  }, [])

  // -----------------------------------------------------
  // ------- Conditional componentDidUpdate --------------
  // -----------------------------------------------------
  // the block of code below will run whenever your state `todos` is updated

  useEffect(() => {
    props.history.push('/')
  }, [todos])

  // ------------------------------------------------------
  // ------------------------------------------------------
  // ------------------------------------------------------

  const handleAddTodo = async (event) => {

    event.preventDefault()

    try {
      let newTodo = {
        name: event.target.name.value,
        description: event.target.description.value,
        completed: false
      }
      let response = await axios.post(`http://localhost:5005/api/create`, newTodo)
      updateTodos([response.data, ...todos])
    }  
    catch(err){
      console.log('Todo fetch failed', err)
    }
   
  }

  const handleDeleteTodo = async (todoId) => {
    try {
      // delete the todo from the DB
      await axios.delete(`http://localhost:5005/api/todos/${todoId}`)
      // and then also filter and remove the todo from the local state
      let filteredTodos = todos.filter((todo) => {
        return todo._id !== todoId
      })
      updateTodos(filteredTodos)

    }  
    catch(err){
      console.log('Todo fetch failed', err)
    }
    
  }

  const handleEditTodo = async (event, todo) => {
    event.preventDefault()
    try {
      // pass a second parameter to the patch for sending info to your server inside req.body
      await axios.patch(`http://localhost:5005/api/todos/${todo._id}`, todo)
      // and then also filter and remove the todo from the local state
      // also update your local state here and redirect to home page
      // mapping over all the todos and updating the one that was edited
      let updatedTodos = todos.map((singleTodo) => {
        if (singleTodo._id === todo._id) {
          singleTodo.name = todo.name
          singleTodo.description = todo.description
        } 
        return singleTodo
      })
      updateTodos(updatedTodos)
    }  
    catch(err){
      console.log('Todo fetch failed', err)
    }

  }

  return (
    <div >
        <MyNav />
        <Switch>
            <Route exact path={'/'}  render={() => {
              return <TodoList  todos={todos} />
            }} />
            <Route exact path={'/todo/:todoId'} render={(routeProps) => {
              return <TodoDetail {...routeProps} onDelete={handleDeleteTodo} />
            }} />
            <Route path={'/todo/:todoId/edit'} render={(routeProps) => {
              return <EditForm {...routeProps}  onEdit={handleEditTodo} />
            }} />
            <Route path={'/add-form'} render={() => {
               return <AddForm onAdd={handleAddTodo}/>
            }} />
        </Switch>
    </div>
  );
}




export default withRouter(App);
