import * as React from 'react';
import { Editor, EditorState, SelectionState, ContentState, CompositeDecorator } from 'draft-js';

import Token from './components/Token.react';
import Dropdown from './components/Dropdown.react';
import Option from './components/Option.react';

import setImmediate from 'fbjs/lib/setImmediate';
import createFromText from './immutable/createFromText';
import getSelectedText from './immutable/getSelectedText';
import insertToken from './immutable/insertToken';
import getData from './immutable/getData';

export interface TextRangeProps {
  onSelectionChange: (text: string) => void;
  suggestions: Array<any>;
  prefixCls?: string,
  onChange: (any) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  value: EditorState;
}

export interface TextRangeState {
  value: EditorState;
  clientRect?: ClientRect | null;
  focused: boolean;
  selection?: SelectionState | null;
}

function tokenStrategy(contentBlock, callback, contentState: ContentState) {
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
  static Option = Option;

  private dropdownContaienr: Element;
  private wrapper: Element;
  private _decorators: CompositeDecorator;
  
  static defaultProps = {
    prefixCls: 'rc-text-tagger',
  };

  constructor(props) {
    super(props);

    const { tag } = props;
    
    this._decorators = new CompositeDecorator([{
      strategy: tokenStrategy,
      component: (props) => tag ? React.createElement(tag, props) : <Token {...props} />,
    }]);

    this.state = {
      value: props.value ? 
        EditorState.createWithContent(props.value, this._decorators) : 
        EditorState.createEmpty(this._decorators),
      clientRect: null,
      focused: false,
      selection: null,
    };

    this.dropdownContaienr = this.getContainer();
  }

  getContainer = () => {
    const popupContainer = document.createElement('div');
    const mountNode = document.body;
    mountNode.appendChild(popupContainer);
    return popupContainer;
  }

  componentWillReceiveProps(nextProps) {
    const { selection } = this.state;
    let value = nextProps.value;
    if (!value.equals(this.state.value)) {
      if (selection) {
         value = EditorState.acceptSelection(
          EditorState.createWithContent(
            value, 
            this._decorators
          ),
          selection,
        );
      } else {
        value = EditorState.createWithContent(
          value, 
          this._decorators
        );
      }
      this.setState({
        value,
      });
    }
  }

  onChange = (value: EditorState) => {
    this.setState({ 
      selection: value.getSelection(),
    }, () => {
      this.props.onChange(value.getCurrentContent());
    });
  }

  onMentionSelect = (element) => {
    this.onChange(
      insertToken(this.state.value, element),
    );
  }

  onFocus = () => {
    this.props.onFocus && this.props.onFocus();
    setImmediate(() => this.setState({ focused: true }));
  }

  onBlur = () => {
    this.props.onBlur && this.props.onBlur();
    this.setState({ focused: false });
  }

  render() {
    const { value, clientRect } = this.state;
    const { prefixCls, suggestions } = this.props;
    return <div className="text-range-wrapper" ref={ele => this.wrapper = ele} >
      <Editor
        onChange={this.onChange}
        editorState={this.state.value}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
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