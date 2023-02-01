import '../css/CommentShow.css';
import Panel from './Panel';
import EditForm from './EditForm';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { MdDelete, MdModeEditOutline } from 'react-icons/md';
import { FaReply } from 'react-icons/fa';
import ReplyForm from './ReplyForm';
import useCommentContext from '../hooks/useCommentContext';
import { useState } from 'react';
import DeleteForm from './DeleteForm';

const CommentShow = function ({ comments }) {
  const { currentUser } = useCommentContext();

  const [showReply, setShowReply] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleModal = function () {
    setShowModal(true);
  };

  const onCloseModal = function () {
    setShowModal(false);
  };

  const content = <p className="you">you</p>;

  // Functions Carried out on click of Action buttons
  const handleReply = function () {
    setShowReply(!showReply);
  };

  const handleEdit = function () {
    setShowEdit(!showEdit);
  };

  // VARIATIONS OF BUTTONS
  const userActions =
    currentUser.username === comments.user.username ? (
      <div className="user-action">
        <button onClick={handleModal} className="delete-btn">
          <MdDelete />
          Delete
        </button>

        <button onClick={handleEdit} className="edit-btn">
          <MdModeEditOutline />
          Edit
        </button>
      </div>
    ) : (
      <div className="user-action">
        <button onClick={() => handleReply()} className="reply-btn">
          <FaReply />
          Reply
        </button>
      </div>
    );

  const commentContent = (
    <div className="comment-content">
      <p>{comments.content}</p>
    </div>
  );

  return (
    <div className="flex-col">
      <Panel className="comment-show">
        <div>
          <button className="score-btn">
            <AiOutlinePlus />
          </button>

          <div>{comments.score}</div>

          <button className="score-btn">
            <AiOutlineMinus />
          </button>
        </div>

        <div className="right-comment-section">
          <div>
            <img src={`${comments.user.image.png}`} alt="avatar" />

            <p className="username">{comments.user.username}</p>

            {currentUser.username === comments.user.username ? content : null}

            <p className="time">{comments.createdAt}</p>

            {userActions}
          </div>

          {showEdit ? (
            <EditForm onClose={handleEdit} comment={comments} />
          ) : (
            commentContent
          )}
        </div>
      </Panel>

      {showReply && (
        <ReplyForm
          onClose={handleReply}
          className="comment-show-reply-form"
          reply={comments}
        />
      )}

      {showModal && (
        <DeleteForm closeModal={onCloseModal} comments={comments} />
      )}
    </div>
  );
};

export default CommentShow;
