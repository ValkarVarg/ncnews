import React, { useState, useEffect } from "react";
import { TextField, Button, Paper, Typography, Box, Alert } from "@mui/material";
import newsApi from "../api-calls/axios";
import TopicSelector from "./components/TopicSelector";
import { useNavigate } from "react-router-dom";

const Post = ({ user }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [selectedTopic, setSelectedTopic] = useState(""); 
  const [newTopicName, setNewTopicName] = useState(""); 
  const [newTopicDescription, setNewTopicDescription] = useState(""); 
  const [imageUrl, setImageUrl] = useState(""); 
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);
  const [topicLoading, setTopicLoading] = useState(false);
  const [topics, setTopics] = useState([]);
  const [newArticleId, setNewArticleId] = useState(null); 

  const navigate = useNavigate();

  useEffect(() => {
    if (imageUrl) {
      setImagePreviewUrl(imageUrl);
    } else {
      setImagePreviewUrl("");
    }
  }, [imageUrl]);

  useEffect(() => {
    newsApi
      .get("/topics")
      .then(({ data }) => {
        setTopics(data.topics);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleBodyChange = (event) => {
    setBody(event.target.value);
  };

  const handleTopicChange = (topic) => {
    setSelectedTopic(topic);
  };

  const handleNewTopicNameChange = (value) => {
    setNewTopicName(value);
  };

  const handleNewTopicDescriptionChange = (value) => {
    setNewTopicDescription(value);
  };

  const handleImageUrlChange = (event) => {
    const url = event.target.value;
    setImageUrl(url);
    setImagePreviewUrl(url); 
  };

  const handleNewTopicSubmit = async (addTopic) => {
    if (!newTopicName || !newTopicDescription) {
      setAlert("Topic name and description are required.");
      return;
    }
  
    const existingTopic = topics.find(topic => topic.slug.toLowerCase() === newTopicName.toLowerCase());
    if (existingTopic) {
      setAlert(`Topic '${newTopicName}' already exists.`);
      return;
    }
  
    try {
      const response = await newsApi.post("/topics", {
        slug: newTopicName,
        description: newTopicDescription,
      });
      const { data } = response;
      setSelectedTopic(data.slug);
      addTopic(data.slug);
      setAlert(`New topic '${newTopicName}' added successfully.`);
      setNewTopicName("");
      setNewTopicDescription("");
    } catch (error) {
      console.error("Error adding new topic:", error.response);
      setAlert("Failed to add new topic. Please try again.");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!title || !body) {
      setAlert("Title and body are required.");
      return;
    }

    setLoading(true);

    const newArticle = {
      title,
      body,
      author: user.username,
      topic: selectedTopic,
    };

    if (imageUrl) {
      newArticle.article_img_url = imageUrl;
    }

    try {
      const { data } = await newsApi.post("/articles", newArticle);
      setAlert("Article posted successfully.");
      setTitle("");
      setBody("");
      setSelectedTopic(""); 
      setImageUrl(""); 
      setImagePreviewUrl("");
      setNewArticleId(data.article.article_id);
    } catch (error) {
      console.error("Error posting article:", error);
      setAlert("Failed to post article. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoToArticle = () => {
    if (newArticleId) {
      navigate(`/article/${newArticleId}`);
    }
  };

  if (!user) {
    return (
      <Paper elevation={1} sx={{ p: 4, mt: 10 }}>
        <Alert severity="error">
          You must be logged in to post an article.
        </Alert>
      </Paper>
    );
  }

  return (
    <Paper elevation={1} sx={{ p: 4, mt: 10 }}>
      <Typography variant="h5" component="h1" sx={{ fontWeight: "bold", mb: 4 }}>
        Post a New Article
      </Typography>

      <form onSubmit={handleSubmit}>
        <Box sx={{ mb: 2 }}>
          <TextField
            label="Title"
            fullWidth
            variant="outlined"
            value={title}
            onChange={handleTitleChange}
            required
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            label="Body"
            fullWidth
            variant="outlined"
            multiline
            rows={6}
            value={body}
            onChange={handleBodyChange}
            required
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            label="Image URL"
            fullWidth
            variant="outlined"
            value={imageUrl}
            onChange={handleImageUrlChange}
          />
        </Box>
        {imagePreviewUrl && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Image Preview:
            </Typography>
            <img src={imagePreviewUrl} alt="Image Preview" style={{ maxWidth: "100%", height: "auto" }} />
          </Box>
        )}
        <Box sx={{ mb: 2 }}>
          <TopicSelector
            topics={topics}
            setTopics={setTopics} 
            selectedTopic={selectedTopic}
            onTopicChange={handleTopicChange}
            onNewTopicNameChange={handleNewTopicNameChange}
            onNewTopicDescriptionChange={handleNewTopicDescriptionChange}
            newTopicName={newTopicName}
            newTopicDescription={newTopicDescription}
            loading={loading}
            topicLoading={topicLoading}
            handleNewTopicSubmit={handleNewTopicSubmit}
          />
        </Box>
        {alert && (
        <Alert severity={alert.includes("successfully") ? "success" : "error"} sx={{ mb: 2 }}>
          {alert}
        </Alert>
      )}
        <Box>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading || topicLoading}
          sx={{ mt: 2 }}
        >
          {loading ? "Posting..." : "Post Article"}
        </Button>
        {newArticleId && (
        <Button
          variant="contained"
          color="secondary"
          onClick={handleGoToArticle}
          sx={{ mt: 2, ml: 2 }}
        >
          Go to Article
        </Button>
      )}
        </Box>
      </form>
     
    </Paper>
  );
};

export default Post;
