import React, { Component } from 'react'
import {Link} from 'react-router-dom'

class TodoList extends Component {

    // Props will look like this
    /*

    this.props = {
        todos: [{},  . . . . . {}]
    }

    */

    render() {
        const {todos} = this.props
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
}

export default TodoList