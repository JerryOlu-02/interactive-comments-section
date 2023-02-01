import { useEffect } from 'react';
import AddComment from './components/AddComment';
import CommentList from './components/CommentList';
import useCommentContext from './hooks/useCommentContext';
import './css/App.css';

const App = function () {
  const { fetchCurrentUser, fetchComment } = useCommentContext();

  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  useEffect(() => {
    fetchComment();
  }, [fetchComment]);

  return (
    <div>
      <CommentList />
      <AddComment />
    </div>
  );
};

export default App;
