import React, { useState, useEffect } from 'react'
import {Button, Spinner} from  'react-bootstrap'
import axios from 'axios'

function EditForm(props) {

    const [todoDetail, updateTodoDetail] = useState(null)

    // componentDidMount
    useEffect(async () => {
        try {
            //check the `<Routes>` in App.js. That's where the params `todoId` comes from
            let todoId = props.match.params.todoId
            let response = await axios.get(`http://localhost:5005/api/todos/${todoId}`)
            updateTodoDetail(response.data)
        }  
        catch(err){
            console.log('Todo fetch failed', err)
        }
    }, [])

    const handleNameChange = (event) => {
        let newName = event.target.value
        updateTodoDetail({...todoDetail, name:newName })
    }

    const handleDescChange = (event) => {
        let newDesc = event.target.value
        updateTodoDetail({...todoDetail, description :newDesc })
    }

    if (!todoDetail) {
        return <Spinner animation="border" variant="primary" />
    } 

    const {onEdit} = props

    return (
        // passing the event and the updated todo to the onEdit function 
        // so that it can send the updated values of the todo to the DB
        <form onSubmit={ (event) => {onEdit(event, todoDetail ) } } >
            <input onChange={handleNameChange} value={todoDetail.name}  name="name"  type="text"  placeholder="Enter name"/>
            <input onChange={handleDescChange} value={todoDetail.description} name="description"  type="text"  placeholder="Enter desc"/>
            <Button  type="submit"  >Submit</Button>
        </form>
    )
}


export default EditForm