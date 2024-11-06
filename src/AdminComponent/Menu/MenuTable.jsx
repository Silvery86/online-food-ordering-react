import { Avatar, Box, Card, CardHeader, Chip, IconButton, CircularProgress, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Create, Delete, Edit } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { deleteFoodAction, getMenuItemsByRestaurantId } from '../../component/State/Menu/Action';
import { useDispatch, useSelector } from 'react-redux';
import { formatCurrency } from '../../component/util/currencyFormat';

export const MenuTable = () => {
  const dispatch = useDispatch();
  const restaurant = useSelector(state => state.restaurant);
  const menu = useSelector(state => state.menu);
  const jwt = localStorage.getItem("jwt");
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    if (restaurant?.usersRestaurant?.id) {
      setIsLoading(true);
      dispatch(getMenuItemsByRestaurantId({
        restaurantId: restaurant.usersRestaurant.id,
        jwt: jwt
      })).finally(() => setIsLoading(false));
    }
  }, [dispatch, restaurant?.usersRestaurant?.id, jwt]);

  const handleDeleteFood = (foodId) => {
    dispatch(deleteFoodAction({ foodId, jwt }));
  };
  const handleEditFood = (foodId) => {
   
  };
  
  const columns = [
    {
      field: 'images',
      headerName: 'Ảnh',
      width: 150,
      renderCell: (params) => (
        <Avatar src={params.value[0]} sx={{ width: 120, height: 120 }} />
      ),
    },
    {
      field: 'name',
      headerName: 'Món ăn',
      width: 200,
      sortable: false,
    },
    {
      field: 'foodCategory',
      headerName: 'Danh mục',
      width: 150,
      renderCell: (params) => {
        const categoryName = params.row?.foodCategory?.name || "N/A";
        return <Chip color="primary" label={categoryName} />;
      },
      sortable: true,
      valueGetter: (params) => (params.row?.foodCategory ? params.row.foodCategory.name : 'N/A'),
    },
    {
      field: 'price',
      headerName: 'Giá',
      width: 120,
      renderCell: (params) => formatCurrency(params.value),
      sortable: true,
    },
    {
      field: 'available',
      headerName: 'Tồn kho',
      width: 130,
      renderCell: (params) => (
        params.value
          ? <Chip label="Có hàng" color="success" variant="outlined" />
          : <Chip label="Hết hàng" color="primary" variant="outlined" />
      ),
    },
    {
      field: 'actions',
      headerName: 'Hành động',
      width: 180,
      renderCell: (params) => (
        <Box display="flex" justifyContent="center">
          <IconButton color="primary" onClick={() => handleEditFood(params.row.id)}>
            <Edit />
          </IconButton>
          <IconButton color="primary" onClick={() => handleDeleteFood(params.row.id)}>
            <Delete />
          </IconButton>
        </Box>
      ),
      sortable: false,
    },
  ];

  return (
    <Box>
      <Card>
        <CardHeader
          action={
            <IconButton onClick={() => navigate("/admin/restaurant/add-menu")} aria-label="settings">
              <Create />
            </IconButton>
          }
          title={"Danh sách món ăn"}
          sx={{ pt: 2, alignItems: "center", textAlign: "center" }}
        />
        <Box m={2}>
          <TextField
            label="Tìm kiếm món ăn"
            variant="outlined"
            fullWidth
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Box>
        {isLoading ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
            <CircularProgress />
          </Box>
        ) : menu?.menuItems?.length > 0 ? (
          <Box m={2} sx={{ width: '100%' }}>
            <DataGrid
              rows={menu.menuItems.filter((item) =>
                item.name.toLowerCase().includes(search.toLowerCase())
              )}
              columns={columns}
              pageSize={pageSize} 
              rowsPerPageOptions={[5, 10, 15]}  
              pagination
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}  
              getRowId={(row) => row.id}
              rowHeight={150}
              sx={{
                width: '100%',
                '& .MuiDataGrid-cell': {
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  whiteSpace: 'normal',
                  textAlign: 'center', // Center align cell content
                },
                '& .MuiDataGrid-columnHeaders': {
                  backgroundColor: '#f5f5f5',
                  textAlign: 'center', 
                  width:"100%",
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',

                },
              }}
            />
          </Box>
        ) : (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
            Không có món ăn nào
          </Box>
        )}
      </Card>
    </Box>
  );
};
