import { Link } from "react-router-dom";
import Button from "../components/Global/Button";
import { IoHomeSharp } from "react-icons/io5";

const NotFound = () => {
  return (
    <div className="flex justify-center items-center flex-col">
      <h2 className="text-primary text-9xl ">404</h2>
      <p className="w-full text-5xl text-center">Página não encontrada!</p>
      <Link to={"/"}>
        <Button>
          <IoHomeSharp />
          Início
        </Button>
      </Link>
    </div>
  );
};

export default NotFound;
