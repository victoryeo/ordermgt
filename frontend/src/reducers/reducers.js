export const initialState = {
  breakfast: 'none',
  burger : 'none',
  honey: 'none',
  vegetables: 'none',
  soda: 'none',
  tequila: 'none'
}

export const reducers = (state = initialState, action) => {
  console.log("actiontype "+action.type)
  let val = {}
  switch (action.type) {
    case 'UPDATE_BREAKFAST':
      return {
        ...state,
        breakfast: action.payload,
      };
      break;
    case 'UPDATE_BURGER':
      return {
        ...state,
        burger: action.payload,
      };
      break;
    case 'UPDATE_HONEY':
      return {
        ...state,
        honey: action.payload,
      }
      break;
    case 'UPDATE_VEGETABLES':
      val = {
        ...state,
        vegetables: action.payload,
      };
      break;
    case 'UPDATE_SODA':
      val = {
        ...state,
        soda: action.payload,
      };
      break;
    case 'UPDATE_TEQUILA':
      val = {
        ...state,
        tequila: action.payload,
      };
      break;
    default:
      val =  state

  }
  console.log("val " + val.username)
  return val
};

export default reducers;
