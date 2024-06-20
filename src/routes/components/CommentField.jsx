import React, { useState } from "react";
import {
  TextField,
  Button,
  InputAdornment,
  CircularProgress,
  Snackbar,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const CommentField = ({
  user,
  newComment,
  handleCommentChange,
  setNewComment,
  handleCommentSubmit,
  submitAttempted,
  commentError,
  setCommentError,
}) => {
  const [submitting, setSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null);

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
  
      await handleCommentSubmit(); 
      setNewComment("");
      setCommentError(""); 
  
      setSubmissionStatus("success"); 
    } catch (error) {
      console.error("Error posting comment:", error);
      setSubmissionStatus("error");
      setCommentError("Failed to submit comment. Please try again."); 
    } finally {
      setSubmitting(false);
    }
  };
  const handleCloseSnackbar = () => {
    setSubmissionStatus(null);
  };

  return (
    <>
      <TextField
        name="commentInput"
        fullWidth
        multiline
        label="Add a Comment"
        value={newComment}
        onChange={handleCommentChange}
        error={
          (submitAttempted && !user) ||
          (submitAttempted && Boolean(commentError))
        }
        helperText={
          (!user && "You must be logged in to post a comment") ||
          (submitAttempted && commentError)
        }
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {submitting ? (
                <CircularProgress size={24} />
              ) : (
                <Button
                  variant="contained"
                  endIcon={<SendIcon />}
                  onClick={handleSubmit}
                  disabled={!user || submitting}
                >
                  Submit
                </Button>
              )}
            </InputAdornment>
          ),
        }}
      />
      <Snackbar
        open={submissionStatus === "success" || submissionStatus === "error"}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={
          submissionStatus === "success"
            ? "Comment submitted successfully!"
            : submissionStatus === "error"
            ? commentError || "Failed to submit comment. Please try again."
            : ""
        }
      />
    </>
  );
};

export default CommentField;
