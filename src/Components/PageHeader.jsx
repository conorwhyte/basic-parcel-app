import React, { Component } from 'react';
import AceEditor from 'react-ace';

import './PageHeader.css';

class CardHeader extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      ...props
    };
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      ...newProps
    });
  }

  onInput() {
    // this.props.queryChanged(newInput);
  }

  render() {
    return (
      <div className="App-header">
        <b>QUERY:</b> 
        <AceEditor
          // mode="null"
          // theme="null"
          height="50px"
          width="75%"
          value={'CONOR'}
          showGutter={false}
          highlightActiveLine={false}
          fontSize={14}
          maxLines={1}
          onChange={this.onInput.bind(this)}
          debounceChangePeriod={800}
          name="QueryEditor"
        />
      </div>
    );
  }
}

export default CardHeader;
  