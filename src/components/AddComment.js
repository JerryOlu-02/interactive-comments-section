import { useState } from 'react';
import '../css/Addcomment.css';
import Panel from './Panel';
import userImage from '../images/avatars/image-juliusomo.png';
import useCommentContext from '../hooks/useCommentContext';

const AddComment = function () {
  const [comment, setComment] = useState('');
  const { addComment, currentUser } = useCommentContext();

  const postData = {
    content: comment,
    createdAt: new Date().toLocaleDateString(),
    score: 0,
    user: {
      image: {
        png: currentUser?.image?.png,
        webp: currentUser?.image?.webp,
      },
      username: 'juliusomo',
    },
    replies: [],
  };

  const handleSubmit = function (e) {
    e.preventDefault();
    addComment(postData);
    setComment('');
  };

  const textInputChange = function (e) {
    setComment(e.target.value);
  };

  return (
    <Panel className="add-comment-form">
      <img src={userImage} alt="current-userimage" />

      <form onSubmit={handleSubmit}>
        <textarea value={comment} onChange={textInputChange} />
        <button type="submit">Send</button>
      </form>
    </Panel>
  );
};
export default AddComment;
