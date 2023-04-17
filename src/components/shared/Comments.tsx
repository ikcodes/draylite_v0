interface CommentsProps {
  carrierId?: number;
}

export const Comments = (props: CommentsProps) => {
  const { carrierId } = props;
  return (
    <>
      <h1>Comments Go Here!</h1>
    </>
  );
};
