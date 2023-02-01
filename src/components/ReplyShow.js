import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { FaReply } from 'react-icons/fa';
import { MdDelete, MdModeEditOutline } from 'react-icons/md';
import '../css/ReplyShow.css';
import Panel from './Panel';
import useCommentContext from '../hooks/useCommentContext';
import ReplyForm from './ReplyForm';
import { useState } from 'react';
import EditForm from './EditForm';
import DeleteForm from './DeleteForm';

const ReplyShow = function ({ replies, parentId }) {
  //Expandex State: To Check if a ReplyForm should be visible
  const [expandedReplyIndex, setExpandedReplyIndex] = useState(-1);
  const [expandedEditIndex, setExpandedEditIndex] = useState(-1);
  const [expandedModal, setExpandedModal] = useState(-1);

  // Get Current User from commentsContext
  const { currentUser } = useCommentContext();

  // console.log(replies);

  // JSx element for currentUser
  const content = <p className="reply-you">you</p>;

  // Toggle ReplyForm
  const handleReply = function (nextIndex) {
    setExpandedReplyIndex((currentExpandedIndex) => {
      return currentExpandedIndex === nextIndex ? -1 : nextIndex;
    });
  };

  const handleEdit = function (nextIndex) {
    setExpandedEditIndex((currentExpandedIndex) => {
      return currentExpandedIndex === nextIndex ? -1 : nextIndex;
    });
  };

  const handleExpandedModal = function (nextModal) {
    setExpandedModal((currentExpandedModal) => {
      return currentExpandedModal === nextModal ? -1 : nextModal;
    });
  };

  const renderedElement = replies.map((reply, index) => {
    // Returns true if Expandex Index is equal to Index
    const isReplyExpanded = expandedReplyIndex === index;
    const isEditExpanded = expandedEditIndex === index;
    const isModalExpanded = expandedModal === index;

    // Button Variotions depending on the Current user
    const userActions =
      currentUser.username === reply.user.username ? (
        <div className="user-action">
          <button
            onClick={() => handleExpandedModal(index)}
            className="delete-btn"
          >
            <MdDelete />
            Delete
          </button>

          <button onClick={handleEdit.bind(this, index)} className="edit-btn">
            <MdModeEditOutline />
            Edit
          </button>
        </div>
      ) : (
        <div className="user-action">
          <button onClick={() => handleReply(index)} className="reply-btn">
            <FaReply />
            Reply
          </button>
        </div>
      );

    const commentContent = (
      <div className="comment-content">
        <p>
          <span className="user-tag">@{reply.replyingTo}</span> {reply.content}
        </p>
      </div>
    );

    return (
      <div key={reply.id}>
        <Panel className="reply-show">
          <div>
            <button className="score-btn">
              <AiOutlinePlus />
            </button>

            <div>{reply.score}</div>

            <button className="score-btn">
              <AiOutlineMinus />
            </button>
          </div>

          <div className="right-reply-section">
            <div>
              <img src={reply.user.image.png} alt="avatar" />

              <p className="reply-username">{reply.user.username}</p>

              {currentUser.username === reply.user.username ? content : null}

              <p className="reply-time">{reply.createdAt}</p>

              {userActions}
            </div>

            {isEditExpanded ? (
              <EditForm
                parentId={parentId}
                onClose={() => handleEdit(index)}
                comment={reply}
              />
            ) : (
              commentContent
            )}
          </div>
        </Panel>

        {isReplyExpanded && (
          <ReplyForm
            onClose={() => handleReply(-1)}
            className="reply-show-reply-form"
            reply={reply}
            parentId={parentId}
          />
        )}

        {isModalExpanded && (
          <DeleteForm
            closeModal={() => setExpandedModal(-2)}
            comments={reply}
            parentId={parentId}
          />
        )}
      </div>
    );
  });

  return <div className="reply-show-container flex-col">{renderedElement}</div>;
};

export default ReplyShow;
