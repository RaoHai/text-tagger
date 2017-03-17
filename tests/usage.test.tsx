// add spec here!
import * as React from 'react';
import TextRanger from '../src';
import * as TestUtils from 'react-addons-test-utils';

describe('shoud run', () => {
  
  it('startup', () => {
    const wrapper = TestUtils.renderIntoDocument(<TextRanger />);

    expect(wrapper).not.toBe(null);
  });

  it('initial with data', () => {
    const exampleText = `真說對木！作從故走。雄離安地二；的輪長師開而中小名位慢活共創，華進來、立師我以主？臺息服是所重氣北二本紙代頭問代為加力好。子天態異、交的看？行平道！經轉裝來天學覺專青期對紅說是和廣河畫不這的眾知樣是省經毛師獲！毛間條同明家……步來施臺後特評畫買查它青。`;
    const ranges = [
      [1, 5, 'norb'],
      [8, 10, 'verb'],
      [12, 15, 'wrong'],
    ];

    const wrapper = TestUtils.renderIntoDocument(<TextRanger 
      text={exampleText}
      ranges={ranges} 
    />);
    expect(wrapper).not.toBe(null);
  });
});