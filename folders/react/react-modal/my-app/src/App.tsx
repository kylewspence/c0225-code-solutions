import { useState } from 'react';
import './App.css';
import { Modal } from './Modal';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  function showModal() {
    setIsOpen(true);
  }

  function deleteButton() {
    alert('Deleted!');
    setIsOpen(false);
  }

  function handleClose() {
    setIsOpen(false);
  }

  return (
    <>
      <button onClick={showModal}>Delete me!</button>
      <Modal isOpen={isOpen} onClose={handleClose}>
        <p>Do you want to delete?</p>
        <button onClick={() => setIsOpen(false)}>Cancel</button>
        <button onClick={deleteButton}>Delete</button>
      </Modal>
    </>
  );
}

export default App;
