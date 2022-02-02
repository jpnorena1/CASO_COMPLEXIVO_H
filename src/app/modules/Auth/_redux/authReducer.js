/* eslint-disable camelcase */
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const initialState = {
  user: null,
  token: null,
};

export const FETCH_TOKEN = "FETCH_TOKEN";
export const REMOVE_TOKEN = "REMOVE_TOKEN";
export const PATIENT_INFORMATION = "PATIENT_INFORMATION";
export const USER_INFORMATION = "USER_INFORMATION";
export const FETCH_GET_DEPARTMENTS = "FETCH_GET_DEPARTMENTS";
export const FETCH_DOCTOR_CALENDARS = "FETCH_DOCTOR_CALENDARS";
export const FETCH_DOCTORS = "FETCH_DOCTORS";
export const FETCH_DOCTORS_USERS = "FETCH_DOCTORS_USERS";
export const ACTIVE_STEP = "ACTIVE_STEP";
export const SET_PATIENT_ROLE = "SET_PATIENT_ROLE";
export const SET_PATIENT_DEPARTMENT = "SET_PATIENT_DEPARTMENT";
export const SAVE_MY_USER = "SAVE_MY_USER";
export const tokenReducer = persistReducer(
  { storage, key: "appointment-auth" },
  (state = initialState, action) => {
    switch (action.type) {
      case FETCH_TOKEN:
        return {
          ...state,
          token: action.token,
        };
      case SAVE_MY_USER:
        return {
          ...state,
          user: action.myUser,
        };

      case PATIENT_INFORMATION:
        return {
          ...state,
        };
      case USER_INFORMATION:
        return {
          ...state,
          userInformation: action.payload,
        };
      case FETCH_GET_DEPARTMENTS:
        return {
          ...state,
          departments: action.payload,
        };
      case FETCH_DOCTOR_CALENDARS:
        return {
          ...state,
          doctorcalendars: action.payload,
        };
      case FETCH_DOCTORS:
        return {
          ...state,
          doctors: action.payload,
        };
      case FETCH_DOCTORS_USERS:
        return {
          ...state,
          doctorsusers: action.payload,
        };
      case ACTIVE_STEP:
        return {
          ...state,
          activeStep: action.payload,
        };
      case SET_PATIENT_ROLE:
        return {
          ...state,
          patientRole: action.payload,
        };
      case SET_PATIENT_DEPARTMENT:
        return {
          ...state,
          patientDepartment: action.payload,
        };
      case REMOVE_TOKEN:
        return initialState;
      default:
        return state;
    }
  }
);
