import React, { useState, useEffect, useRef } from "react";
import Modal from 'react-bootstrap/Modal'
import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalFooter from "react-bootstrap/ModalFooter";
import ModalTitle from "react-bootstrap/ModalTitle";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import {connect} from "react-redux";
import {
  STPupdateBreakfast,
  STPupdateBurger,
  STPupdateHoney,
  STPupdateVegetables,
  STPupdateSoda,
  STPupdateTequila
 } from '../actions/actions.js'
import * as Rx from 'rxjs'

const PopUpFood = (props)=> {
  const [order, setOrder] = useState('');
  const elemRef = useRef()

  function handleClose() {
    setOrder('')
    props.toggle({order});
  }

  useEffect(()=> {
    console.log('render')
    const click$ = Rx.fromEvent(document, 'click')
      .subscribe(xx => console.log(xx))
    return () => click$.unsubscribe()
  }, [])

  function handleCheck() {
    console.log("handleCheck")
    let result
    let url = `http://localhost:4044/api/orderstatus/${props.name}`

    let data$ = new Rx.Observable(observer => {
      fetch(url, {
        method: 'GET',
         headers: {
           'Authorization': 'Token '+'4859499',
           'Content-Type': 'application/json'
         },
      })
      .then(response => response.json())
      .then(data => {
        observer.next(data)
        observer.complete()
      })
      .catch(err => observer.error(err))
    })

    data$.subscribe(data => {
      console.log(data)
      setOrder(data['result'])
      if (`${props.name}` == 'Breakfast') {
        console.log('update breakfast state')
        result = data['result']
        props.STPupdateBreakfast(result)
      }
      else if (`${props.name}` == 'Tasty burger') {
        console.log('update burger state')
        result = data['result']
        props.STPupdateBurger(result)
      }
      else if (`${props.name}` == 'Honey') {
        console.log('update honey state')
        result = data['result']
        props.STPupdateHoney(result)
      }
      else if (`${props.name}` == 'Vegetables') {
        console.log('update vegetables state')
        result = data['result']
        props.STPupdateVegetables(result)
      }
      else if (`${props.name}` == 'Soda') {
        console.log('update soda state')
        result = data['result']
        props.STPupdateSoda(result)
      }
      else if (`${props.name}` == 'Tequila') {
        console.log('update tequila state')
        result = data['result']
        props.STPupdateTequila(result)
      }
    })
  }

  function handleCancel() {
    console.log("handleCancel")
    let opts = {
      name: props.name,
      amount: 1
    }
    fetch("http://localhost:4044/api/ordercancel/", {
       method: 'POST',
       headers: {
         'Authorization': 'Token '+'4859499',
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

  }

  function handleOrder() {
    console.log("handleOrder")
    let result
    let opts = {
      name: props.name,
      amount: 1
    }
    fetch("http://localhost:4044/api/order/", {
       method: 'POST',
       headers: {
         'Authorization': 'Token '+'4859499',
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
          if (`${props.name}` == 'Breakfast') {
            console.log('update breakfast state')
            result = data['result']
            props.STPupdateBreakfast(result)
          }
          else if (`${props.name}` == 'Tasty burger') {
            console.log('update burger state')
            result = data['result']
            props.STPupdateBurger(result)
          }
          else if (`${props.name}` == 'Honey') {
            console.log('update honey state')
            result = data['result']
            props.STPupdateHoney(result)
          }
          else if (`${props.name}` == 'Vegetables') {
            console.log('update vegetables state')
            result = data['result']
            props.STPupdateVegetables(result)
          }
          else if (`${props.name}` == 'Soda') {
            console.log('update soda state')
            result = data['result']
            props.STPupdateSoda(result)
          }
          else if (`${props.name}` == 'Tequila') {
            console.log('update tequila state')
            result = data['result']
            props.STPupdateTequila(result)
          }
      })
    })
    .then( data => {
      console.log(data)
    })

    //props.toggle();
  }

  return (
    <Modal show={props.show} onHide={handleClose} size="sm">
        <ModalHeader  data-testid="title">
          <ModalTitle >{props.name} Price</ModalTitle>
        </ModalHeader>
        <ModalBody>
        ${props.price} <p/>
        Order Status: {order}
        </ModalBody>
        <Modal.Footer>
          <Button variant="primary" size="sm"  onClick={handleOrder} data-testid="order">
              Order</Button>
          <Button ref={elemRef} variant="primary" size="sm"  onClick={handleCheck}>
              Check</Button>
          <Button variant="primary" size="sm"  onClick={handleCancel}>
              Cancel</Button>
          <Button variant="secondary" size="sm"  onClick={handleClose}>
              Close</Button>
        </Modal.Footer>
    </Modal>
  );
}

const mapStateToProps = state => ({
  breakfast: state.reducers.breakfast,
})

const mapDispatchToProps = dispatch => ({
  STPupdateBreakfast: (result) => dispatch(STPupdateBreakfast(result)),
  STPupdateBurger: (result) => dispatch(STPupdateBurger(result)),
  STPupdateHoney: (result) => dispatch(STPupdateHoney(result)),
  STPupdateVegetables: (result) => dispatch(STPupdateVegetables(result)),
  STPupdateSoda: (result) => dispatch(STPupdateSoda(result)),
  STPupdateTequila: (result) => dispatch(STPupdateTequila(result)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PopUpFood);
