import { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../components/common/Header";

const localizer = momentLocalizer(moment);

const CalendarPage = () => {
  const [events, setEvents] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [newTitle, setNewTitle] = useState("");

  const handleSelectSlot = (slotInfo) => {
    setSelectedSlot(slotInfo);
  };

  const handleAddEvent = () => {
    if (newTitle && selectedSlot) {
      const newEvent = {
        title: newTitle,
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

  return (
    <div className="flex-1 overflow-auto relative z-10 bg-gray-900 text-white">
      <Header title="Calendar" />
      <div className="bg-gray-800 p-4 shadow-xl mt-0 mb-0">
        <Calendar
          localizer={localizer}
          events={events}
          selectable
          defaultView="month"
          defaultDate={new Date()}
          min={new Date(1900, 0, 1)}
          max={new Date(2100, 11, 31)}
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectEvent}
          style={{ height: "80vh" }}
          className="custom-calendar text-white"
        />
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
          background-color: #6366f1;
          border: none;
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
