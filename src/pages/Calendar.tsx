import { useEffect } from "react";
import { Navigate } from "react-router-dom";

const Calendar = () => {
  useEffect(() => {
    // Redirect to Google Calendar
    window.location.href = "https://calendar.app.google/RdDQsYo9uaGSbUdC9";
  }, []);

  return <Navigate to="/" replace />;
};

export default Calendar;
