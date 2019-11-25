import * as React from 'react'
import './index.less'
import './index.css'
import buyImg from '@/assets/img/1.png'
import testImg from '@/assets/img/2.png'
export default class Home extends React.PureComponent {
  render() {
    return (
      <div className="test test2">
        <p>hello worl1d</p>

        <img src={buyImg} alt="" />
        <img src={testImg} alt="" style={{ width: 360, height: 60 }} />
      </div>
    )
  }
}
