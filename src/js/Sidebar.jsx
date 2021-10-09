import React, { Component } from 'react';
import Popup from 'reactjs-popup';
import Collapsible from 'react-collapsible';
import 'reactjs-popup/dist/index.css';
import databaseUtils from './databaseUtils';
import {GLOBAL_VARIABLES} from './globals';

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      calendars: GLOBAL_VARIABLES.calendars
    };
    this.newCalendarSubmit = this.newCalendarSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  newCalendarSubmit(e) {
    e.preventDefault();
    let newCalendar = {
      user: GLOBAL_VARIABLES.userId,
      parent: GLOBAL_VARIABLES.selectedCalendarId,
      children: [],
      name: this.state.name,
      color: this.state.color
    };
    databaseUtils.addCalendar(newCalendar)
    .then(newCalId => {
      newCalendar._id = newCalId;
      GLOBAL_VARIABLES.calendars.push(newCalendar);
      this.state.calendars.push(newCalendar);
    })
  }
  
  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
        [name]: value
    });
  }

  render() {
    let calendarSidebarItems = [];
    this.state.calendars.forEach(calendar => {
      calendarSidebarItems.push(<CalendarSidebarItem name={calendar.name} children={calendar.children}/>)
    })
    // this.setState({
    //   calendarSidebarItems: calendarSidebarItems
    // });

    return (
      <div className='sidebar'>
        <div className='sidebar-calendars'>
          <br />
          <h3>Calendars</h3>
          <Popup trigger={<button>New Calendar</button>} position="right center">
            {close => (
              <div classname="calendarSubmit">
                <form>
                  <label htmlFor="name">New Calendar</label>
                  <input type='text' 
                         name='name'
                         placeholder="Calendar Name" 
                         onChange={this.handleChange}/>
                  <br />
                  <input type="color" name="color" onChange={this.handleChange} />
                  <button onClick={this.newCalendarSubmit}>Create Calendar</button>
                </form>
              </div>
            )}
          </Popup>
          <div className="calendarSidebarItems">
            {calendarSidebarItems}
          </div>
        </div>
      </div>
    );
  }
}

class CalendarSidebarItem extends Component {
  constructor(props) {
    super(props);
    this.state = props;
  }

  render() {
    let children = [];
    this.state.children.forEach(child => {
      children.push(<CalendarSidebarItem name={child.name} children={child.children}/>)
    });
    return (
      <Collapsible trigger={this.state.name}>
        {children}
      </Collapsible>
    );
  }
}

export default Sidebar;