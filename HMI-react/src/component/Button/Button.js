/**
 * Created by urunzl on 27.7.2016.
 */
import React from 'react';
import './Button.css';

class Button extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  };

  shouldComponentUpdate(nextProps,nextState){
    return false;
  }

  render() {
    var { value, className } = this.props;
    return (
      <button onClick={this.handleClick.bind(this)} className={className}> {value} </button>
    )
  }

  handleClick(){
    this.props.update(this.props.value);
  }
}
Button.propTypes = {
  value: React.PropTypes.string,
  className: React.PropTypes.string,
  update: React.PropTypes.func
};

export default Button;
