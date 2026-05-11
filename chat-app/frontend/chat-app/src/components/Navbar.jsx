import { Link } from "react-router-dom";
import useAuthhook from "../hooks/useAuthhook";
import { LogOut, MessageSquare, User } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthhook();

  return (
    <header className="border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg bg-base-100/80">
      {/* Use the same container constraints as your other components */}
      <div className="flex items-start justify-start pt-4 px-4">
        <div className="w-full max-w-6xl">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
                <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-primary" />
                </div>
                <h1 className="text-lg font-bold">Auton8 Chat-Support</h1>
              </Link>
            </div>

            <div className="flex items-center gap-2">
              {authUser && (
                <>
                  <Link 
                    to={"/profile"} 
                    className="btn btn-sm gap-2"
                  >
                    <User className="size-5" />
                    <span className="hidden sm:inline">Profile</span>
                  </Link>

                  <button 
                    className="btn btn-sm gap-2" 
                    onClick={logout}
                  >
                    <LogOut className="size-5" />
                    <span className="hidden sm:inline">Logout</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;