import {
  GET_EMPLOYEES_START,
  GET_EMPLOYEES_SUCCESS,
  SET_EMPLOYEE_START,
  SET_EMPLOYEE_SUCCESS,
} from "../actions/employeeActions";

const initialState = {
  employees: [],
  selectedEmployee: null,
  isLoading: false,
};

export const employeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_EMPLOYEES_START:
      return {
        ...state,
        isLoading: true,
      };
    case GET_EMPLOYEES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        employees: action.payload,
      };
    case SET_EMPLOYEE_START:
      return {
        ...state,
        isLoading: true,
      };
    case SET_EMPLOYEE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        selectedEmployee: action.payload,
      };
    default:
      return state;
  }
};
