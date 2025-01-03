import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Home, Book, LogIn, LogOut, Menu, Sun, Moon, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useTheme } from "@/components/theme-provider";

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const authStatus = useSelector((state) => state.auth.status);
  // Add state to control Sheet open/close
  const [isOpen, setIsOpen] = React.useState(false);

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
  ];

  // Handle navigation with auto-close
  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  // Handle theme toggle
  const handleThemeToggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold">TrekSathi</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.slug}
              to={item.slug}
              className={`flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === item.slug
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
        </div>

        {/* Right side items */}
        <div className="flex items-center space-x-4">
          {/* Theme Toggle */}
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

          {/* Auth Buttons - Desktop */}
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
              <Button
                variant="ghost"
                onClick={() => {
                  // Implement your logout logic here
                  setIsOpen(false);
                }}
              >
                <LogOut className="h-5 w-5 mr-2" />
                Logout
              </Button>
            )}
          </div>

          {/* Mobile Menu */}
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
                {/* Navigation Items */}
                <div className="flex-grow flex flex-col space-y-4 mt-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.slug}
                      to={item.slug}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary ${
                        location.pathname === item.slug
                          ? "text-primary"
                          : "text-muted-foreground"
                      }`}
                    >
                      {item.icon}
                      <span>{item.name}</span>
                    </Link>
                  ))}
                </div>

                {/* Login and Signup Buttons */}
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
                      onClick={() => {
                        // Implement your logout logic here
                        setIsOpen(false);
                      }}
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
