import * as React from "react";
import ArticleCard from "./Article-card";
import { Grid, Container } from "@mui/material";
import newsApi from "../api-calls/axios";

const Articles = () => {
  const [articles, setArticles] = React.useState([]);

  React.useEffect(() => {
    newsApi
      .get("/articles")
      .then(({ data }) => {
        setArticles(data.articles)})
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
              <ArticleCard title={article.title} image={article.article_img_url} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default Articles;

