import React from 'react';
import { FormControl, InputLabel, NativeSelect } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

const OrderBy = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const selectedOrder = searchParams.get("order") || "desc"

  const handleChange = (event) => {
    const selectedOrder = event.target.value;
      searchParams.set("order", selectedOrder);
    navigate({ search: searchParams.toString() });
  };

  return (
    <FormControl fullWidth margin='normal'>
      <InputLabel variant="standard" htmlFor="uncontrolled-native">
        Order
      </InputLabel>
      <NativeSelect
        value={selectedOrder} 
        inputProps={{
          name: 'order',
          id: 'uncontrolled-native',
        }}
        onChange={handleChange}
      >
        <option value="desc">Descending</option>
        <option value="asc">Ascending</option>
      </NativeSelect>
    </FormControl>
  );
};

export default OrderBy;