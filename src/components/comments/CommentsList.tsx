import { Box } from "grommet";

interface CommentsListProps {
  comments: Comment[];
}

interface Comment {
  comment: string;
  comment_time: string;
}

const timeStyle = {
  color: "#999",
};

const commentRowStyle = {
  marginBottom: 15,
};

export const CommentsList = (props: CommentsListProps) => (
  <>
    {props.comments && (
      <>
        {props.comments.map((comment: Comment) => (
          <Box
            direction='row'
            justify='between'
            key={`comment-${JSON.stringify(comment)}`}
            style={commentRowStyle}
          >
            <Box basis='3/5'>{comment.comment}</Box>
            <Box basis='2/5' style={timeStyle}>
              {comment.comment_time}
            </Box>
            {/* <span style={timeStyle}>{comment.created_at}</span> */}
          </Box>
        ))}
      </>
    )}
    {!props.comments?.length && <li>No comments currently exist for this carrier.</li>}
  </>
);
