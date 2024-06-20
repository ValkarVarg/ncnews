import React from 'react';
import { FormControl, InputLabel, NativeSelect } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

const SortBy = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const selectedSort = searchParams.get("sort")

  const handleChange = (event) => {
    const selectedSort = event.target.value;
      searchParams.set("sort", selectedSort);
    navigate({ search: searchParams.toString() });
  };

  return (
    <FormControl fullWidth margin='normal'>
      <InputLabel variant="standard" htmlFor="uncontrolled-native">
        Sort By
      </InputLabel>
      <NativeSelect
        value={selectedSort}
        inputProps={{
          name: 'sort',
          id: 'uncontrolled-native',
        }}
        onChange={handleChange}
      >
        <option value="created_at">Date</option>
        <option value="comment_count">Total Comments</option>
        <option value="votes">Votes</option>
      </NativeSelect>
    </FormControl>
  );
};

export default SortBy;
