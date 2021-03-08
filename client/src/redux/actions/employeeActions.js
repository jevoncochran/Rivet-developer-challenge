import axios from "axios";

export const GET_EMPLOYEES_START = "GET_EMPLOYEES_START";
export const GET_EMPLOYEES_SUCCESS = "GET_EMPLOYEES_SUCCESS";
export const SET_EMPLOYEE_START = "SET_EMPLOYEE_START";
export const SET_EMPLOYEE_SUCCESS = "SET_EMPLOYEE_SUCCESS";
export const EMPLOYEE_UPDATE_TOGGLE_START = "EMPLOYEE_UPDATE_TOGGLE_START";
export const EMPLOYEE_UPDATE_TOGGLE_SUCCESS = "EMPLOYEE_UPDATE_TOGGLE_SUCCESS";

export const getEmployees = () => (dispatch) => {
  dispatch({ type: GET_EMPLOYEES_START });
  return axios
    .get("https://codechallenge.rivet.work/api/v1/profiles", {
      headers: {
        token:
          "2KsbQmoHHuzL2m6RpW4GWPJ3hTTdvVCXBRrEPuKGUnvxGycAEMdCJ9xTBLjpAH8C",
      },
    })
    .then((res) => {
      console.log(res.data);
      dispatch({ type: GET_EMPLOYEES_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const setEmployee = (employee) => (dispatch) => {
  dispatch({ type: SET_EMPLOYEE_START });
  dispatch({ type: SET_EMPLOYEE_SUCCESS, payload: employee });
};

export const changeEmployeeUpdateToggle = () => (dispatch) => {
  dispatch({ type: EMPLOYEE_UPDATE_TOGGLE_START });
  dispatch({ type: EMPLOYEE_UPDATE_TOGGLE_SUCCESS });
};
