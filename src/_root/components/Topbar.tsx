
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

const Topbar = () => {

  const { user } = useAuthContext();



  return (
    <div className="flex justify-between items-center p-5 bg-zinc-900 shadow-xl fixed top-0 left-0 right-0 z-10">
      <Link to={"/"}>
        <img src="images/SocialMediaAppLogo.svg" className="w-40" alt="" />
      </Link>

      <div className="rightSideBar flex gap-5 items-center">
        {user.username ? (
          <div className="profileDet flex gap-3 items-center">
            <Link to={`/profile/${user.id}`}>
              <img
                src={`${user.imageUrl}`}
                alt=""
                className="w-12 rounded-full"
              />
            </Link>
            <div className="profileInfo flex-col">
              <p className="font-semibold text-white">{user.name}</p>
              <p className=" text-slate-400 text-xs">@{user.username}</p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Topbar;
