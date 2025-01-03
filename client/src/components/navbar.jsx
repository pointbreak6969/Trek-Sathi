import React from "react";
import {
  Home,
  Compass,
  Calendar,
  Bell,
  Moon,
  Sun,
  LogIn,
  UserPlus,
  Menu,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const Navbar = ({ theme, toggleTheme, navigate, isAuthenticated }) => {
  const navItems = [
    { icon: <Home className="h-5 w-5" />, text: "Home", path: "/" },
    {
      icon: <Compass className="h-5 w-5" />,
      text: "Explore",
      path: "/explore",
    },
    {
      icon: <Calendar className="h-5 w-5" />,
      text: "My Bookings",
      path: "/bookings",
    },
  ];

  const NavButtons = () => (
    <>
      {navItems.map((item) => (
        <Button
          key={item.path}
          variant="ghost"
          className="w-full justify-start h-12 px-4 hover:bg-accent"
          onClick={() => navigate(item.path)}
        >
          <div className="flex items-center">
            <div className="w-8">{item.icon}</div>
            <span className="font-medium">{item.text}</span>
          </div>
        </Button>
      ))}
    </>
  );

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4">
        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80 p-0">
            <SheetHeader className="p-6 border-b">
              <div className="flex items-center space-x-3">
                <Compass className="h-6 w-6" />
                <SheetTitle>Adventure Book</SheetTitle>
              </div>
            </SheetHeader>

            <div className="flex flex-col py-2">
              <NavButtons />
              <Button
                variant="ghost"
                className="w-full justify-start h-12 px-4 hover:bg-accent"
                onClick={toggleTheme}
              >
                <div className="flex items-center">
                  <div className="w-8">
                    {theme === "light" ? (
                      <Moon className="h-5 w-5" />
                    ) : (
                      <Sun className="h-5 w-5" />
                    )}
                  </div>
                  <span className="font-medium">
                    {theme === "light" ? "Dark Theme" : "Light Theme"}
                  </span>
                </div>
              </Button>
            </div>

            {!isAuthenticated && (
              <div className="absolute bottom-0 left-0 right-0 border-t p-6">
                <div className="grid gap-4 grid-cols-2">
                  <Button variant="outline" className="w-full">
                    <LogIn className="h-4 w-4 mr-2" />
                    Log In
                  </Button>
                  <Button className="w-full">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Sign Up
                  </Button>
                </div>
              </div>
            )}
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <div className="flex items-center space-x-4">
          <Compass className="h-6 w-6" />
          <h2 className="text-xl font-bold hidden md:block">Adventure Book</h2>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-2 mx-6">
          <NavButtons />
        </div>

        {/* Right Side Items */}
        <div className="flex items-center ml-auto space-x-2">
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full" />
          </Button>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle Theme"
          >
            {theme === "light" ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </Button>

          {isAuthenticated ? (
            <Avatar>
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt="User Avatar"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          ) : (
            <div className="hidden md:flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <LogIn className="h-4 w-4 mr-2" />
                Log In
              </Button>
              <Button size="sm">
                <UserPlus className="h-4 w-4 mr-2" />
                Sign Up
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
