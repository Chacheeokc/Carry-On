import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import "react-datepicker/dist/react-datepicker.css";
import DateTimePicker from "react-datetime-picker"
import React, {useState} from "react";
import { Calendar, dateFnsLocalizer} from "react-big-calendar";
// import ".../App.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";

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

const events = []

function Agenda(){
  const [newEvent, setNewEvent] = useState({title : "", start: "", end: ""})
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
         title : newEvent.title,
         start : newEvent.start,
         end : newEvent.end,
       }),
     })
       .then((res) => res.json())
       .then((data) => {
         console.log(data, "userRegister");
       });
   }

   const handleGet = e =>{
    if(!(e?.isDelete)){
      e.preventDefault();
    }
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
        console.log(allEvents);
        setAllEvents([...data]);
        console.log(allEvents);
      })
   }

 const handleDelete = async e => {
    e.isDelete = true;
    const title = e.title; 
    console.log(title);
    const username = window.localStorage.getItem('username');
    fetch("http://localhost:5000/delete-agenda-item", {
      method: "DELETE",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        title,
        username
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister");
        handleGet(e);
      });
  }

  return(
    <div>
      <h5> Add New Event </h5>
      <div>
        
        <input type = "text" placeholder="Add Title" style={{width:"20%", marginRight: "10px"}} value={newEvent.title} onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}/>
        <br></br>
        <DateTimePicker placeholderText="Start Date" style={{marginRight: "10px"}} selected ={newEvent.start} onChange={(start)=> setNewEvent({...newEvent, start : start})}></DateTimePicker>
        <DateTimePicker placeholderText="End Date" selected ={newEvent.end} onChange={(end)=> setNewEvent({...newEvent, end : end})}></DateTimePicker>
        <button className="btn btn-success" style={{marginTop: "10px"}} onClick={async(e) => {await handlePut(e)}}> Add event</button>
        <br></br>
        <button className="btn btn-success" onClick={async(e) => {await handleGet(e)}}> get your events </button>
      </div>
     
      <Calendar 
      defaultView="agenda" 
      localizer= {localizer} 
      events={allEvents} 
      startAccessor="start" 
      endAccessor="end" 
      style ={{height: 500, margin : "50px"}}
      onSelectEvent={handleDelete}
      views={["month", "agenda"]}
      ></Calendar>
    </div>
  )
}

  export default Agenda;