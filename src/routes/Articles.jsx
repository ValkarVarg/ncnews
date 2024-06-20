import * as React from "react";
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

const Articles = () => {
  const [articles, setArticles] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const location = useLocation();

  React.useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const topic = searchParams.get('topic');
    const sort_by = searchParams.get('sort');
    const order = searchParams.get('order')
    
    setLoading(true);
    newsApi
      .get("/articles", { params: { topic, sort_by, order } })
      .then(({ data }) => {
        setArticles(data.articles);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [location.search]);

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
        <Typography>Please be patient, API loading</Typography>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div>
      <Box sx={{ paddingTop: { xs: '64px', sm: '56px' } }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" margin="normal">
      <TopicSelector />
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
