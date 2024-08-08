
"use client";

import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

export default function Home() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/calendar?personId=salma.ksantini@esprit.tn');
        const data = await response.json();
        if (response.ok) {
          setEvents(data.events.map(event => ({
            title: event.title,
            start: event.start,
            end: event.end,
            description: event.description
          })));
        } else {
          console.error('Error fetching events:', data.error);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-full h-[800px]">
        
          <FullCalendar
            plugins={[
              dayGridPlugin,
              //interactionPlugin,
              //timeGridPlugin
            ]}
            initialView={"dayGridMonth"}
            headerToolbar={{
              start: "today prev,next",
              center: "title",
              end: "dayGridMonth",
              //end: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            height={500}
            events={events}
          />
        
      </div>
    </main>
  );
}
