import React, { useState, useEffect } from 'react';

const SwapModal = ({ show, handleClose, handleSwap, preselectedDay }) => {
  const [day1, setDay1] = useState('');
  const [day2, setDay2] = useState('');

  useEffect(() => {
    if (preselectedDay !== null) {
      setDay1(preselectedDay + 1); // Adjusting for 1-based index display
    }
  }, [preselectedDay]);

  const onSwap = () => {
    handleSwap(parseInt(day1) - 1, parseInt(day2) - 1); // Adjusting for 0-based index
    handleClose();
  };

  return (
    <div className={`confirmation-popup ${show ? "show" : ""}`} style={{ display: show ? 'grid' : 'none' }}>
    <div className="modal-content">
      <span className="close" onClick={handleClose}>&times;</span>
      <h2>Swap Days</h2>
      <div>
        <label>Day 1</label>
        <input
          type="number"
          value={day1}
          onChange={(e) => setDay1(e.target.value)}
          readOnly
        />
      </div>
      <div>
        <label>Day 2</label>
        <input
          type="number"
          value={day2}
          onChange={(e) => setDay2(e.target.value)}
        />
      </div>
      <button onClick={onSwap}>Swap</button>
    </div>
  </div>
  );
};

export default SwapModal;
