import { navbarRoutes } from "@/main/routes";
import useLoadAuthUser from "../hooks/use-load-auth-user";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const { userAuth: isAuthenticate } = useLoadAuthUser();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex flex-row justify-between w-full">
              <div className="flex-shrink-0 flex items-center">
                <Link to="/" className="text-xl font-semibold text-gray-800">
                  MyHealth
                </Link>
              </div>
              <div className="hidden justify-end sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                <NavigationMenu>
                  <NavigationMenuList className="flex space-x-4">
                    {navbarRoutes?.map((route) =>
                      Boolean(route.isPrivate) !==
                      Boolean(isAuthenticate) ? null : (
                        <NavigationMenuItem key={route.path}>
                          <Link
                            className={navigationMenuTriggerStyle()}
                            to={route.path}
                          >
                            {route.name}
                          </Link>
                        </NavigationMenuItem>
                      )
                    )}
                  </NavigationMenuList>
                </NavigationMenu>
              </div>
            </div>
            <div className="flex sm:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-800"
              >
                {isMobileMenuOpen ? "✖" : "☰"}
              </button>
            </div>
          </div>
          {isMobileMenuOpen && (
            <div className="sm:hidden mt-4 space-y-2">
              {navbarRoutes?.map((route) =>
                Boolean(route.isPrivate) !== Boolean(isAuthenticate) ? null : (
                  <Link
                    key={route.path}
                    to={route.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-3 py-2 text-base font-medium text-gray-800 hover:bg-gray-100"
                  >
                    {route.name}
                  </Link>
                )
              )}
            </div>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
