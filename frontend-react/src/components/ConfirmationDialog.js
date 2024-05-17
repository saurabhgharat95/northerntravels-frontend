const ConfirmationDialog = ({ message, onConfirm, onCancel,show }) => {
  return (
    <div className={`confirmation-popup ${show ? "show" : ""}`}>
    
      <div className="backdrop" onClick={onCancel}></div>
      <div className="popup-content ">
      
      <span class="font-weight-bold text-2xl block mb-2 mt-4">Confirmation</span>
        <br></br>
        <br></br>
        <br></br>
        <p><ion-icon style={{ marginBottom: "-6px",marginRight: "8px"}} name="warning-outline"></ion-icon>{message}</p>
        <br></br>
        <div className="text-right">
        <button className="mr-2 cancel-txt" onClick={onCancel}>No</button>
        <button className="confirm-btn " onClick={onConfirm}>Yes</button>

        </div>
        
      </div>
    </div>
  );
};
export default ConfirmationDialog;
