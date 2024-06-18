import React from "react";
import { Typography, Paper, Box, Grid, IconButton } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";

const Comment = ({ comment }) => (
  <Paper sx={{ p: 2, mt: 2 }}>
    <Typography sx={{ textAlign: "left" }}>{comment.body}</Typography>
    <Typography sx={{ fontWeight: "bold", textAlign: "right", mt: 2 }}>{comment.author}</Typography>
    <Box mt={2} display="flex" justifyContent="flex-end">
      <Paper elevation={1} sx={{ p: 1 }}>
        <Grid container spacing={1} alignItems="center">
          <Grid item>
            <IconButton sx={{ ":focus": { outline: "none" } }}>
              <ThumbUpIcon />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton sx={{ ":focus": { outline: "none" } }}>
              <ThumbDownIcon />
            </IconButton>
          </Grid>
          <Grid item sx={{ ml: "auto" }}>
            <Typography variant="body2">Score: {comment.votes}</Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  </Paper>
);

export default Comment;