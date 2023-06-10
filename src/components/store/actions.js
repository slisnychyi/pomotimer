import axios from 'axios';

export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';

export const loginUser = (email, password) => {
  return async (dispatch) => {
    try {
      const response = await axios.post('http://localhost:8080/api/v1/user/login', { email, password });
      const userId = response.data;

      dispatch({
        type: LOGIN_USER,
        payload: userId,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    dispatch({
      type: LOGOUT_USER,
    });
  };
};
