import Panel from './Panel';
import '../css/Addcomment.css';
import useCommentContext from '../hooks/useCommentContext';
import { useState } from 'react';
import classNames from 'classnames';

const ReplyForm = function ({ reply, className, onClose, parentId }) {
  const isParentIdVisible = Boolean(parentId);

  const { currentUser, replyComment, replyReplyComment } = useCommentContext();

  const [replyText, setReplyText] = useState();

  const uid = function () {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  };

  const replyData = {
    id: uid(),
    content: replyText,
    createdAt: new Date().toLocaleDateString(),
    score: 0,
    replyingTo: reply.user.username,
    user: {
      image: {
        png: currentUser.image.png,
        webp: currentUser.image.webp,
      },
      username: currentUser.username,
    },
  };

  const handleSubmit = function (e) {
    e.preventDefault();

    isParentIdVisible
      ? replyReplyComment(parentId, replyData)
      : replyComment(reply.id, reply, replyData);

    // Hide Reply Form
    onClose();
  };

  const handleChange = function (e) {
    setReplyText(e.target.value);
  };

  const classes = classNames('add-comment-form', className);

  return (
    <Panel className={classes}>
      <img src={currentUser.image.png} alt="user-avatar" />

      <form onSubmit={handleSubmit}>
        <textarea value={replyText} onChange={handleChange} />
        <button onClick={handleSubmit} type="submn=it">
          REPLY
        </button>
      </form>
    </Panel>
  );
};
export default ReplyForm;
