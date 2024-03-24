import Auth from "./pages/Auth";
import BusinessPage from "./pages/BusinessPage";
import MeetingStatisticsPage from "./pages/MeetingStatisticsPage";
import MeetingsPage from "./pages/MeetingsPage";
import {
  BUSINESSPAGE_ROUTE,
  MEETINGSTATISTICPAGE_ROUTE,
  SIGNIN_ROUTE,
  SIGNUP_ROUTE,
} from "./utils/const";

export const pablicRoutes = [
  {
    path: SIGNIN_ROUTE,
    Component: Auth,
  },
  {
    path: SIGNUP_ROUTE,
    Component: Auth,
  },
  {
    path: BusinessPage,
    Component: BUSINESSPAGE_ROUTE,
  },
  {
    path: MeetingsPage,
    Component: MEETINGSPAGE_ROUTE,
  },
  {
    path: MeetingStatisticsPage,
    Component: MEETINGSTATISTICPAGE_ROUTE,
  },
];
