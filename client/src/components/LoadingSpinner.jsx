import { LoaderPinwheel } from 'lucide-react';

const LoadingSpinner = ({ size, color }) => {
  return (
    <LoaderPinwheel
      size={size}
      color={color}
      strokeWidth={1.5}
      className="animate-spin"
    />
  );
};

export default LoadingSpinner;
