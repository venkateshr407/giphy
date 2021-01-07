// import React, {Component, lazy, Suspense} from 'react';
import React, {Component} from 'react';

import './App.css';
// const Giphy = lazy(() => import('./Component/Giphy'));
import Giphy from './Component/Giphy';

class App extends Component{
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     color: "red"
  //   };
  // }
  // componentDidMount() {
  //   setTimeout(() => {
  //     this.setState({color: "yellow"})
  //   }, 2000)
  // }
  render() {
    return(
        <div className="App">
         
          <Giphy/>

        </div>

    )
  }
}

export default App;
