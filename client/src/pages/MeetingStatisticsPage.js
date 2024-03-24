import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { useSelector, useDispatch } from "react-redux";
import { fetchMeetingsInfo } from "../features/Mettings/apiSliceMeetings";

const MeetingStatisticsPage = () => {
  const meetings = useSelector((state) => state.meeting.meetings);
  const dispatch = useDispatch();

  const groupMeetingsByDay = meetings.reduce((acc, meeting) => {
    const date = new Date(meeting.date).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = 0;
    }
    acc[date]++;
    return acc;
  }, {});

  const groupMeetingsByMonth = meetings.reduce((acc, meeting) => {
    const date = new Date(meeting.date);
    const month = date.toLocaleString("default", { month: "long" });
    if (!acc[month]) {
      acc[month] = 0;
    }
    acc[month]++;
    return acc;
  }, {});

  const groupMeetingsByDayOfWeek = meetings.reduce((acc, meeting) => {
    const date = new Date(meeting.date);
    const dayOfWeek = date.toLocaleString("default", { weekday: "long" });
    if (!acc[dayOfWeek]) {
      acc[dayOfWeek] = 0;
    }
    acc[dayOfWeek]++;
    return acc;
  }, {});

  const totalMeetings = Object.values(groupMeetingsByDayOfWeek).reduce(
    (acc, count) => acc + count,
    0
  );

  const dataPerDay = {
    labels: Object.keys(groupMeetingsByDay),
    datasets: [
      {
        label: "Number of Meetings per Day",
        data: Object.values(groupMeetingsByDay),
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  const dataPerMonth = {
    labels: Object.keys(groupMeetingsByMonth),
    datasets: [
      {
        label: "Number of Meetings per Month",
        data: Object.values(groupMeetingsByMonth),
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const dataPercentage = {
    labels: Object.keys(groupMeetingsByDayOfWeek),
    datasets: [
      {
        label: "Percentage of Meetings per Day",
        data: Object.values(groupMeetingsByDayOfWeek).map(
          (count) => (count / totalMeetings) * 100
        ),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(fetchMeetingsInfo());
    }
  }, [dispatch]);

  return (
    <Container className="mt-5">
      <h1>Meeting Statistics Page</h1>

      <div style={{ width: 700 }} className="mt-5">
        <h2>Number of Meetings per Day</h2>
        <Bar data={dataPerDay} />
      </div>
      <div style={{ width: 700 }} className="mt-5">
        <h2>Number of Meetings for the Existing Month</h2>
        <Bar data={dataPerMonth} />
      </div>
      <div style={{ width: 700 }} className="mt-5">
        <h2>Percentage of the Number of Meetings per Day</h2>
        <Bar data={dataPercentage} />
      </div>
    </Container>
  );
};

export default MeetingStatisticsPage;
