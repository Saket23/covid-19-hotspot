import axios from "axios";

function start() {
  return {
    type: "GET_DISTRICT_DATA_START"
  };
}

function success(data) {
  return {
    type: "GET_DISTRICT_DATA_SUCCESS",
    data
  };
}

function failure(error) {
  return {
    type: "GET_DISTRICT_DATA_FAILURE",
    error
  };
}

function getDataUrl() {
  return axios.get(`https://api.covid19india.org/v2/state_district_wise.json`);
}

export function getData() {
  return dispatch => {
    dispatch(start());
    return getDataUrl()
      .then(response => {
        dispatch(success(response.data));
      })
      .catch(error => {
        dispatch(failure(error));
      });
  };
}
