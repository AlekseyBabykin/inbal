import "./App.css";
import Auth from "./pages/Auth";
import { Routes, Route, Navigate } from "react-router-dom";
import {
  BUSINESSPAGE_ROUTE,
  MEETINGSPAGE_ROUTE,
  MEETINGSTATISTICPAGE_ROUTE,
  SIGNIN_ROUTE,
  SIGNUP_ROUTE,
} from "./utils/const";
import NavBar from "./components/NavBar";
import BusinessPage from "./pages/BusinessPage";
import MeetingsPage from "./pages/MeetingsPage";
import MeetingStatisticsPage from "./pages/MeetingStatisticsPage";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="*" element={<Navigate to={SIGNUP_ROUTE} replace />} />
        <Route path={SIGNIN_ROUTE} element={<Auth />} />
        <Route path={SIGNUP_ROUTE} element={<Auth />} />
        <Route path={BUSINESSPAGE_ROUTE} element={<BusinessPage />} />
        <Route path={MEETINGSPAGE_ROUTE} element={<MeetingsPage />} />
        <Route
          path={MEETINGSTATISTICPAGE_ROUTE}
          element={<MeetingStatisticsPage />}
        />
      </Routes>
    </>
  );
}

export default App;
