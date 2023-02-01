// import Panel from './Panel';
// import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';

// const CommentPanel = function (reply) {
//   return (
//     <div>
//       <Panel key={reply.id} className="reply-show">
//         <div>
//           <button className="score-btn">
//             <AiOutlinePlus />
//           </button>

//           <div>{reply.score}</div>

//           <button className="score-btn">
//             <AiOutlineMinus />
//           </button>
//         </div>

//         <div className="right-reply-section">
//           <div>
//             <img src={reply.user.image.png} alt="avatar" />

//             <p className="reply-username">{reply.user.username}</p>

//             {currentUser.username === reply.user.username ? content : null}

//             <p className="reply-time">{reply.createdAt}</p>

//             {userActions}
//           </div>

//           <div>
//             <p>
//               <span className="user-tag">@{reply.replyingTo}</span>{' '}
//               {reply.content}
//             </p>
//           </div>
//         </div>
//       </Panel>
//     </div>
//   );
// };
// export default CommentPanel;
