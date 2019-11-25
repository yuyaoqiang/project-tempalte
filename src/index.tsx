import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Home from '@/home/home'
import { connectionProps, connectionState } from '@/connectionTypes'
class App extends React.Component<connectionProps, connectionState> {
  render() {
    return (
      <div style={{ color: '#333' }} className="test test2">
        <Home />
      </div>
    )
  }
}
ReactDOM.render(<App />, document.getElementById('app'))
