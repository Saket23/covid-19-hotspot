import React from "react";
import Container from "./components";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import reducer from "./reducers";

const middleWares = [thunkMiddleware];
const store = createStore(reducer, applyMiddleware(...middleWares));

function App() {
  return (
    <Provider store={store}>
      <Container />
    </Provider>
  );
}

export default App;
