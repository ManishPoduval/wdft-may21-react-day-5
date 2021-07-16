import React from 'react'
import {Link} from 'react-router-dom'

function TodoList(props) {

    const {todos} = props

    return (
        <div>
            {
                todos.map((todo, i) => {
                    return <p key={i}>
                        <Link to={`/todo/${todo._id}`}>{todo.name}</Link>
                        </p>
                })
            }
        </div>
    )
}

export default TodoList