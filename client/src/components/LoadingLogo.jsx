import OnePlanLogo from '../assets/oneplan-logo.png';

const LoadingLogo = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <img
        src={OnePlanLogo}
        alt="Loading..."
        className="size-20  animate-pulse"
      />
    </div>
  );
};

export default LoadingLogo;
