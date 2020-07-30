const actionTypes = {
	UPDATE_BREAKFAST: 'UPDATE_BREAKFAST',
	UPDATE_BURGER: 'UPDATE_BURGER',
	UPDATE_HONEY: 'UPDATE_HONEY',
	UPDATE_VEGETABLES: 'UPDATE_VEGETABLES',
  UPDATE_SODA: 'UPDATE_SODA',
  UPDATE_TEQUILA: 'UPDATE_TEQUILA',
}

export const STPupdateBreakfast = state => dispatch => {
  console.log(state)
  dispatch({
    type: actionTypes.UPDATE_BREAKFAST,
    payload: state,
  });
};

export const STPupdateBurger = state => dispatch => {
    console.log(state)
  dispatch({
    type: actionTypes.UPDATE_BURGER,
    payload: state,
  });
};

export const STPupdateHoney = state => dispatch => {
    console.log(state)
  dispatch({
    type: actionTypes.UPDATE_HONEY,
    payload: state,
  });
};

export const STPupdateVegetables = state => dispatch => {
    console.log(state)
  dispatch({
    type: actionTypes.UPDATE_VEGETABLES,
    payload: state,
  });
};

export const STPupdateSoda = state => dispatch => {
  dispatch({
    type: actionTypes.UPDATE_SODA,
    payload: state,
  });
};

export const STPupdateTequila = state => dispatch => {
  dispatch({
    type: actionTypes.UPDATE_TEQUILA,
    payload: state,
  });
};
