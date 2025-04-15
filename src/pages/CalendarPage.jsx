import { useState } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../components/common/Header";
import { ChevronLeft, ChevronRight } from "lucide-react";

const localizer = momentLocalizer(moment);

const CalendarPage = () => {
  const [events, setEvents] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [currentView, setCurrentView] = useState(Views.MONTH);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleSelectSlot = (slotInfo) => {
    setSelectedSlot(slotInfo);
  };

  const handleAddEvent = () => {
    if (newTitle.trim() && selectedSlot) {
      const newEvent = {
        title: newTitle.trim(),
        start: selectedSlot.start,
        end: selectedSlot.end,
      };
      setEvents([...events, newEvent]);
      setSelectedSlot(null);
      setNewTitle("");
    }
  };

  const handleSelectEvent = (eventToDelete) => {
    if (window.confirm(`Delete event: "${eventToDelete.title}"?`)) {
      setEvents(events.filter((event) => event !== eventToDelete));
    }
  };

  const CustomToolbar = ({ label, onNavigate, onView }) => (
    <div className="rbc-toolbar flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 py-2 gap-3">
      <div className="flex items-center gap-2">
        <button
          onClick={() => {
            onNavigate("TODAY");
            setCurrentDate(new Date());
          }}
          className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded"
        >
          Today
        </button>
        <button
          onClick={() => setSidebarOpen((prev) => !prev)}
          className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded"
        >
          {sidebarOpen ? "Hide Events" : "Show Events"}
        </button>
      </div>
      <div className="text-xl font-semibold">{label}</div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => {
            const newDate = moment(currentDate).subtract(1, currentView).toDate();
            setCurrentDate(newDate);
            onNavigate("PREV");
          }}
          className="bg-gray-700 hover:bg-gray-600 p-2 rounded"
          title="Previous"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={() => {
            const newDate = moment(currentDate).add(1, currentView).toDate();
            setCurrentDate(newDate);
            onNavigate("NEXT");
          }}
          className="bg-gray-700 hover:bg-gray-600 p-2 rounded"
          title="Next"
        >
          <ChevronRight />
        </button>
        <select
          onChange={(e) => {
            const view = e.target.value;
            onView(view);
            setCurrentView(view);
          }}
          value={currentView}
          className="bg-gray-700 text-white rounded px-2 py-1 ml-2"
        >
          <option value="month">Month</option>
          <option value="week">Week</option>
          <option value="day">Day</option>
        </select>
      </div>
    </div>
  );

  return (
    <div className="flex-1 h-screen overflow-auto relative z-10 bg-gray-900 text-white">
      <Header title="Calendar" />

      <div className="flex h-screen">
        {/* Left Sidebar */}
        {sidebarOpen && (
          <div className="w-72 bg-gray-900 p-4 border-r border-gray-700 hidden sm:block">
            <h2 className="text-lg font-semibold text-white mb-4">Events</h2>
            {events.length === 0 ? (
              <p className="text-gray-400">No events</p>
            ) : (
              events.map((event, idx) => (
                <div
                  key={idx}
                  className="bg-green-400 text-black p-3 rounded mb-3 cursor-pointer hover:bg-green-500 transition"
                  onClick={() => handleSelectEvent(event)}
                >
                  <div className="font-semibold">{event.title}</div>
                  <div className="text-sm">
                    {moment(event.start).format("MMM D, YYYY")}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Calendar */}
        <div className="flex-1 h-screen bg-gray-800 p-4 shadow-xl mt-0">
          <Calendar
            localizer={localizer}
            events={events}
            selectable
            date={currentDate}
            view={currentView}
            onView={(view) => setCurrentView(view)}
            onNavigate={(date) => setCurrentDate(date)}
            min={new Date(1900, 0, 1)}
            max={new Date(2100, 11, 31)}
            onSelectSlot={handleSelectSlot}
            onSelectEvent={handleSelectEvent}
            components={{ toolbar: CustomToolbar }}
            style={{ height: "80vh" }}
            className="custom-calendar text-white"
          />
        </div>
      </div>

      {/* Sidebar for Add Event */}
      <AnimatePresence>
        {selectedSlot && (
          <motion.div
            className="fixed top-0 right-0 h-full w-full sm:w-96 bg-gray-900 shadow-lg z-50 border-l border-gray-700"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-6 flex flex-col h-full">
              <h3 className="text-xl font-bold text-indigo-400 mb-4">Add Event</h3>
              <input
                type="text"
                className="w-full px-4 py-2 mb-4 bg-gray-800 text-white border border-gray-700 rounded focus:outline-none"
                placeholder="Event Title"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
              <div className="flex justify-end mt-auto gap-3">
                <button
                  className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded"
                  onClick={() => setSelectedSlot(null)}
                >
                  Cancel
                </button>
                <button
                  className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded"
                  onClick={handleAddEvent}
                >
                  Add
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom calendar styles */}
      <style>{`
        .custom-calendar .rbc-toolbar {
          background-color: #1f2937;
          color: #f3f4f6;
          padding: 1rem;
          border-radius: 0.5rem;
        }
        .custom-calendar .rbc-toolbar button {
          background-color: #374151;
          color: #e5e7eb;
          border: none;
          padding: 0.5rem 1rem;
          margin: 0 0.25rem;
          border-radius: 0.375rem;
        }
        .custom-calendar .rbc-toolbar button.rbc-active {
          background-color: #4f46e5;
          color: white;
        }
        .custom-calendar .rbc-month-view {
          background-color: #111827;
        }
        .custom-calendar .rbc-date-cell {
          color: #9ca3af;
        }
        .custom-calendar .rbc-selected-cell {
          background-color: #4f46e5 !important;
          color: white;
        }
        .custom-calendar .rbc-event {
          background-color: #34d399;
          border: none;
          color: black;
        }
        .custom-calendar .rbc-day-bg.rbc-today {
          background-color: #1e40af;
        }
        .custom-calendar .rbc-header {
          background-color: #1f2937;
          color: #f9fafb;
          padding: 0.5rem;
        }
      `}</style>
    </div>
  );
};

export default CalendarPage;
