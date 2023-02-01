import CommentShow from './CommentShow';
import useCommentContext from '../hooks/useCommentContext';
import ReplyShow from './ReplyShow';

const CommentList = function () {
  const { comments } = useCommentContext();

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

  return <div>{renderedElements}</div>;
};

export default CommentList;
