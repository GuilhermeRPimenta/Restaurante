import { AiOutlineLoading3Quarters } from "react-icons/ai";

const LoadingIcon = ({ className }: { className?: string }) => {
  return (
    <div>
      <AiOutlineLoading3Quarters className={`${className} animate-spin`} />
    </div>
  );
};

export default LoadingIcon;
