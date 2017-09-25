import * as React from 'react';

export interface OptionProps {
  className: string,
  key: string,
  children: any;
  data: any;
  ref: any;
  onMouseDown: any;
}

export default function Option(props) {
  return <div 
    className={props.className} 
    key={props.key}
    onMouseDown={props.onMouseDown}
  >{props.children}</div>;
}

