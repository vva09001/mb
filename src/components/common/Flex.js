import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Flex = ({ justify, align, inline, column, className, tag: Tag, children, ...rest }) => {
  return (
    <Tag
      className={classNames(
        {
          'd-flex': !inline,
          'd-inline-flex': inline,
          [`justify-content-${justify}`]: justify,
          [`align-items-${align}`]: align,
          'flex-column': column
        },
        className
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
};

Flex.propTypes = {
  children: PropTypes.node.isRequired,
  justify: PropTypes.oneOf(['start', 'center', 'end', 'between', 'around']),
  column: PropTypes.bool,
  inline: PropTypes.bool,
  align: PropTypes.oneOf(['start', 'center', 'end']),
  className: PropTypes.string,
  tag: PropTypes.string
};

Flex.defaultProps = {
  column: false,
  inline: false,
  tag: 'div'
};

export default Flex;
