import React, { useState } from "react";
import Modal from 'react-bootstrap/Modal'
import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalFooter from "react-bootstrap/ModalFooter";
import ModalTitle from "react-bootstrap/ModalTitle";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

const PopUpFood = (props)=> {
  const [order, setOrder] = useState('');
  function handleClose() {
    setOrder('')
    props.toggle({order});
  }

  function handleOrder() {
    console.log("handleOrder")
    let opts = {
      name: props.name,
      amount: 1
    }
    fetch("http://localhost:4044/api/order/", {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json'
       },
       body: JSON.stringify(opts)
    })
    .then(response => {
      response.json().then(
        data => {
          console.log(data)
          console.log(data['result'])
          setOrder(data['result'])
      })
    })
    .then( data => {
      console.log(data)
    })

    //props.toggle();
  }

  return (
    <Modal show={props.show} onHide={handleClose} size="sm">
        <ModalHeader>
          <ModalTitle>{props.name} Price</ModalTitle>
        </ModalHeader>
        <ModalBody>
        ${props.price} <p/>
        Order Status: {order}
        </ModalBody>
        <Modal.Footer>
          <Button variant="primary" size="sm"  onClick={handleOrder}>
              Order</Button>
          <Button variant="secondary" size="sm"  onClick={handleClose}>
                Close</Button>
        </Modal.Footer>
    </Modal>
  );
}

export default PopUpFood;
