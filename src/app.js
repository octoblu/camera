import React, { Component } from 'react';
import { render } from 'react-dom';

import ViewFinder from './view-finder';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { videoUrl: null };
  }

  componentDidMount() {
    navigator.getMedia = (
      navigator.getUserMedia       ||
      navigator.msGetUserMedia     ||
      navigator.mozGetUserMedia    ||
      navigator.webkitGetUserMedia
    );

    navigator.getMedia({ video: true }, (stream) => {
      const vendorURL = window.URL || window.webkitURL;
      this.setState({
        videoUrl: vendorURL.createObjectURL(stream)
      });
    }, this.onError);
  }

  onError(err) {
    console.log("Video capture error: ", err.code);
  }

  handleClick(event) {
    console.log('Say Cheese!');
  }

  render() {
    const button = this.state.videoUrl && <button onClick={this.handleClick}>Capture</button>
    return <div>
      <h1>Smile!</h1>
      <h2>You're on Camera.</h2>

      <ViewFinder src={this.state.videoUrl} />
      <canvas id="canvas" width="640" height="480"></canvas>
      { button }

    </div>
  }
}

render(<App />, document.body);
