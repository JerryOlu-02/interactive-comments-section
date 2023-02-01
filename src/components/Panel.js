import '../css/Panel.css';
import classNames from 'classnames';

const Panel = function ({ className, children }) {
  const classes = classNames('panel', className);

  return <div className={classes}>{children}</div>;
};
export default Panel;
