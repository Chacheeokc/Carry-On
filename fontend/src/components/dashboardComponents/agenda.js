//new stuff
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// old stuff
import React, { Component, useState} from "react";
import { Calendar, momentLocalizer , dateFnsLocalizer} from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
// import "./App.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

//new stuff
const locales = {
  'en-US' : require("date-fns/locale/en-US")
}

const newLocalizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const events = [
  {
    title: "Big Meeting",
    allDay: true,
    start: new Date(2022, 10, 10, 10, 30, 0, 0),
    end: new Date(2022, 10, 10, 12, 30, 0, 0),
},
{
    title: "Vacation",
    start: new Date(2022, 10, 10, 10, 30, 0, 0),
    end: new Date(2022, 10, 10, 10, 30, 0, 0),
},
{
    title: "Conference",
    start: new Date(2022, 10, 10, 10, 30, 0, 0),
    end: new Date(2022, 10, 10, 10, 30, 0, 0),
},
]

function Agenda(){
  const [newEvent, setNewEvent] = useState({title : "", start: "", end: ""})
  const [allEvents, setAllEvents] = useState(events)

  function handleAddEvent(){
    setAllEvents([...allEvents, newEvent])
  }

  return(
    <div>
      <h5> Add New Event </h5>
      <div>
        <input type = "text" placeholder="Add Title" style={{width:"20%", marginRight: "10px"}} value={newEvent.title} onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}/>
        {/* <DatePicker placeholderText="Start Date" style={{marginRight: "10px"}} selected ={newEvent.start} onChange={(start)=> setNewEvent({...newEvent, start : start})}></DatePicker>
        <DatePicker placeholderText="End Date" selected ={newEvent.end} onChange={(end)=> setNewEvent({...newEvent, end : end})}></DatePicker> */}
        <button style={{marginTop: "10px"}} onClick={handleAddEvent}> Add event</button>
      </div>
     
      <Calendar 
      defaultView="agenda" 
      localizer= {newLocalizer} 
      events={allEvents} 
      startAccessor="start" 
      endAccessor="end" 
      style ={{height: 500, margin : "50px"}}
      ></Calendar>
    </div>
  )
}



//old stuff
// class Agenda extends Component{
//   state = {
//     events: [
//       {
//         start: moment().toDate(),
//         end: moment()
//           .add(1, "days")
//           .toDate(),
//         title: "Some title"
//       }
//     ]
//   };

//   onEventResize = (data) => {
//     const { start, end } = data;

//     this.setState((state) => {
//       state.events[0].start = start;
//       state.events[0].end = end;
//       return { events: [...state.events] };
//     });
//   };

//   onEventDrop = (data) => {
//     console.log(data);
//   };

//   render(){
//   return (
//     <div className="App">
//       <DnDCalendar
//         localizer={localizer}
//         defaultDate={new Date()}
//         defaultView="agenda"
//         events={this.state.events}
//         style={{ height: "100vh" }}
//         onEventDrop={this.onEventDrop}
//         onEventResize={this.onEventResize}
//         resizable
//       />
//     </div>
//   )
//   }
//   };

  export default Agenda;