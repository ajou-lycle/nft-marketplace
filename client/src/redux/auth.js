import React from "react";
import { createAction, handleActions } from "redux-actions";

const CHANGE_INPUT = 'auth/CHANGE_INPUT';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';

export const ChangeInput = createAction(CHANGE_INPUT);
export const initialize_form = createAction(INITIALIZE_FORM);

const initialState = Map({
  register : Map({
    form : Map({
      userId : '',
      nickname : '',
      password : '',
      email : '',
      
    })
  }),

  login : Map({
    form : Map({
      userId : '',
      password : '',
    })
  })
});

export default handleActions({
  [CHANGE_INPUT] : (state, action) => {
    const {form, name, value} = action.payload;
    return state.setIn([form, 'form', name], value);
  },

  [INITIALIZE_FORM] : (state, action) => {
    const initialForm = initialState.get(action.payload);
    return state.set(action.payload, initialForm);
  }
}, initialState);



