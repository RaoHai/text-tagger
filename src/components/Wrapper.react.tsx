import * as React from 'react';
import * as ReactDOM from 'react-dom';

export interface WrapperProps {
  renderReady: () => any;
  container: any;
};

export default class Wrapper extends React.Component<WrapperProps, any> {
  componentDidMount() {
    this.renderComponent();
  }
  componentDidUpdate() {
    this.renderComponent();
  }
  renderComponent() {
    const instance = this.props.children;
    const ready = this.props.renderReady;
    ReactDOM.unstable_renderSubtreeIntoContainer(this,
      instance, this.props.container,
      function callback() {
        if (ready) {
          ready.call(this);
        }
      });
  }
  render() {
    return null;
  }
}
