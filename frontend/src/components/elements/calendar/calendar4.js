import React, { useEffect, useState, useSyncExternalStore } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import TimeGridPlugin from "@fullcalendar/timegrid";
import { eventslist } from "./eventsArray";
import './calendar.scss';
import axios from "axios";

const DemoApp = ({ setPatientId, mydata }) => {

  const userdata = JSON.parse(localStorage.getItem('token'));

  const [mark, setMark] = useState(null);
  const [pat_enc_csn_id, setPat_enc_csn_id] = useState('');

  useEffect(() => {
    if (mark && pat_enc_csn_id && userdata) {
      console.log(mark, 'mark');
      
      axios.post('http://localhost:8000/user/eventMark/', { userdata, mark, pat_enc_csn_id })
      .then((res) => console.log(res))
      .catch(err => console.log(err));
    }

  }, [mark, pat_enc_csn_id])

  const renderEventContent = (eventInfo) => (
    <div className="event-info">
      {/* <b>{eventInfo.event.id}</b> */}
      <b>{eventInfo.timeText}</b>
      <div className="event-mark">
        <i>{eventInfo.event.title}</i>
        {/* {eventInfo.event._def.extendedProps.mark === 1 ? (
          <div className="event-mark-ok"> &#9989; </div>

        ) : (
          eventInfo.event._def.extendedProps.mark === 0 ? (
            <div className="event-mark-no"> &#10060;</div>
          ) : (
            <div className="event-mark-sub"> */}

        {mark === 1
          ? <div className="event-mark-ok"> &#9989; </div>
          : mark === 2
            ? <div className="event-mark-no"> &#10060;</div>
            : null
        }
        {/* </div>

          ))} */}
      </div>
      <a>{eventInfo.event._def.extendedProps.pName}</a>
      <a style={{ color: "red", fontWeight: 800 }}>noshow_prob:{eventInfo.event._def.extendedProps.noshow_pred_probability}</a>
      <div className="btn-calendar">
        <button className="btn-ok" onClick={() => { setMark(1) }}>Keep</button>
        <button className="btn-no" onClick={() => { setMark(2) }}>Cancel</button>
      </div>
    </div>
  );

  // const handleShowData = (info) => {
  //   let id = info.event._def.extendedProps.paId;
  //   console.log(id, 'id');
  //   return setPatientId(id);

  // };

  const style = {
    margin: "5px 10px",
    color: "white",
    top: "10px",
    position: "relative",
    width: "98%",
    cursor: 'pointer'
    // backgroundColor: 'wheat'
  };

  return (
    <div style={style}>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, TimeGridPlugin]}
        initialView="timeGridWeek"
        events={mydata}
        // dateClick={handleDateClick}
        eventContent={renderEventContent}
        headerToolbar={{
          start:
            "prevYear,nextYear dayGridMonth,timeGridWeek,timeGridDay",
          center: "title",
          end: "prev,today,next",
        }}
        height={450}
        slotEventOverlap
        allDaySlot
        dayHeaderFormat={{ weekday: "long" }}
        firstDay={1}
        navLinks
        weekNumbers
        // selectable={false}
        selectMirror
        nowIndicator
        businessHours
        eventColor="#495464"
        eventTextColor="wheat"
        displayEventTime
        eventTimeFormat={{
          hour: "numeric",
          minute: "2-digit",
          meridiem: "short",
        }}
        eventClick={(info) => {
          console.log(info);
          setPatientId(info.event._def.extendedProps.paId)
          setPat_enc_csn_id(info.event._def.extendedProps.pat_enc_csn_id);

        }}
        // editable
        eventResizableFromStart
        droppable
        dayMaxEventRows
        locale={'en'}
        timeZone="UTC"
      />

    </div>
  );
};

export default DemoApp;
