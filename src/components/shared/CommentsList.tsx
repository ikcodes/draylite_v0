interface CommentsListProps {
  comments: Comment[];
}

interface Comment {
  created_at: string;
  comment: string;
}

const timeStyle = {
  color: "#999",
};

export const CommentsList = (props: CommentsListProps) => (
  <ul style={{ marginTop: 0, paddingLeft: 0, listStyle: "none" }}>
    {props.comments && (
      <>
        {props.comments.map((comment: Comment) => {
          console.log(comment);
          return (
            <li key={`comment-${JSON.stringify(comment)}`}>
              {comment.comment} | <span style={timeStyle}>{comment.created_at}</span>
            </li>
          );
        })}
      </>
    )}
    {!props.comments?.length && <li>No comments currently exist for this carrier.</li>}
  </ul>
);
