import React from "react";


import { Button, Checkbox, Label, Modal, TextInput } from 'flowbite-react';
import { useState } from 'react';

function Component() {
  const [openModal, setOpenModal] = useState(true);
  const [email, setEmail] = useState('');

  function onCloseModal() {
    setOpenModal(false);
    setEmail('');
  }

  return (
    <>
    
      <Modal show={openModal} onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div>
            <form>

              <input type="text" 
                placeholder="Enter a name...."
                name="firstName"></input>

                <br/>

              <input type="text"
                placeholder="Enter a name...."
                name="lastName"></input>




            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Component
