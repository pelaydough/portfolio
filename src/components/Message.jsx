const Message = ({ content }) => {
  return (
    <div className="min-h-[calc(100vh-180px)] flex flex-col items-center justify-center px-12 text-center">
      {content.length > 1
        ? content.map((message, index) => <div key={index}>{message}</div>)
        : content}
    </div>
  );
};

export default Message;
