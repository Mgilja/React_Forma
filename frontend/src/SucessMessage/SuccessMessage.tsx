

const SuccessMessage:React.FC<{}> = () => {
    console.log('SuccessMessage component rendered');
  return (
    <div className="success-message">
      <p>Your form has been successfully submitted!</p>
    </div>
  );
};

export default SuccessMessage;
