/**
 * Created by vladimir on 04.02.17.
 */

import React, {Component} from 'react'


export class Link extends Component {
  static contextTypes = {
    route: React.PropTypes.string,
    linkHandler: React.PropTypes.func
  };

  handleClick(e) {
    e.preventDefault();
    this.context.linkHandler(this.props.to)
  }

  render() {
    const activeClass = this.context.route === this.props.to ? 'active': '';

    return <a href="#" className={activeClass} onClick={::this.handleClick}>{this.props.children}</a>
  }
}


Link.PropTypes = {
  to: React.PropTypes.string.isRequired
};
