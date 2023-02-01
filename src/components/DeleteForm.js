import Modal from './Modal';
import useCommentContext from '../hooks/useCommentContext';

const DeleteForm = function ({ closeModal, comments, parentId }) {
  const isParentVisible = Boolean(parentId);

  const { deleteComment, deleteReplyComment } = useCommentContext();

  const handleDelete = function () {
    isParentVisible
      ? deleteReplyComment(parentId, comments.id)
      : deleteComment(comments.id);
    closeModal();
  };

  const modalButtons = (
    <>
      <button onClick={() => closeModal()} className="modal-btn-no">
        NO, CANCEL
      </button>
      <button onClick={handleDelete} className="modal-btn-yes">
        YES, DELETE
      </button>
    </>
  );

  return (
    <Modal actionBar={modalButtons} onClose={closeModal}>
      <h2>Delete Comment</h2>
      <p>
        Are you sure you want to delete this comment? This will remove the
        comment and cant't be undone.
      </p>
    </Modal>
  );
};

export default DeleteForm;
