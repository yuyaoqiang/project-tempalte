import * as React from "react";
export default class App extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  componentDidCatch = () => {};
  render() {
    return (
      <div>
        <p>hello world</p>
      </div>
    );
  }
}
