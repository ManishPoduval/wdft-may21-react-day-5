import React, { useState, useEffect } from 'react'
import {Spinner} from 'react-bootstrap'
import axios from 'axios'
import { Link } from 'react-router-dom'

function TodoDetail(props) {

    const [todoDetail, updateTodoDetail] = useState(null)

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


    if (!todoDetail) {
        return <Spinner animation="border" variant="primary" />
    } 

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
            <button onClick={() => {  props.onDelete( todoDetail._id )   } }>
                Delete
            </button>
        </div>
    )
}


export default TodoDetail