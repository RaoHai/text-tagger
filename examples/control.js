// use jsx to render html, do not modify simple.html

import 'rc-text-tagger/assets/index.less';
import TextTagger, { createFromText, getData } from 'rc-text-tagger';
import React from 'react';
import ReactDOM from 'react-dom';

const exampleText = `真說對木！作從故走。雄離安地二；的輪長師開而中小名位慢活共創，華進來、立師我以主？臺息服是所重氣北二本紙代頭問代為加力好。子天態異、交的看？行平道！經轉裝來天學覺專青期對紅說是和廣河畫不這的眾知樣是省經毛師獲！毛間條同明家……步來施臺後特評畫買查它青。`;
const ranges = [
  [1, 5, 'norb'],
  [14, 16, 'verb'],
  [19, 22, 'wrong'],
];


function onChange(editorState) {
  console.log(getData(editorState));
}

const App = React.createClass({
  getInitialState() {
    return { value : createFromText(exampleText, ranges)};
  },
  onChange(value) {
    console.log(' onChange ');
    this.setState({
      value,
    });
  },
  render() {
    return <TextTagger 
      value={this.state.value} 
      onSelectionChange={(text) => console.log('onSelectionChange', text)}
      suggestions={['aaa', 'bbb', 'ccc']}
      onChange={this.onChange}
      tag={(props) => <span>{props.children}</span>}
    />
  }
});


ReactDOM.render(<App />, document.getElementById('__react-content'));
