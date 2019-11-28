import * as React from "react";
import { connect } from "react-redux";
//tslint:disable
export const commonMuitl = WrapperComponent => {
  return connect(state => ({
    all: state
  }))(
    // @ts-ignore
    class Enchance extends WrapperComponent {
      constructor(props) {
        super(props);
        this.state = {
          ...this.state
        };
      }
      render() {
        return <React.Fragment>{super.render()}</React.Fragment>;
      }
    }
  );
};
