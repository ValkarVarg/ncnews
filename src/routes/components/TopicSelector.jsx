import React from 'react';
import { FormControl, InputLabel, NativeSelect } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import newsApi from '../../api-calls/axios';

const TopicSelector = () => {
  const [topics, setTopics] = React.useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    newsApi
      .get("/topics")
      .then(({ data }) => {
        setTopics(data.topics);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const searchParams = new URLSearchParams(location.search);
  const selectedTopic = searchParams.get("topic") || "All";

  const handleChange = (event) => {
    const selectedTopic = event.target.value;
    if (selectedTopic === "All") {
      searchParams.delete("topic");
    } else {
      searchParams.set("topic", selectedTopic);
    }
    navigate({ search: searchParams.toString() });
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <FormControl fullWidth margin='normal'>
      <InputLabel variant="standard" htmlFor="topic-selector">
        Topic
      </InputLabel>
      <NativeSelect
        value={selectedTopic}
        inputProps={{
          name: 'topics',
          id: 'topic-selector',
        }}
        onChange={handleChange}
      >
        <option value="All">All</option>
        {topics.map((topic) => (
          <option key={topic.slug} value={topic.slug}>
            {capitalizeFirstLetter(topic.slug)}
          </option>
        ))}
      </NativeSelect>
    </FormControl>
  );
};

export default TopicSelector;
