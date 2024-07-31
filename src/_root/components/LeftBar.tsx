import { Link, useLocation, useNavigate } from "react-router-dom";
import { SideBarLinks, SideBarLinksType } from "./constantsLinks";
import { useSignOutAccount } from "../../TanstackQuery/queryMutation";
import { LogOut } from "lucide-react";
import { toast } from "../../@/components/ui/use-toast";
import { useEffect } from "react";

const LeftBar = () => {
  const { pathname } = useLocation();
  const { mutateAsync: logoutBtn, isSuccess } = useSignOutAccount();

  const navigate = useNavigate()

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "You LoggedOut Successfully",
      });
      navigate("/sign-up");
    }
  }, [isSuccess]);

  return (
    <div className=" w-1/6  flex flex-col p-4  fixed top-0 bottom-0 mt-11 bg-black">
      <section className="mt-10 flex-col justify-center items-center space-y-72">
        <ul className="flex flex-col justify-center items-center gap-8">
          {SideBarLinks.map((link: SideBarLinksType, id) => (
            <li
              key={id}
              className={`w-full group rounded-xl ${
                pathname === link.route ? "bg-purple-900" : ""
              }`}
            >
              <Link
                to={link.route}
                className="flex items-center gap-3 p-3 rounded-md text-white transition-all duration-200 ease-in-out transform hover:bg-purple-900 hover:scale-105 hover:text-white"
              >
                <link.icon
                  className={`w-6 h-6 group-hover:text-white  ${pathname === link.route ? "text-white" : "text-purple-400"}`}
                />
                <span className="text-lg">{link.name}</span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="logout flex cursor-pointer items-center" onClick={() => logoutBtn()}>
         <LogOut className="w-12 cursor-pointer"  />
          <p>Logout</p>
        </div>

      </section>
    </div>
  );
};

export default LeftBar;
