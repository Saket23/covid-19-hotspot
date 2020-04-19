import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getData as getDistrictData } from "../actions/getDistrictData";
import { getData as getStateData } from "../actions/getStateData";
import BubbleChart from "./BubbleChart";
import {
  isDataLoadedSelector as isDistrictDataLoadedSelector,
  getData as getDistrictDataSelector
} from "../selectors/getDistrictData";
import {
  isDataLoadedSelector as isStateDataLoadedSelector,
  getData as getStateDataSelector
} from "../selectors/getStateData";

class Container extends PureComponent {
  constructor(props) {
    super(props);
    this.chart = React.createRef();
  }

  componentDidMount() {
    const { getDistrictData, getStateData } = this.props;
    getDistrictData();
    getStateData();
  }

  render() {
    const {
      districtData,
      isDistrictDataLoaded,
      stateData,
      isStateDataLoaded
    } = this.props;
    if (isDistrictDataLoaded && isStateDataLoaded) {
      new BubbleChart(this.chart, stateData);
    }
    return <div ref={this.chart}></div>;
  }
}

function mapStateToProps(state) {
  return {
    districtData: getDistrictDataSelector(state),
    isDistrictDataLoaded: isDistrictDataLoadedSelector(state),
    stateData: getStateDataSelector(state),
    isStateDataLoaded: isStateDataLoadedSelector(state)
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getDistrictData, getStateData }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
