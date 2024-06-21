import React from "react";
import { Typography, Paper, Grid, Box, IconButton } from "@mui/material";
import VoteButtons from "./VoteButtons";
import DeleteIcon from "@mui/icons-material/Delete";

const ArticleDetails = ({ article, handleClick, selected, handleArticleDelete, user }) => (
  <Paper elevation={1} sx={{ p: 2, mt: 10 }}>
    <Grid container spacing={2}>
      <Grid item xs={5}>
        <img src={article.article_img_url} alt={article.title} style={{ width: "100%" }} />
      </Grid>
      <Grid item xs={7} container direction="column">
        <Typography variant="h6" sx={{ fontWeight: "bold", fontSize: { xs: "1rem", sm: "1.5rem", md: "2rem" }, textAlign: "right" }}>
          {article.title}
        </Typography>
        <Typography variant="h6" sx={{ fontSize: "1rem", textAlign: "right" }}>
          Written by {article.author}
        </Typography>
        <Box mt={2} flexGrow={1}>
          <Typography variant="body1">{article.content}</Typography>
        </Box>
        <Box mt={2} display="flex" justifyContent="space-between" alignItems="center">
          {user && user.username === article.author && (
            <Paper>
            <IconButton
              sx={{ ":focus": { outline: "none" } }}
              onClick={handleArticleDelete}
            >
              <DeleteIcon />
            </IconButton>
            </Paper>
          )}
          <VoteButtons selected={selected} votes={article.votes} handleClick={handleClick} />
        </Box>
      </Grid>
    </Grid>
  </Paper>
);

export default ArticleDetails;
