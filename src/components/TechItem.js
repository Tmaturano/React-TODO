//Steteless component

import React from 'react';
import PropTypes from 'prop-types';

// Could be also props then use props.technology 
function TechItem({ technology, onDelete }) {
  return (
    <li key={technology}>
      {technology}
      <button type="button" onClick={onDelete}>Remove</button>
    </li>
  );
}

TechItem.defaultProps = {
  technology: 'Hidden',
}

TechItem.propTypes = {
  technology: PropTypes.string,
  onDelete: PropTypes.func.isRequired,
}

export default TechItem;