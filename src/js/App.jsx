import React from 'react';
import Sidebar from './Sidebar';
import Calendar from './Calendar';
import '../css/App.css';
import databaseUtils from './databaseUtils';
import {GLOBAL_VARIABLES} from './globals';
import { ThreeSixtySharp } from '@material-ui/icons';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      events: [],
      calendars: [],
      tasks: [],
      userId: '',
      selectedCalendarId: '',
      eventsLoaded: false,
      calendarsLoaded: false,
      tasksLoaded: false,
      userIdLoaced: false
    };
    this.changeSelectedCalendar = this.changeSelectedCalendar.bind(this);
  }

  componentWillMount() {
    this.retrieveAllGlobals();
  }

  changeSelectedCalendar(calId) {
    GLOBAL_VARIABLES.selectedCalendarId = calId;
    this.setState({
      selectedCalendarId: calId
    });
  }
  
  retrieveAllGlobals() {
    databaseUtils.getUserID()
    .then(userID => {
      GLOBAL_VARIABLES.userId = userID;
      this.setState({
        userId: userID,
        userIdLoaced: true
      });
    });

    databaseUtils.getAllCalendars()
    .then(calendars => {
      let calArray = JSON.parse(calendars);
      let calendarsObj = {};

      calArray.forEach(calendar => {
        calendarsObj[calendar._id] = calendar;
      })

      GLOBAL_VARIABLES.calendars = calendarsObj;
      this.setState({
        calendars: GLOBAL_VARIABLES.calendars,
        calendarsLoaded: true
      });
    });

    databaseUtils.getAllEvents()
    .then(events => {
      GLOBAL_VARIABLES.events = JSON.parse(events);
      this.setState({
        events: events,
        eventsLoaded: true
      });
    });

    databaseUtils.getAllTasks()
    .then(tasks => {
      GLOBAL_VARIABLES.tasks = JSON.parse(tasks);
      this.setState({
        tasks: tasks,
        tasksLoaded: true
      });
    });
  }

  render() {
    console.log('App cal id: ', this.state.selectedCalendarId);
    return (
      <div>
        {
          (this.state.eventsLoaded && this.state.calendarsLoaded && this.state.tasksLoaded && this.state.userIdLoaced)
          ? (<div className="App"> <Sidebar changeSelectedCalendar={this.changeSelectedCalendar}/> <Calendar selectedCalendarId={this.state.selectedCalendarId}/> </div>)
          : (<p>Loading</p>)
        }
      </div>
    );
  }
}

export default App;
