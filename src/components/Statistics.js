import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts';
import { Row, Col } from 'react-bootstrap';
import axios from 'axios';
import './Statistics.css';

const Statistics = () => {
  const userId = useSelector((state) => state.user);
  const [statisticsData, setStatisticsData] = useState(null);

  useEffect(() => {
    if(userId) {
      fetchStatisticsData();
    } else {
        console.log("no user")
    }
  }, [userId]);

  const fetchStatisticsData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/statistics');
      setStatisticsData(response.data);
    } catch (error) {
      console.log('Error fetching statistics data:', error);
    }
  };

  if (!statisticsData) {
    return <div>Loading...</div>;
  }

  // Prepare data for the pie chart
  const data = [
    { name: 'Completed Tasks', value: statisticsData.completedTasks },
    { name: 'Remaining Tasks', value: 20 - statisticsData.completedTasks },
  ];

  // Customize colors for the pie chart
  const colors = ['#0088FE', '#FF8042'];

  return (
    <div>
      <Row className="statistics-cards">
        <h2>Statistics</h2>
        <Col md={4} sm={6} className="statistics-card">
          <h3 className="card-title">Completed Tasks</h3>
          <p className="card-value">{statisticsData.completedTasks}</p>
        </Col>
        <Col md={4} sm={6} className="statistics-card">
          <h3 className="card-title">Completed Pomodoros</h3>
          <p className="card-value">{statisticsData.completedPomodoros}</p>
        </Col>
        <Col md={4} sm={6} className="statistics-card">
          <h3 className="card-title">Total Worked Hours</h3>
          <p className="card-value">{statisticsData.totalWorkedHours}</p>
        </Col>
        <Col md={4} sm={6} className="statistics-card">
          <h3 className="card-title">Average Tasks per Day</h3>
          <p className="card-value">{statisticsData.averageTasksPerDay}</p>
        </Col>
        <Col md={4} sm={6} className="statistics-card">
          <h3 className="card-title">Average Pomodoros per Day</h3>
          <p className="card-value">{statisticsData.averagePomodorosPerDay}</p>
        </Col>
        <Col md={4} sm={6} className="statistics-card">
          <h3 className="card-title">Planned to Complete Ratio</h3>
          <p className="card-value">{statisticsData.plannedToCompleteRatio}</p>
        </Col>
      </Row>

      <div>
        <h3 style={{margin: '1rem'}}>Task Completion Overview</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              labelLine={false}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Statistics;
