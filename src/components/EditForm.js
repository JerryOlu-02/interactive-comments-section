import { useState } from 'react';
import '../css/EditForm.css';
import useCommentContext from '../hooks/useCommentContext';

const EditForm = function ({ comment, onClose, parentId }) {
  const isParentVisible = Boolean(parentId);

  const { editComment, editReplyComment } = useCommentContext();

  const [editText, setEditText] = useState(comment.content);

  const editData = {
    id: comment.id,
    content: editText,
    createdAt: comment.createdAt,
    score: comment.score,
    user: {
      image: {
        png: comment.user.image.png,
        webp: comment.user.image.webp,
      },
      username: comment.user.username,
    },
    replyingTo: isParentVisible ? comment.replyingTo : undefined,
    replies: comment.replies,
  };

  const handleSubmit = function (e) {
    e.preventDefault();
    // console.log(editText);

    // Submit Edited Text
    isParentVisible
      ? editReplyComment(parentId, comment.id, editData)
      : editComment(comment.id, editData);

    // Close Edit Form
    onClose();
  };

  const handleChange = function (e) {
    setEditText(e.target.value);
  };

  return (
    <div className="edit-form">
      <form onSubmit={handleSubmit}>
        <textarea
          onChange={handleChange}
          value={editText}
          className="edit-form-text-area"
        />
        <button onSubmit={handleSubmit} className="edit-form-btn" type="submit">
          UPDATE
        </button>
      </form>
    </div>
  );
};

export default EditForm;
