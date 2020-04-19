import { createSelector } from "reselect";

export function getData(state) {
  return state.stateData.data;
}
function isDataLoaded(data) {
  return data.length !== 0;
}

export const isDataLoadedSelector = createSelector(getData, isDataLoaded);
