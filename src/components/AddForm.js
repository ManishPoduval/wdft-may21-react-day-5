import React, { Component } from  'react'
import {Button} from  'react-bootstrap'

class AddForm extends Component {

    // my props will look like this
    /*
        this.props = {
            onAdd : func
        }

    */
    
	render() {
		return (
			<form onSubmit={this.props.onAdd}  >
				<input  name="name"  type="text"  placeholder="Enter name"/>
				<input  name="description"  type="text"  placeholder="Enter desc"/>
				<Button  type="submit"  >Submit</Button>
			</form>
		)
	}
}

export  default AddForm