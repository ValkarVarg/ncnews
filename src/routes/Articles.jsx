import * as React from "react";
import ArticleCard from "./Article-card";
import { Grid, Container, CircularProgress, Box } from "@mui/material";
import newsApi from "../api-calls/axios";

const Articles = () => {
  const [articles, setArticles] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    newsApi
      .get("/articles")
      .then(({ data }) => {
        setArticles(data.articles);
        setLoading(false); 
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div>
      <select>
        <option>select</option>
        <option>topic placeholder</option>
      </select>
      <Container>
        <Grid container spacing={2}>
          {articles.map((article) => (
            <Grid item key={article.article_id} xs={6} sm={3} md={2} lg={2}>
              <ArticleCard title={article.title} image={article.article_img_url} article_id={article.article_id} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default Articles;


