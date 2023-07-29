import CommentShow from './CommentShow';
import useCommentContext from '../hooks/useCommentContext';
import ReplyShow from './ReplyShow';

const CommentList = function () {
  const { comments, loading, isError } = useCommentContext();

  const loadingBar = (
    <div className="loading-bar">
      <div>
        <span></span>
      </div>

      <div>
        <span></span>
      </div>

      <div>
        <span></span>
      </div>
    </div>
  );

  const renderedElements = comments.map((comment) => {
    return (
      <div key={comment.id}>
        <CommentShow comments={comment} />

        {comment.replies.length > 0 ? (
          <ReplyShow parentId={comment.id} replies={comment.replies} />
        ) : null}
      </div>
    );
  });

  return (
    <>
      {isError && (
        <div className="error-message">
          <p>{isError}</p>
        </div>
      )}

      {loading ? loadingBar : renderedElements}
    </>
  );
};

export default CommentList;
