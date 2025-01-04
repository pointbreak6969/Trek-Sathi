import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import {
  Home,
  Book,
  LogIn,
  LogOut,
  Menu,
  Sun,
  Moon,
  X,
  Users,
  MessageCircle,
  UserPlus,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useTheme } from "@/components/theme-provider";
import authService from "@/services/auth";
import { logout } from "@/store/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const authStatus = useSelector((state) => state.auth.status);
  const [isOpen, setIsOpen] = React.useState(false);

  const handleLogout = async () => {
    try {
      await authService.logout();
      dispatch(logout());
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
    setIsOpen(false);
  };

  const navItems = [
    {
      name: "Home",
      slug: "/",
      icon: <Home className="h-5 w-5" />,
    },
    {
      name: "My Journal",
      slug: "/journal",
      icon: <Book className="h-5 w-5" />,
    },
    {
      name: "Join Group",
      slug: "/joingroups",
      icon: <UserPlus className="h-5 w-5" />,
    },
    {
      name: "Group Chat",
      slug: "/GroupFormation/mardi",
      icon: <MessageCircle className="h-5 w-5" />,
      badge: 3, // Optional: Add badge for unread messages
    },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  const handleThemeToggle = () => {
    toggleTheme();
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold">TrekSathi</span>
        </Link>
        {authStatus && (
          <div className="hidden md:flex md:items-center md:space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.slug}
                to={item.slug}
                className={`flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary relative ${
                  location.pathname === item.slug
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
                {item.badge && (
                  <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs px-1.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}
          </div>
        )}

        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleThemeToggle}
            className="transition-transform hover:scale-110"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5 transition-all" />
            ) : (
              <Moon className="h-5 w-5 transition-all" />
            )}
          </Button>

          <div className="hidden md:flex md:items-center md:space-x-2">
            {!authStatus ? (
              <>
                <Button
                  variant="ghost"
                  onClick={() => handleNavigation("/login")}
                >
                  Login
                </Button>
                <Button onClick={() => handleNavigation("/signup")}>
                  Sign up
                </Button>
              </>
            ) : (
              <Button variant="ghost" onClick={handleLogout}>
                <LogOut className="h-5 w-5 mr-2" />
                Logout
              </Button>
            )}
          </div>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                {isOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col h-full">
                <div className="flex-grow flex flex-col space-y-4 mt-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.slug}
                      to={item.slug}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary relative ${
                        location.pathname === item.slug
                          ? "text-primary"
                          : "text-muted-foreground"
                      }`}
                    >
                      {item.icon}
                      <span>{item.name}</span>
                      {item.badge && (
                        <span className="ml-2 bg-red-500 text-white text-xs px-1.5 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  ))}
                </div>

                <div className="pt-4 pb-4 flex flex-col space-y-2">
                  {!authStatus ? (
                    <>
                      <Button
                        variant="ghost"
                        className="justify-center"
                        onClick={() => handleNavigation("/login")}
                      >
                        <LogIn className="h-5 w-5 mr-2" />
                        Login
                      </Button>
                      <Button
                        className="justify-center"
                        onClick={() => handleNavigation("/signup")}
                      >
                        Sign up
                      </Button>
                    </>
                  ) : (
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-5 w-5 mr-2" />
                      Logout
                    </Button>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
