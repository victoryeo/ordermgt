import React, { Component } from "react";
import Modal from 'react-bootstrap/Modal'
import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalFooter from "react-bootstrap/ModalFooter";
import ModalTitle from "react-bootstrap/ModalTitle";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

export default class PopUp extends Component {
  handleClick = () => {
    this.props.toggle();
  };

  render() {
    //console.log(this.props)
    return (
      <Modal show={true} size="sm">
        <ModalHeader>
          <ModalTitle>Search string</ModalTitle>
        </ModalHeader>
        <ModalBody>{this.props.string}</ModalBody>
        <Modal.Footer>
          <Button variant="primary" size="sm"  onClick={this.handleClick}>
                Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
