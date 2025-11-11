import { useEffect } from "react";
import { Navigate } from "react-router-dom";

const Calendar = () => {
  useEffect(() => {
    // Redirect to Google Calendar
    window.location.href = "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ0yOuKvF_kkyuN7VW0l2y8U0V0hxKHQVDPXVBELJ_VB3SDKMC9TVEjT5sK5m4AoEfN8Gc4MqmcY";
  }, []);

  return <Navigate to="/" replace />;
};

export default Calendar;
