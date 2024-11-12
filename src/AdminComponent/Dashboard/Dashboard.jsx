import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAnalyticsData } from '../../component/State/Analytic/Action';
import { BarChart } from '@mui/x-charts/BarChart';
import { Box, Drawer, Grid, Stack, Tab, Tabs, Typography } from '@mui/material';
import { PieChart } from '@mui/x-charts';
import { formatCurrency } from '../../component/util/currencyFormat';



export const Dashboard = () => {
  const jwt = localStorage.getItem("jwt");
  const restaurant = useSelector((store) => store.restaurant);
  const analytics = useSelector((store) => store.analytics.analyticData);
  const dispatch = useDispatch();
  const restaurantId = restaurant?.usersRestaurant?.id;
  console.log(analytics)
  // Fetch the analytics data from the backend
  useEffect(() => {
    dispatch(fetchAnalyticsData(restaurantId, jwt));
  }, [restaurantId, jwt, dispatch]);

  // Preparing data for Year total Price chart

  const monthNames = {
    "JANUARY": "Tháng 1",
    "FEBRUARY": "Tháng 2",
    "MARCH": "Tháng 3",
    "APRIL": "Tháng 4",
    "MAY": "Tháng 5",
    "JUNE": "Tháng 6",
    "JULY": "Tháng 7",
    "AUGUST": "Tháng 8",
    "SEPTEMBER": "Tháng 9",
    "OCTOBER": "Tháng 10",
    "NOVEMBER": "Tháng 11",
    "DECEMBER": "Tháng 12",
  };
  const dataset = Object.keys(analytics).map((month) => ({
    month: monthNames[month],
    totalPrice: analytics[month].totalPrice,
    numberOrder: analytics[month].numberOrder,
  }));


  // Tab render
  const currentMonthIndex = new Date().getMonth();
  const [selectedTab, setSelectedTab] = React.useState(currentMonthIndex);

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const selectedMonthKey = Object.keys(monthNames)[selectedTab];
  const selectedMonthData = analytics[selectedMonthKey];

  const pieChartData = [
    { label: 'Hoàn thành', value: selectedMonthData?.orderDetails?.find(order => order.orderStatus === 'DELIVERED')?.totalPriceStatus || 0 },
    { label: 'Thanh toán lỗi', value: selectedMonthData?.orderDetails?.find(order => order.orderStatus === 'FAILED')?.totalPriceStatus || 0 },
    { label: 'Đang giao hàng', value: selectedMonthData?.orderDetails?.find(order => order.orderStatus === 'OUT_FOR_DELIVERY')?.totalPriceStatus || 0 },
    { label: 'Đã thanh toán', value: selectedMonthData?.orderDetails?.find(order => order.orderStatus === 'PAID')?.totalPriceStatus || 0 },
    { label: 'Hủy bỏ', value: selectedMonthData?.orderDetails?.find(order => order.orderStatus === 'CANCEL')?.totalPriceStatus || 0 },
  ];

  const pieChartData2 = [
    { label: 'Hoàn thành', value: selectedMonthData?.numberConfirmedTableOrder || 0 },
    { label: 'Hủy bỏ', value: selectedMonthData?.numberCancelledTableOrder || 0 },
  ];


  return (
    <Grid container spacing={2} className='pb-10'>
      <Grid item sx={12} lg={12}>
        <p className='w-full text-3xl font-bold text-center'>Báo cáo năm</p>
      </Grid>
      <Grid item sx={12} lg={12} style={{ width: '100%' }} className='flex justify-center items-center'>
        <BarChart
          dataset={dataset}
          yAxis={[{ scaleType: 'band', dataKey: 'month' }]}
          series={[{ dataKey: 'totalPrice', label: 'Tổng doanh thu', valueFormatter: (value) => value.toLocaleString() }]}
          layout="horizontal"
          sx={{ width: '100%', padding: "1rem" }} // Ensure the chart takes full width
          height={500}
        />
      </Grid>
  
      <Grid item sx={12} lg={12}>
        <p className='w-full text-3xl font-bold text-center'>Báo cáo tháng</p>
      </Grid>
      <Grid item sx={12} lg={12} flex={"row"}>
        <Grid container sx={{ height: '100vh' }}>
          {/* Tabs Section (20% width) */}
          <Grid item xs={2} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: 2 }}>
            <Tabs
              value={selectedTab}
              onChange={handleTabChange}
              aria-label="wrapped label tabs monthly-tabs"
              orientation="vertical"  // Set Tabs to be vertical
              scrollButtons="auto"
              textColor="primary"
              indicatorColor="primary"
              sx={{ width: '100%' }} // Make the Tabs take the full height of the container
            >
              {Object.keys(monthNames).map((month, index) => (
                <Tab
                  key={month}
                  label={monthNames[month]}
                  style={{ fontSize: "14px", whiteSpace: 'normal', wordWrap: 'break-word' }}
                />
              ))}
            </Tabs>
          </Grid>

          {/* Content and Charts Section (80% width) */}
          <Grid item xs={10} sx={{ padding: 2 }}>
            <Box sx={{ width: '100%' }}>
              {/* Data Summary */}
              <Box sx={{ paddingBottom: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <h2 className="text-left text-2xl w-full">Số liệu: {monthNames[selectedMonthKey]}</h2>
                <h2 className="text-left text-2xl w-full">Doanh số: {formatCurrency(selectedMonthData?.totalPrice)}</h2>
                <h2 className="text-left text-2xl w-full">Số lượng đơn hàng hoàn thành: {selectedMonthData?.numberOrder}</h2>
                <h2 className="text-left text-2xl w-full">Số lượng đặt bàn: {selectedMonthData?.numberTableOrder}</h2>
              </Box>

              {/* Chart Section */}
              <Stack direction="row" width="100%" textAlign="center" spacing={2}>
                <Box flexGrow={1}>
                  <Typography>Doanh số theo trạng thái</Typography>
                  <PieChart
                    series={[{ data: pieChartData }]}
                    sx={{ padding: "1rem" }}
                    height={300}
                  />
                </Box>
                <Box flexGrow={1}>
                  <Typography>Số lượng đặt bàn</Typography>
                  <PieChart
                    series={[{ data: pieChartData2 }]}
                    sx={{ padding: "1rem" }}
                    height={300}
                  />
                </Box>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Grid>

    </Grid>
  );
};
