import React, { useState } from "react";
import {
  Typography,
  Paper,
  Box,
  Grid,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import DeleteIcon from "@mui/icons-material/Delete";

const Comment = ({ comment, user, handleDelete }) => {
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

  const handleOpenConfirmDelete = () => {
    setConfirmDeleteOpen(true);
  };

  const handleCloseConfirmDelete = () => {
    setConfirmDeleteOpen(false);
  };

  const confirmAndDelete = () => {
    handleDelete(comment.comment_id);
    handleCloseConfirmDelete();
  };

  return (
    <Paper sx={{ p: 2, mt: 2 }}>
      <Box>
        <Typography sx={{ textAlign: "left" }}>{comment.body}</Typography>
        <Typography sx={{ fontWeight: "bold", textAlign: "right", mt: 2 }}>
          {comment.author}
        </Typography>
      </Box>

      <Grid container alignItems="center" justifyContent="space-between">
        {user && user.username === comment.author && (
          <Grid item>
            <Paper elevation={1} sx={{ p: 1 }}>
              <IconButton sx={{ ":focus": { outline: "none"} }} onClick={handleOpenConfirmDelete}>
                <DeleteIcon />
              </IconButton>
            </Paper>
          </Grid>
        )}

        <Grid item sx={{ ml: "auto" }}>
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
              <Grid item>
                <Typography variant="body2">Score: {comment.votes}</Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      <Dialog open={confirmDeleteOpen} onClose={handleCloseConfirmDelete}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this comment?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmAndDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default Comment;