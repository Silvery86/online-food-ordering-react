import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Tooltip, Legend } from 'chart.js';
import { Line, Bar, Pie } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

export const Dashboard = () => {
  // Sample data for the charts
  const lineData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Monthly Sales',
        data: [1200, 1900, 3000, 5000, 2300, 3400],
        borderColor: '#3f51b5',
        backgroundColor: 'rgba(63, 81, 181, 0.2)',
        tension: 0.4,
      },
    ],
  };

  const barData = {
    labels: ['Pizza', 'Burgers', 'Sushi', 'Pasta', 'Salad'],
    datasets: [
      {
        label: 'Orders by Category',
        data: [500, 400, 300, 200, 100],
        backgroundColor: [
          '#ff6384',
          '#36a2eb',
          '#ffcd56',
          '#4bc0c0',
          '#9966ff',
        ],
      },
    ],
  };

  const pieData = {
    labels: ['Dine-in', 'Takeaway', 'Delivery'],
    datasets: [
      {
        data: [55, 30, 15],
        backgroundColor: ['#4caf50', '#ff9800', '#f44336'],
      },
    ],
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Báo cáo
      </Typography>
      
      <Grid container spacing={3}>
        {/* Line Chart */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Monthly Sales
            </Typography>
            <Line data={lineData} />
          </Paper>
        </Grid>

        {/* Bar Chart */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Orders by Category
            </Typography>
            <Bar data={barData} />
          </Paper>
        </Grid>

       
      </Grid>
    </Box>
  );
};
