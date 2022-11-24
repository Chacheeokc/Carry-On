import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import "react-datepicker/dist/react-datepicker.css";
import DateTimePicker from "react-datetime-picker"
import React, {useState} from "react";
import { Calendar, dateFnsLocalizer} from "react-big-calendar";
// import "./App.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import { faHandsAmericanSignLanguageInterpreting } from "@fortawesome/free-solid-svg-icons";

const locales = {
  'en-US' : require("date-fns/locale/en-US")
}

const localizer = dateFnsLocalizer({
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
  const [newEvent, setNewEvent] = useState({agendaItem : "", start: "", end: ""})
  const [allEvents, setAllEvents] = useState(events)

  const handlePut = e => {
    const username = window.localStorage.getItem('username');
     fetch("http://localhost:5000/add-agenda-item", {
       method: "PUT",
       crossDomain: true,
       headers: {
         "Content-Type": "application/json",
         Accept: "application/json",
         "Access-Control-Allow-Origin": "*",
       },
       body: JSON.stringify({
         username,
         agendaItem : newEvent.agendaItem,
         startDate : newEvent.start,
         endDate : newEvent.end,
       }),
     })
       .then((res) => res.json())
       .then((data) => {
         console.log(data, "userRegister");
       });
   }

   const handleGet = e =>{
    e.preventDefault();
    const username = window.localStorage.getItem('username');
    fetch("http://localhost:5000/get-agenda-items/", {
      method: "GET",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        'username': username,
      },
    }).then((res) => res.json())
      .then((data) => {
        // this.setState({ packingItems: [...data] });
        // console.log(this.state.packingItems);
      })
   }

  function handleAddEvent(){
    setAllEvents([...allEvents, newEvent])
  }

  return(
    <div>
      <h5> Add New Event </h5>
      <div>
        <input type = "text" placeholder="Add Title" style={{width:"20%", marginRight: "10px"}} value={newEvent.agendaItem} onChange={(e) => setNewEvent({...newEvent, agendaItem: e.target.value})}/>
        <br></br>
        <DateTimePicker placeholderText="Start Date" style={{marginRight: "10px"}} selected ={newEvent.start} onChange={(start)=> setNewEvent({...newEvent, start : start})}></DateTimePicker>
        <DateTimePicker placeholderText="End Date" selected ={newEvent.end} onChange={(end)=> setNewEvent({...newEvent, end : end})}></DateTimePicker>
        {/* //await setAllEvents([...allEvents, newEvent]), */}
        <button className="btn btn-success" style={{marginTop: "10px"}} onClick={async(e) => {await handlePut(e)}}> Add event</button>
      </div>
     
      <Calendar 
      defaultView="agenda" 
      localizer= {localizer} 
      events={allEvents} 
      startAccessor="start" 
      endAccessor="end" 
      style ={{height: 500, margin : "50px"}}
      ></Calendar>
    </div>
  )
}

  export default Agenda;