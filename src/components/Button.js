import PropTypes from 'prop-types';

const Button = ({ bgColor, text, onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{ backgroundColor: bgColor }}
      className="btn"
    >
      {text}
    </button>
  );
};

Button.defaultProps = {
  bgColor: '#000',
  text: 'Add',
};

Button.propTypes = {
  bgColor: PropTypes.string,
  text: PropTypes.string,
  onClick: PropTypes.func, // onClick: PropTypes.func.isRequired
};

export default Button;
