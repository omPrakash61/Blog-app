import { useDispatch } from "react-redux";
import authService from "../appwrite/auth_service";
import { logOut } from "../../Auth-Slice/authSlice";
import { useNavigate } from "react-router-dom";

function LogoutBtn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = () => {
    authService.logOut().then(() => {
      dispatch(logOut());
      navigate(`/login`);
    });
  };
  return (
    <button
  onClick={logoutHandler}
  className="relative inline-block px-6 py-2 hover:shadow-red-400 hover:shadow-xl text-white bg-red-700 hover:rounded-t-lg overflow-hidden transition-all duration-300 ease-out group"
>
  <span className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-red-700 group-hover:w-1/2 transition-all duration-300 ease-out origin-left"></span>

  <span className="absolute bottom-0 right-1/2 w-0 h-[2px] bg-red-700 group-hover:w-1/2 transition-all duration-300 ease-out origin-right"></span>

  <span className="relative z-10">Logout</span>
</button>
  );
}

export default LogoutBtn;
