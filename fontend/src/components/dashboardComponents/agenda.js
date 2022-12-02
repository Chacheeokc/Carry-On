import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import DateTimePicker from "react-datetime-picker"
import React, { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "./agenda.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-datepicker/dist/react-datepicker.css";

// get local time zone
const locales = {
  'en-US': require("date-fns/locale/en-US")
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

// constant for events
const events = []

// agenda component
function Agenda() {
  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" })
  const [allEvents, setAllEvents] = useState(events)

  // call GET for agenda on render
  useEffect(() => {
    let ignore = false;

    if (!ignore) handleGet();
    return () => { ignore = true; }
  }, []);

  // client-side add agenda item
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
        title: newEvent.title,
        start: newEvent.start,
        end: newEvent.end,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister");
        handleGet(e);
      });
  }

  // client-side get agenda items
  const handleGet = e => {
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

  // client-side delete agenda item
  const handleDelete = async e => {
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

  // agenda HTML components
  return (
    <div>
      <h5> Add a new event: </h5>
      <div class="card-block text-center">
        <input className="agenda-input" placeholder="Add Title" value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />
        <br></br>
        <DateTimePicker
          className="date-picker-input"
          selected={newEvent.start}
          onChange={(start) => setNewEvent({ ...newEvent, start: start })}
          disableClock="true"
          disableCalendar="true"
        ></DateTimePicker>
        <br></br>
        <DateTimePicker
          className="date-picker-input"
          selected={newEvent.end}
          onChange={(end) => setNewEvent({ ...newEvent, end: end })}
          disableClock="true"
          disableCalendar="true"
        ></DateTimePicker>
        <br></br>
        <button className="agenda-button" style={{ marginTop: "10px" }} onClick={async (e) => { await handlePut(e) }}> Add event</button>
        <br></br>
      </div>

      <Calendar
        defaultView="agenda"
        localizer={localizer}
        events={allEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, margin: "50px" }}
        onSelectEvent={handleDelete}
        views={["month", "agenda"]}
      ></Calendar>
    </div>
  )
}

export default Agenda;