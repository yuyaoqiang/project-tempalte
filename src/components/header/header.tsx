import React, { PureComponent } from "react";

class Header extends PureComponent {
  componentDidMount = () => {
    console.log(this.props);
  };
  render() {
    // const { lotteryTradition } = this.props.user;
    // const HeaderComponent = commonMuitl(Header);
    return (
      <div>
        <div className="flexContainer ignore">
          <div className="aspectratio w-375-224">
            <div className="aspectratio-content">
              <img src="//gw.alicdn.com/mt/TB1HsjfSXXXXXcFXpXXXXXXXXXX-375-224.png"></img>
            </div>
          </div>
          <div className="aspectratio w-375-224">
            <div className="aspectratio-content ">
              <img src="//gw.alicdn.com/mt/TB1HsjfSXXXXXcFXpXXXXXXXXXX-375-224.png"></img>
            </div>
          </div>
        </div>
        {/* <Button type="primary">Start</Button> */}
        {/* <HeaderComponent /> */}
        {/* <div>
          {lotteryTradition.map(item => {
            return <p key={item.id}>{item.name}</p>;
          })}
        </div> */}
      </div>
    );
  }
}

export default Header;
