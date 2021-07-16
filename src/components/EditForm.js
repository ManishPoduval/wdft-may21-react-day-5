import React, { Component } from 'react'
import {Button, Spinner} from  'react-bootstrap'
import axios from 'axios'



class EditForm extends Component {

    state = {
        todoDetail: null
    }

    // Make your /api/todos/:id requst here
    // check your server side routes to know the right url

    // we're making the todo detail request so that we can show all the todo specific info in the edit page
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

    handleNameChange = (event) => {
        let newName = event.target.value
        this.setState({
            todoDetail: {...this.state.todoDetail, name:newName }
        })
    }

    handleDescChange = (event) => {
        let newDesc = event.target.value
        this.setState({
            todoDetail: {...this.state.todoDetail, description : newDesc }
        })
    }

    render() {

        if (!this.state.todoDetail) {
            return <Spinner animation="border" variant="primary" />
        } 

        const {todoDetail} = this.state
        const {onEdit} = this.props

        return (
            // passing the event and the updated todo to the onEdit function 
            // so that it can send the updated values of the todo to the DB
            <form onSubmit={ (event) => {onEdit(event, todoDetail ) } } >
				<input onChange={this.handleNameChange} value={todoDetail.name}  name="name"  type="text"  placeholder="Enter name"/>
				<input onChange={this.handleDescChange} value={todoDetail.description} name="description"  type="text"  placeholder="Enter desc"/>
				<Button  type="submit"  >Submit</Button>
			</form>
        )
    }
}

export default EditForm