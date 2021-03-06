// use jsx to render html, do not modify simple.html

import '@ali/rc-text-tagger/assets/index.less';
import TextTagger, { createFromText, getData } from '@ali/rc-text-tagger';
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

ReactDOM.render(<TextTagger 
  value={createFromText(exampleText, ranges)} 
  onSelectionChange={(text) => console.log('onSelectionChange', text)}
  suggestions={['aaa', 'bbb', 'ccc']}
  onChange={onChange}
  tag={(props) => <span>{props.children}</span>}
/>, document.getElementById('__react-content'));
