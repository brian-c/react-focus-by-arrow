(function() {
  var React;
  var ReactDOM;
  var FocusByArrow;
  if (typeof require !== 'undefined') {
    React = require('react');
    ReactDOM = require('react-dom');
    FocusByArrow = require('focus-by-arrow');
  } else if (typeof window !== 'undefined') {
    React = window.React;
    ReactDOM = window.ReactDOM;
    FocusByArrow = window.FocusByArrow;
  }

  function ReactFocusByArrow() {
    React.Component.apply(this, arguments);
  }

  ReactFocusByArrow.propTypes = {
    tag: React.PropTypes.string.isRequired,
    itemsSelector: React.PropTypes.string
  };

  ReactFocusByArrow.defaultProps = {
    tag: 'div',
    itemsSelector: undefined
  };

  ReactFocusByArrow.prototype = Object.assign(Object.create(React.Component.prototype), {
    focusByArrow: null,

    componentDidMount: function() {
      var rootNode = ReactDOM.findDOMNode(this);
      window.f = this.focusByArrow = new FocusByArrow(rootNode, this.props.itemsSelector);
    },

    componentWillUnmount: function() {
      this.focusByArrow.stopListening();
      this.focusByArrow = null;
    },

    componentWillReceiveProps: function(nextProps) {
      this.focusByArrow.itemsSelector = nextProps.itemsSelector;
    },

    render: function() {
      return React.createElement(this.props.tag, this.props, this.props.children);
    }
  });

  if (typeof module !== 'undefined') {
    module.exports = ReactFocusByArrow;
  } else if (typeof window !== 'undefined') {
    window.ReactFocusByArrow = ReactFocusByArrow;
  }
}());
