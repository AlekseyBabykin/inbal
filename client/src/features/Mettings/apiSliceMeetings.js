import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import $api from "../../http";

export const fetchMeetingsInfo = createAsyncThunk(
  "api/fetchMeetingsInfo",
  async () => {
    try {
      const response = await $api.get("/meeting/info");
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchMeetingCreate = createAsyncThunk(
  "api/fetchMeetingCreate",
  async ({
    details,
    date,
    location,
    business_name,
    summary,
    companyBusinessId,
  }) => {
    try {
      const response = await $api.post("/meeting/create", {
        details,
        date,
        location,
        business_name,
        summary,
        companyBusinessId,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchUpdateMeeting = createAsyncThunk(
  "api/fetchUpdateMeeting",
  async ({ meetingId, details, date, location, summary }) => {
    try {
      const response = await $api.put(`/meeting/update/${meetingId}`, {
        details,
        date,
        location,
        summary,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchDeleteMeeting = createAsyncThunk(
  "api/fetchDeleteMeeting",
  async (meetingId) => {
    try {
      const response = await $api.delete(`/meeting/delete/${meetingId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const meetingsSlice = createSlice({
  name: "meeting",
  initialState: {
    meetings: [],
    status: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMeetingsInfo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMeetingsInfo.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.meetings = action.payload.meetings;
      })
      .addCase(fetchMeetingsInfo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchMeetingCreate.fulfilled, (state, action) => {
        state.meetings.push(action.payload.meeting);
      })
      .addCase(fetchUpdateMeeting.fulfilled, (state, action) => {
        const updatedMeeting = action.payload.meeting;
        const existingMeetingIndex = state.meetings.findIndex(
          (meeting) => meeting.id === updatedMeeting.id
        );
        if (existingMeetingIndex !== -1) {
          state.meetings[existingMeetingIndex] = updatedMeeting;
        }
      })
      .addCase(fetchDeleteMeeting.fulfilled, (state, action) => {
        const deletedMeetingId = action.payload.meeting.id;
        state.meetings = state.meetings.filter(
          (meeting) => meeting.id !== deletedMeetingId
        );
      });
  },
});

export default meetingsSlice.reducer;
