import CommentContext from '../context/commentsContext';
import { useContext } from 'react';

const useCommentContext = function () {
  return useContext(CommentContext);
};

export default useCommentContext;
