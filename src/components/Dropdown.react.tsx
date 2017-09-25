import * as React from 'react';
import cx from 'classnames';
import Animate from 'rc-animate';
import { SelectionState } from 'draft-js';

import Wrapper from './Wrapper.react';
import Option, { OptionProps } from '../components/Option.react';


export interface DropdownProps {
  prefixCls?: string;
  suggestions: Array<string> | Array<React.ReactElement<OptionProps>>;
  notFoundContent?: string;
  container: Element;
  clientRect: any;
  wrapper: React.ReactNode;
  selection: SelectionState;
  selectedText: string,
  outerVisible: boolean;
  onSelectionChange?: (text) => void;
  onMentionSelect: (element: any) => void;
}

export default class Dropdown extends React.Component<DropdownProps, any> {
  private popupContainer: HTMLElement;
  private focusedItem: Element;

  constructor() {
    super();
    this.state = {
      dropdownVisible: false,
      clientRect: null,
      focusedIndex: 0
    };
  }

  renderReady = () => {
    const { clientRect } = this.state;
    const { popupContainer } = this;
 
    if (popupContainer && clientRect) {
      popupContainer.style.left = `${clientRect.left}px`;
      popupContainer.style.top = `${clientRect.top}px`;
      popupContainer.style.position = 'fixed';
    }
  } 
  
  componentWillReceiveProps(nextProps) {
    const { selection, wrapper, selectedText, outerVisible } = nextProps;
    const nativeSelection = window.getSelection();
    if (!wrapper) {
      return;
    }

    if (selection.isCollapsed() || !outerVisible) {
      return this.closeDropdown();
    }

    if (nativeSelection.anchorNode && wrapper.contains(nativeSelection.anchorNode)) {
      const oRange = nativeSelection.getRangeAt(0); //get the text range
      const clientRect = oRange.getBoundingClientRect();
      if (this.props.onSelectionChange) {
        this.props.onSelectionChange(selectedText);
      }
      this.openDropdown(clientRect);
    }
  }
  
  openDropdown = (clientRect: ClientRect) => {
    this.setState({
      dropdownVisible: true,
      clientRect,
    });
  }

  closeDropdown = () => {
    this.setState({
      dropdownVisible: false,
      clientRect: null,
    });
  }

  renderOptions = () => {
    const { suggestions, prefixCls } = this.props;
    const { focusedIndex } = this.state;
    if (!suggestions.length) {
      return <div className="not-found" />
    }
    return suggestions.length ? React.Children.map(suggestions, (element, index) => {
      const focusedItem = index === focusedIndex;
      const ref = focusedItem ? ele => this.focusedItem = ele : null;
      
      const mentionClass = cx(`${prefixCls}-dropdown-item`, {
        focused: focusedItem,
      });
      if (React.isValidElement(element)) {
        return React.cloneElement(element as React.ReactElement<OptionProps>, {
          ref,
          className: mentionClass,
          onMouseDown: this.props.onMentionSelect.bind(this, (element as React.ReactElement<OptionProps>).props.data)
        });
      }
      return (<Option ref={ref}
        className={mentionClass}
        onMouseDown={this.props.onMentionSelect.bind(this, element)}
      >{element}</Option>);

    }) : <div className={`${prefixCls}-dropdown-notfound ${prefixCls}-dropdown-item`}>
      {this.props.notFoundContent}
    </div>;
  }

  
  render() {
    const { container, prefixCls } = this.props;
    const { dropdownVisible } = this.state;
    
    return <Wrapper
      renderReady={this.renderReady} 
      container={container}
    >
      <Animate
        transitionName="slide-up"
      >
        {dropdownVisible ? <div ref={ele => this.popupContainer = ele} className={`${prefixCls}-dropdown`}> 
          {this.renderOptions()}
        </div> : null}
      </Animate>
    </Wrapper>;
  }
}
