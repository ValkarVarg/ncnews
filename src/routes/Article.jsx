import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Typography, Paper, Grid, IconButton, Box } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import newsApi from "../api-calls/axios";

const Article = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState(null);

  useEffect(() => {
    if (article_id) {
    newsApi.get(`/articles/${article_id}`)
        .then(({ data }) => {
          setArticle(data.article);
        })
        .catch(error => {
          console.error('Error fetching article:', error);
        });
    newsApi.get(`/articles/${article_id}/comments`)
        .then(({ data }) => {
          setComments(data.comments);
        })
        .catch(error => {
          console.error('Error fetching comments:', error);
        });
    }
  }, [article_id]);

  if (!article || !comments) {
    return <Typography variant="body1">Loading...</Typography>;
  }

  return (
    <>
    <Paper elevation={1} sx={{ p: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <img src={article.article_img_url} alt={article.title} style={{ width: "100%" }} />
        </Grid>
        <Grid item xs={8} container direction="column">
          <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: { xs: '2rem', sm: '2.5rem' }, textAlign: "right" }}>
            {article.title}
          </Typography>
          <Typography variant="h6" sx={{fontSize: '1rem', textAlign: "right" }}>
            Written by {article.author}
          </Typography>
          <Box mt={2} flexGrow={1}>
            <Typography variant="body1">{article.content}</Typography>
          </Box>
          <Box mt={2} display="flex" justifyContent="flex-end">
            <Box sx={{ position: 'relative' }}>
              <Paper elevation={1} sx={{ p: 1 }}>
                <Grid container spacing={1} alignItems="center">
                  <Grid item>
                    <IconButton>
                      <ThumbUpIcon />
                    </IconButton>
                  </Grid>
                  <Grid item>
                    <Typography variant="body2">{article.upVotes}</Typography>
                  </Grid>
                  <Grid item>
                    <IconButton>
                      <ThumbDownIcon />
                    </IconButton>
                  </Grid>
                  <Grid item>
                    <Typography variant="body2">{article.downVotes}</Typography>
                  </Grid>
                  <Grid item sx={{ ml: 'auto' }}>
                    <Typography variant="body2">Score: {article.votes}</Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Paper>
    <Paper elevation={1} sx={{ p:2, mt:2}}>
    <Typography variant="body1">{article.body}</Typography>
    </Paper>
    <Typography variant="h4" sx={{textAlign: "left"}}>Comments:</Typography>
    {comments.map((comment) => (
            <Paper item key={comment.comment_id} sx={{ p: 2, mt:2}}>
              <Typography>{comment.body}</Typography>
              <Typography>{comment.author}</Typography>
              <Grid container spacing={1} alignItems="center">
                  <Grid item>
                    <IconButton>
                      <ThumbUpIcon />
                    </IconButton>
                  </Grid>
                  <Grid item>
                    <Typography variant="body2">{comment.upVotes}</Typography>
                  </Grid>
                  <Grid item>
                    <IconButton>
                      <ThumbDownIcon />
                    </IconButton>
                  </Grid>
                  <Grid item>
                    <Typography variant="body2">{comment.downVotes}</Typography>
                  </Grid>
                  <Grid item sx={{ ml: 'auto' }}>
                    <Typography variant="body2">Score: {comment.votes}</Typography>
                  </Grid>
                  </Grid>
            </Paper>))}
    </>
  );
};

export default Article;

