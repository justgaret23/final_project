/*
 * Database connectivity module; handles all database operations for
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const eventObj = {
    user: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true
    },
    startTime: {
        type: String,
        required: false
    },
    endTime: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    calendar: {
        type: String,
        required: true
    }
}
const eventSchema = new Schema(eventObj, { collection: 'events' });
const Event = mongoose.model('Event', eventSchema);

const taskObj = {
    user: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    startTime: {
        type: Date,
        required: false
    },
    endTime: {
        type: Date,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    dueDate: {
        type: Date,
        required: false
    }
}
const taskSchema = new Schema(taskObj, { collection: 'tasks' });
const Task = mongoose.model('Task', taskSchema);

const calendarObj = {
    user: {
        type: String,
        required: true
    },
    parent: {
        type: String,
        required: false
    },
    children: {
        type: Array,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    }
}
const calendarSchema = new Schema(calendarObj, { collection: 'calendars' });
const Calendar = mongoose.model('Calendar', calendarSchema);

module.exports = function(db){
    let module = {};

    module.getAllEvents = async function(userID) {
        await mongoose.connect(db);
        const events = await Event.find({ user: userID });
        return events;
    }

    module.addEvent = async function(event) {
        await mongoose.connect(db);
        let newObjId = '';
        let newEvent = new Event(event);

        await newEvent.save()
        .then(newDbEventObject => newObjId = newDbEventObject._id.toString())
        .catch(err => console.log('Error ', err));

        if(newObjId) return newObjId;
        return 'ERROR';
    }

    module.deleteEvent = async function(objectId) {
        await mongoose.connect(db);
        let error;
        await Event.deleteOne({ _id: ObjectId(objectId) }, err => {
            if(err) error = err;
        })
        .clone();
        if(error) return error;
        return 'Completed';
    }

    module.updateEvent = async function(event) {
        await mongoose.connect(db);
        let error;
        let updateEventObj = event;
        let eventId = ObjectId(updateEventObj._id);
        delete updateEventObj._id;
        updateEventObj._id = ObjectId(updateEventObj._id);
        await Event.findByIdAndUpdate({_id: eventId }, updateEventObj, (err, res) => {
            if(err) error = err;
        })
        .clone()
        .catch(err => console.log(err));
        if(error) return error;
        return 'Completed';
    }

    module.getAllCalendars = async function(userID) {
        await mongoose.connect(db);
        const calendars = await Calendar.find({ user: userID });
        return calendars;
    }

    module.addCalendar = async function(calendar) {
        await mongoose.connect(db);
        let newObjId = '';
        let newCalendar = new Calendar(calendar);

        await newCalendar.save()
        .then(newDbCalendarObject => newObjId = newDbCalendarObject._id.toString())
        .catch(err => console.log('Error ', err));

        if(newObjId) return newObjId;
        return 'ERROR';
    }

    module.deleteCalendar = async function(objectId) {
        await mongoose.connect(db);
        let error;
        await Calendar.deleteOne({ _id: ObjectId(objectId) }, err => {
            if(err) error = err;
        })
        .clone();
        if(error) return error;
        return 'Completed';
    }

    module.updateCalendar = async function(calendar) {
        await mongoose.connect(db);
        let error;
        let updateCalendarObj = calendar;
        let calendarId = ObjectId(updateCalendarObj._id);
        delete updateCalendarObj._id;
        await Calendar.findByIdAndUpdate({_id: calendarId}, updateCalendarObj, (err, res) => {
            if(err) error = err;
        })
        .clone()
        .catch(err => console.log(err));
        if(error) return error;
        return 'Completed';
    }

    module.getAllTasks = async function(userID) {
        await mongoose.connect(db);
        const tasks = await Task.find({ user: userID });
        return tasks;
    }

    module.addTask = async function(task) {
        await mongoose.connect(db);
        let newObjId = '';
        let newTask = new Task(task);

        await newTask.save()
        .then(newDbTaskObject => newObjId = newDbTaskObject._id.toString())
        .catch(err => console.log('Error ', err));

        if(newObjId) return newObjId;
        return 'ERROR';
    }

    module.deleteTask = async function(objectId) {
        await mongoose.connect(db);
        let error;
        await Task.deleteOne({ _id: ObjectId(objectId) }, err => {
            if(err) error = err;
        })
        .clone();
        if(error) return error;
        return 'Completed';
    }

    module.updateTask = async function(task) {
        await mongoose.connect(db);
        let error;
        let updateTaskObj = task;
        let taskId = ObjectId(updateTaskObj._id);
        delete updateTaskObj._id;
        await Task.findByIdAndUpdate({ _id: taskId }, updateTaskObj, (err, res) => {
            if(err) error = err;
        })
        .clone()
        .catch(err => console.log(err));
        if(error) return error;
        return 'Completed';
    }

    return module;
}