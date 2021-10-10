import React, { Component } from 'react';
import Collapsible from 'react-collapsible';
import databaseUtils from './databaseUtils';
import {GLOBAL_VARIABLES} from './globals';
import CalendarSidebarItem from './Sidebar'

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const daysInWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const daysMap = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6
};



function Task(props){
  console.log(props);
  let description = "No Description";
  if(props.task.description !== undefined){
    description = props.task.description;
  }
  
  return (
    <div>
      <button onClick={() => props.delete(props.taskId)}><i class="far fa-trash-alt"></i></button>
      <Popup trigger={<button><i class="far fa-edit"></i></button>} position="right center">
        {close => (
              <div classname="taskEdit">
                <form>
                  <label htmlFor="name">Edit Task</label>
                  <input type='text' 
                         name='name'
                         placeholder="Task Name" 
                         onChange={props.handleChange}
                         required/>
                  <br />
                  <label htmlFor="description">Description</label>
                  <input type="text" 
                        name="description"
                        placeholder="Description"
                        onChange={this.handleChange}></input>
                  <label htmlFor="dueDate">Due Date</label>
                  <input type="datetime-local"
                         name="dueDate"
                         onChange={this.handleChange}
                         required></input>
                  <button onClick={() => props.modify(props.taskId)}>Update</button>
                </form>
              </div>
            )}
      </Popup>
      <Collapsible trigger={this.state.task.name}>
        <p>Description: {description}</p>
        <p>Owner: {this.state.task.user}</p>
        <p>Due Date: {this.state.task.dueDate}</p>
      </Collapsible>
    </div>
  );
}

export default Task;