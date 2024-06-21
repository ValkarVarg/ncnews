import React, { useEffect } from "react";
import {
  FormControl,
  InputLabel,
  NativeSelect,
  TextField,
  Box,
  Button,
} from "@mui/material";
import newsApi from "../../api-calls/axios";

const TopicSelector = ({
  selectedTopic,
  onTopicChange,
  onNewTopicNameChange,
  onNewTopicDescriptionChange,
  newTopicName,
  newTopicDescription,
  loading,
  topicLoading,
  handleNewTopicSubmit,
  topics = [],
  setTopics,
  showAddTopicOption = true,
}) => {
  useEffect(() => {
    if (!topics.length) {
      newsApi
        .get("/topics")
        .then(({ data }) => {
          setTopics(data.topics);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [topics, setTopics]);

  const capitalizeFirstLetter = (string) => {
    if (typeof string !== "string" || string.length === 0) {
      return string;
    }
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handleChange = (event) => {
    const selectedTopic = event.target.value;
    if (selectedTopic === "Please Select") {
      onTopicChange("");
    } else {
      onTopicChange(selectedTopic);
    }
  };

  return (
    <FormControl fullWidth margin="normal">
      <InputLabel variant="standard" htmlFor="topic-selector">
        Topic
      </InputLabel>
      <NativeSelect
        value={selectedTopic || "Please Select"}
        inputProps={{
          name: "topics",
          id: "topic-selector",
        }}
        onChange={handleChange}
      >
        <option key="select-placeholder" value="Please Select" disabled>
          Please Select
        </option>
        {topics.map((topic) => (
          <option key={topic.slug} value={topic.slug}>
            {capitalizeFirstLetter(topic.slug)}
          </option>
        ))}
        {showAddTopicOption && (
          <option key="add-new-topic" value="AddNewTopic">
            Add new topic
          </option>
        )}
      </NativeSelect>
      {selectedTopic === "AddNewTopic" && showAddTopicOption && (
        <Box mt={2}>
          <TextField
            label="New Topic Name"
            value={newTopicName}
            onChange={(e) => onNewTopicNameChange(e.target.value)}
            variant="outlined"
            fullWidth
            required
          />
          <TextField
            label="Description"
            value={newTopicDescription}
            onChange={(e) => onNewTopicDescriptionChange(e.target.value)}
            variant="outlined"
            fullWidth
            required
            multiline
            rows={4}
            sx={{ mt: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleNewTopicSubmit(newTopicName, newTopicDescription)}
            disabled={loading || topicLoading}
            sx={{ mt: 2 }}
          >
            {topicLoading ? "Adding Topic..." : "Add Topic"}
          </Button>
        </Box>
      )}
    </FormControl>
  );
};

export default TopicSelector;
