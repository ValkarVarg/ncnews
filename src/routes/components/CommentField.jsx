import React from "react";
import { TextField, Button, InputAdornment } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const CommentField = ({ user, newComment, handleCommentChange, handleCommentSubmit, submitAttempted, commentError }) => (
  <TextField
    fullWidth
    multiline
    label="Add a Comment"
    value={newComment}
    onChange={handleCommentChange}
    error={(submitAttempted && !user) || (submitAttempted && Boolean(commentError))}
    helperText={
      (!user && "You must be logged in to post a comment") ||
      (submitAttempted && commentError)
    }
    InputProps={{
      endAdornment: (
        <InputAdornment position="end">
          <Button
            variant="contained"
            endIcon={<SendIcon />}
            onClick={handleCommentSubmit}
            disabled={!user}
          >
            Submit
          </Button>
        </InputAdornment>
      ),
    }}
  />
);

export default CommentField;