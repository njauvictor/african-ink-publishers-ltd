import { FaSpinner } from 'react-icons/fa';

export const Spinner = ({ size = 24, className = '' }) => {
  return (
    <FaSpinner
      className={`animate-spin ${className}`}
      style={{ width: size, height: size }}
    />
  );
};

export const FullPageLoader = () => {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50">
      <Spinner size={40} className="text-primary" />
    </div>
  );
};
