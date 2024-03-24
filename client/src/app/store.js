import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/Users/apiSlice";
import companySlice from "../features/Business/apiSliceBusiness.js";
import meetingsSlice from "../features/Mettings/apiSliceMeetings.js";

export default configureStore({
  reducer: {
    auth: authSlice,
    company: companySlice,
    meeting: meetingsSlice,
  },
});
