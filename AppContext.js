import React, {useState, useEffect} from 'react';
//Our state context
export const initialState = {
  privatekey: '',
  configURL: '',
  contentID: ''
};

let AppContext = React.createContext(initialState);

export default AppContext;
