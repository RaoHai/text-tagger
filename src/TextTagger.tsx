import * as React from 'react';
import { Editor, EditorState, convertFromRaw, ContentState, CompositeDecorator } from 'draft-js';

import Token from './components/Token.react';
import Dropdown from './components/Dropdown.react';

import setImmediate from 'fbjs/lib/setImmediate';
import createFromText from './immutable/createFromText';
import getSelectedText from './immutable/getSelectedText';
import insertToken from './immutable/insertToken';
import getData from './immutable/getData';

export interface TextRangeProps {
  value: ContentState;
  onSelectionChange: (text: string) => void;
  suggestions?: Array<any>;
  prefixCls?: string,
  onChange?: (any) => void;
}

export interface TextRangeState {
  value: EditorState;
  dropdownVisible: boolean;
  clientRect?: ClientRect;
  focused: boolean;
}

function tokenStrategy(contentBlock, callback, contentState) {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity();
      if (entityKey === null) {
        return false;
      }
      return contentState.getEntity(entityKey).getType() === 'TOKEN';
    },
    callback
  );
};

export default class TextTagger extends React.Component<TextRangeProps, TextRangeState> {
  static createFromText = createFromText;
  static getData = getData;

  private dropdownContaienr: Element;
  private wrapper: Element;

  static defaultProps = {
    prefixCls: 'rc-text-tagger',
  };

  constructor(props) {
    super(props);

    const { tag } = props;
    const decorators = new CompositeDecorator([{
      strategy: tokenStrategy,
      component: (props) => tag ? React.createElement(tag, props) : <Token {...props} />,
    }]);

    this.state = {
      value: props.value ? EditorState.createWithContent(props.value, decorators) : EditorState.createEmpty(decorators),
      dropdownVisible: false,
      clientRect: null,
      focused: false,
    };

    this.dropdownContaienr = this.getContainer();
  }

  getContainer = () => {
    const popupContainer = document.createElement('div');
    const mountNode = document.body;
    mountNode.appendChild(popupContainer);
    return popupContainer;
  }

  onChange = (value: EditorState) => {
    this.setState({ 
      value,
    });
    this.props.onChange(value);
  }

  onMentionSelect = (element) => {
    this.onChange(
      insertToken(this.state.value, element),
    );
  }

  render() {
    const { value, dropdownVisible, clientRect } = this.state;
    const { prefixCls, suggestions } = this.props;
    return <div className="text-range-wrapper" ref={ele => this.wrapper = ele} >
      <Editor
        onChange={this.onChange}
        editorState={this.state.value}
        onFocus={() => setImmediate(() => this.setState({ focused: true }))}
        onBlur={() => this.setState({ focused: false })}
      />
      <Dropdown 
        prefixCls={prefixCls}
        clientRect={clientRect}
        container={this.dropdownContaienr}
        wrapper={this.wrapper}
        selection={value.getSelection()}
        selectedText={getSelectedText(value)}
        outerVisible={this.state.focused}
        suggestions={suggestions}
        onMentionSelect={this.onMentionSelect}
      />
    </div>
  }
}