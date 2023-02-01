import axios from 'axios';
import { createContext, useCallback } from 'react';
import { useState } from 'react';

const CommentContext = createContext();

const Provider = function ({ children }) {
  const [currentUser, setcurrentUser] = useState({});

  const [comments, setComments] = useState([]);

  const fetchCurrentUser = useCallback(async function () {
    const response = await axios.get('http://127.0.0.1:3001/currentUser');

    setcurrentUser(response.data);
  }, []);

  const fetchComment = useCallback(async function () {
    const response = await axios.get('http://127.0.0.1:3001/comments');

    setComments(response.data);
  }, []);

  const addComment = async function (data) {
    const response = await axios.post(`http://127.0.0.1:3001/comments`, data);

    const updatedArr = [...comments, response.data];

    setComments(updatedArr);
  };

  const deleteComment = async function (id) {
    await axios.delete(`http://127.0.0.1:3001/comments/${id}`);

    const updatedArr = comments.filter((comment) => {
      return comment.id !== id;
    });

    setComments(updatedArr);
  };

  const deleteReplyComment = async function (parentId, id) {
    // GET parent comment
    const parentComment = comments
      .filter((comment) => {
        return comment.id === parentId;
      })
      .at(0);

    // GET Reply that doesn't contain deleted reply Id
    const excludedReplies = comments
      .filter((comment) => {
        return comment.id === parentId;
      })
      .flatMap((comment) => {
        return comment.replies;
      })
      .filter((replies) => {
        return replies.id !== id;
      });

    // PUT updated replies into the Parent comment
    const response = await axios.put(
      `http://127.0.0.1:3001/comments/${parentId}`,
      { ...parentComment, replies: [...excludedReplies] }
    );

    // Update The previous Parent comment with the new Parent Data response
    const updatedArray = comments.map((comment) => {
      if (comment.id !== parentId) return comment;
      return { ...comment, ...response.data };
    });

    setComments(updatedArray);
  };

  const editComment = async function (id, data) {
    const response = await axios.put(`http://127.0.0.1:3001/comments/${id}`, {
      ...data,
    });

    const updatedArr = comments.map((comment) => {
      if (comment.id !== id) return comment;
      return { ...comment, ...response.data };
    });

    setComments(updatedArr);
  };

  const editReplyComment = async function (parentId, id, editData) {
    // Get Parent Comment
    const editParent = comments
      .filter((comment) => {
        return comment.id === parentId;
      })
      .at(0);

    // Replies Excluding the reply to be edited
    const excludedReplies = comments
      .filter((comment) => {
        // Filter out the Parent
        return comment.id === parentId;
      })
      .flatMap((comment) => {
        // Return the replies Array in the parent
        return comment.replies;
      })
      .filter((comment) => {
        // Filter the replies with id differnet from the reply to be edited
        return comment.id !== id;
      });

    const response = await axios.put(
      `http://127.0.0.1:3001/comments/${parentId}`,
      { ...editParent, replies: [...excludedReplies, { ...editData }] }
    );
    // console.log(response.data);

    const updatedArr = comments.map((comment) => {
      if (comment.id !== parentId) return comment;
      return { ...comment, ...response.data };
    });
    setComments(updatedArr);
  };

  const replyReplyComment = async function (parentId, replyData) {
    // Get Comment parent from Reply from the selected comment
    const replyParent = comments
      .filter((comment) => {
        return comment.id === parentId;
      })
      .at(0);

    // Get Reply array from the selected comment
    const previousReplies = comments
      .filter((comment) => {
        return comment.id === parentId;
      })
      .flatMap((comment) => {
        return comment.replies;
      });

    const response = await axios.put(
      `http://127.0.0.1:3001/comments/${parentId}`,
      { ...replyParent, replies: [...previousReplies, { ...replyData }] }
    );

    // console.log(response.data);

    const updatedArr = comments.map((comment) => {
      if (comment.id !== parentId) return comment;
      return { ...comment, ...response.data };
    });

    setComments(updatedArr);
  };

  const replyComment = async function (id, comment, replyData) {
    // Get Reply array from the selected comment
    const repliesArray = comments
      .filter((comment) => {
        return comment.id === id;
      })
      .flatMap((comment) => {
        return comment.replies;
      });

    // PUT the array in the database, and overwrite the reply with the replies array
    const response = await axios.put(`http://127.0.0.1:3001/comments/${id}`, {
      ...comment,
      replies: [...repliesArray, { ...replyData }],
    });

    const updatedArr = comments.map((comment) => {
      if (comment.id !== id) return comment;
      return { ...comment, ...response.data };
    });
    setComments(updatedArr);
  };

  const data = {
    fetchCurrentUser,
    fetchComment,
    comments,
    currentUser,
    replyComment,
    addComment,
    deleteComment,
    deleteReplyComment,
    editComment,
    replyReplyComment,
    editReplyComment,
  };

  return (
    <CommentContext.Provider value={data}>{children}</CommentContext.Provider>
  );
};

export { Provider };
export default CommentContext;
