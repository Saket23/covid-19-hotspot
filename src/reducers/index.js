import { combineReducers } from "redux";
import getDistrictData from "./getDistrictData";
import getStateData from "./getStateData";

export default combineReducers({
  districtData: getDistrictData,
  stateData: getStateData
});
