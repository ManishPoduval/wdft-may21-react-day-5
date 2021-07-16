import React, { Component } from 'react'
import {Spinner} from 'react-bootstrap'
import axios from 'axios'
import { Link } from 'react-router-dom'

class TodoDetail extends Component {

    state = {
        todoDetail: null
    }

    // Make your /api/todos/:id requst here
    // check your server side routes to know the right url

    // we're making the todo detail request so that we can show all the todo specific info in the detail page
    async componentDidMount(){
        try {
            //check the `<Routes>` in App.js. That's where the params `todoId` comes from
            let todoId = this.props.match.params.todoId
            let response = await axios.get(`http://localhost:5005/api/todos/${todoId}`)
            this.setState({
                todoDetail: response.data
            })
        }  
        catch(err){
            console.log('Todo fetch failed', err)
        }
    }

    render() {

        if (!this.state.todoDetail) {
            return <Spinner animation="border" variant="primary" />
        } 

        const {todoDetail} = this.state
        return (
            <div>
                <h4>
                    Name: {todoDetail.name}
                </h4>
                <h6>
                    Description: {todoDetail.description}
                </h6>
                <Link to={`/todo/${todoDetail._id}/edit`}>
                    <button  >
                        Edit 
                    </button>
                </Link>
                <button onClick={() => {  this.props.onDelete( todoDetail._id )   } }>
                    Delete
                </button>
            </div>
        )
    }
}

export default TodoDetail