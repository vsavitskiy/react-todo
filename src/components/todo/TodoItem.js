/**
 * Created by vladimir on 04.02.17.
 */

import React from 'react';
import {partial} from '../../lib/utils';


export const TodoItem = (props) => {
  const handleToggle = partial(props.handleToggle, props.id);
  const handleRemove = partial(props.handleRemove, props.id);

  return (
    <li>
      <a className="delete-item" href="#" onClick={handleRemove}>x</a>
      <input type="checkbox" onChange={handleToggle} checked={props.isComplete}/> {props.name}
    </li>
  )
};


TodoItem.propTypes = {
  name: React.PropTypes.string.isRequired,
  isComplete: React.PropTypes.bool.isRequired,
  id: React.PropTypes.number.isRequired
};
