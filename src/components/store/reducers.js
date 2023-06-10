import { LOGIN_USER, LOGOUT_USER } from './actions';

const initialState = {
  userId: localStorage.getItem('userId') || null,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      localStorage.setItem('userId', action.payload);
      return {
        ...state,
        userId: action.payload,
      };
    case LOGOUT_USER:
      localStorage.removeItem('userId');
      return {
        ...state,
        userId: null,
      };
    default:
      return state;
  }
};

export default rootReducer;
