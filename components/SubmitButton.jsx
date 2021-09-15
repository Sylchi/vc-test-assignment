
import Loader from 'react-loader-spinner';
import PropTypes from "prop-types";

const SubmitButton = ({ label, loading, icon, onClick, className, children }) => {
  return (
    <button
      type="submit"
      onClick={onClick}
      className={`group relative w-full text-center flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${className}`}
    >
    {children && 
      <span className="absolute left-0 inset-y-0 flex items-center pl-3">
        {children}
      </span>
    }
    { loading ? <Loader
      type="TailSpin"
      color="#fff"
      height={20}
      width={20}
      timeout={0} //3 secs
    /> : label }
  </button>
  );
}

export default SubmitButton;

SubmitButton.propTypes = {
  label: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  icon: PropTypes.func,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string
};