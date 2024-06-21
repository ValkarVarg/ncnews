import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import ArticleCard from "./components/ArticleCard";
import TopicSelector from "./components/TopicSelector";
import SortBy from "./components/SortBy";
import OrderBy from "./components/OrderBy";
import {
  Container,
  CircularProgress,
  Box,
  Typography,
} from "@mui/material";
import newsApi from "../api-calls/axios";
import ErrorPage from "./components/ErrorPage";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [topics, setTopics] = useState([]);
  const location = useLocation();

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

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const topic = searchParams.get('topic');
    const sort_by = searchParams.get('sort');
    const order = searchParams.get('order');
    
    setLoading(true);
    newsApi
      .get("/articles", { params: { topic, sort_by, order, limit: 20000, p:1 } })
      .then(({ data }) => {
        setArticles(data.articles);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setError("Articles not found. Please check queries are valid.");
      });
  }, [location.search]);

  if (error) {
    return <ErrorPage message={error} />;
  }

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography>Please be patient - Data loading</Typography>
        <CircularProgress sx={{ ml: 2 }} />
      </Box>
    );
  }

  return (
    <div>
      <Box sx={{ paddingTop: { xs: '64px', sm: '56px' } }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" margin="normal">
          <TopicSelector
            topics={topics}
            setTopics={setTopics} 
            showAddTopicOption={false}
          />
          <SortBy />
          <OrderBy />
        </Box>
        <Container>
          <Box 
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, auto))',
              gap: 2,
              marginTop: 2,
            }}
          >
            {articles.map((article) => (
              <ArticleCard
                key={article.article_id}
                title={article.title}
                image={article.article_img_url}
                article_id={article.article_id}
              />
            ))}
          </Box>
        </Container>
      </Box>
    </div>
  );
};

export default Articles;
