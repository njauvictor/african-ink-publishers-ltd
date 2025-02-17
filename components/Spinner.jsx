import { FaSpinner } from "react-icons/fa";

const Spinner = ({ className, size = 32 }) => {
  return (
    <FaSpinner
      className={cn("animate-spin text-accent-dark", className)}
      size={size}
      aria-label="Loading"
    />
  );
};

export default Spinner;