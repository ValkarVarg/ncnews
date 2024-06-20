import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Typography, Paper, Box, Alert, CircularProgress } from "@mui/material";
import newsApi from "../api-calls/axios";
import ArticleDetails from "./components/ArticleDetails";
import CommentField from "./components/CommentField";
import Comment from "./components/Comment";
import ErrorPage from "./components/ErrorPage";

const Article = ({ user }) => {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState(null);
  const [selected, setSelected] = useState(null);
  const [alert, setAlert] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [commentError, setCommentError] = useState("");
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [error, setError] = useState(null);

  const handleClick = (value) => {
    let valueToIncrement = value;

    if (selected === value) {
      valueToIncrement = -value;
      setSelected(null);
    } else {
      valueToIncrement = value - (selected || 0);
      setSelected(value);
    }

    const body = {
      inc_votes: valueToIncrement,
    };

    const originalVotes = article.votes;

    setArticle((prevArticle) => ({
      ...prevArticle,
      votes: prevArticle.votes + valueToIncrement,
    }));

    newsApi
      .patch(`/articles/${article_id}`, body)
      .then(() => {
        return;
      })
      .catch((error) => {
        console.error("Error updating article votes:", error);
        setAlert("Error updating votes. Please try again.");
        setSelected(null);
        setArticle((prevArticle) => ({
          ...prevArticle,
          votes: originalVotes,
        }));
      });
  };

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
    if (event.target.value) {
      setCommentError("");
    }
  };

  const handleCommentSubmit = () => {
    return new Promise((resolve, reject) => {
      setSubmitAttempted(true);

      if (!user) {
        reject(new Error("User not logged in"));
        return;
      }
      if (!newComment.trim()) {
        reject(new Error("Comment cannot be blank"));
        return;
      }

      const commentToPost = { username: user.username, body: newComment };
      newsApi
        .post(`/articles/${article_id}/comments`, commentToPost)
        .then(({ data }) => {
          setComments((prevComments) => [data.comment, ...prevComments]);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const handleDelete = (commentId) => {
    const updatedComments = comments.filter((comment) => comment.comment_id !== commentId);
    setComments(updatedComments);

    return newsApi
      .delete(`/comments/${commentId}`)
      .then(() => {
        console.log("Comment deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting comment:", error);
        setAlert("Error deleting comment. Please try again.");
        setComments((prevComments) => [...prevComments, comments.find(comment => comment.comment_id === commentId)]);
        throw error;
      });
  };

  useEffect(() => {
    if (article_id) {
      newsApi
        .get(`/articles/${article_id}`)
        .then(({ data }) => {
          setArticle(data.article);
        })
        .catch((error) => {
          console.error("Error fetching article:", error);
          setError("Article not found. Please check the URL and try again.");
        });

      newsApi
        .get(`/articles/${article_id}/comments`)
        .then(({ data }) => {
          setComments(data.comments);
        })
        .catch((error) => {
          console.error("Error fetching comments:", error);
          setError("Failed to fetch comments.");
        });
    }
  }, [article_id]);

  if (error) {
    return <ErrorPage message={error} />;
  }

  if (!article || !comments) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      {alert && <Alert severity="error">{alert}</Alert>}
      <ArticleDetails
        article={article}
        handleClick={handleClick}
        selected={selected}
      />
      <Paper elevation={1} sx={{ p: 2, mt: 2 }}>
        <Typography variant="body1">{article.body}</Typography>
      </Paper>
      <Paper elevation={1} sx={{ p: 2, mt: 2 }}>
        <CommentField
          user={user}
          newComment={newComment}
          setNewComment={setNewComment}
          handleCommentChange={handleCommentChange}
          handleCommentSubmit={handleCommentSubmit}
          submitAttempted={submitAttempted}
          commentError={commentError}
          setCommentError={setCommentError}
        />
      </Paper>
      <Typography
        variant="h5"
        sx={{ fontWeight: "bold", textAlign: "left", mt: 2 }}
      >
        Comments:
      </Typography>
      {comments.map((comment) => (
        <Comment
          key={comment.comment_id}
          comment={comment}
          user={user}
          handleDelete={handleDelete}
        />
      ))}
    </>
  );
};

export default Article;
