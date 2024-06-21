import React, { useState, useEffect } from "react";
import { Typography, Box, Paper, CircularProgress, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import newsApi from "../api-calls/axios";
import ArticleCard from "./components/ArticleCard";

const Home = ({ user }) => {
  const [recentArticles, setRecentArticles] = useState([]);
  const [topVotedArticles, setTopVotedArticles] = useState([]);
  const [userArticles, setUserArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const recentResponse = await newsApi.get("/articles", {
          params: {
            limit: 10,
            p: 1,
          },
        });
        setRecentArticles(recentResponse.data.articles);

        const allArticlesResponse = await newsApi.get("/articles", {params: {limit: 20000, p:1}});
        const articles = allArticlesResponse.data.articles;
        const sortedByVotes = articles.sort((a, b) => b.votes - a.votes).slice(0, 10);
        setTopVotedArticles(sortedByVotes);

        if (user) {
          const userArticles = articles.filter((article) => {return article.author === user.username})
          setUserArticles(userArticles);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2, mt: 6 }}>
      <Paper sx={{ p: 2, mb: 4, overflowX: "auto", whiteSpace: "nowrap" }}>
        <Typography variant="h4" sx={{ fontWeight:"bold", mb: 2, textAlign:"left" }}>
          Recent Articles
        </Typography>
        <Stack direction="row" spacing={2} sx={{ overflowX: "auto", flexWrap: "nowrap" }}>
          {recentArticles.map((article) => (
            <Box key={article.article_id} sx={{ minWidth: 200, maxWidth: 200 }}>
              <ArticleCard
                title={article.title}
                image={article.article_img_url}
                article_id={article.article_id}
              />
            </Box>
          ))}
        </Stack>
      </Paper>

      <Paper sx={{ p: 2, mb: 4, overflowX: "auto", whiteSpace: "nowrap" }}>
        <Typography variant="h4" sx={{fontWeight:"bold", mb: 2, textAlign:"left" }}>
          Top Rated Articles
        </Typography>
        <Stack direction="row" spacing={2} sx={{ overflowX: "auto", flexWrap: "nowrap" }}>
          {topVotedArticles.map((article) => (
            <Box key={article.article_id} sx={{ minWidth: 200, maxWidth: 200 }}>
              <ArticleCard
                title={article.title}
                image={article.article_img_url}
                article_id={article.article_id}
              />
            </Box>
          ))}
        </Stack>
      </Paper>

      {user && userArticles.length > 0 && (
        <Paper sx={{ p: 2, mb: 4, overflowX: "auto", whiteSpace: "nowrap" }}>
          <Typography variant="h4" sx={{ fontWeight:"bold", mb: 2, textAlign:"left"  }}>
            Your Articles
          </Typography>
          <Stack direction="row" spacing={2} sx={{ overflowX: "auto", flexWrap: "nowrap" }}>
            {userArticles.map((article) => (
              <Box key={article.article_id} sx={{ minWidth: 200, maxWidth: 200 }}>
                <ArticleCard
                  title={article.title}
                  image={article.article_img_url}
                  article_id={article.article_id}
                />
              </Box>
            ))}
          </Stack>
        </Paper>
      )}
    </Box>
  );
};

export default Home;
