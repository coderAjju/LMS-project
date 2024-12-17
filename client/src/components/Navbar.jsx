import { LogOut, Menu, School } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ModeToggle } from "./mode-toggle";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import useAuthstore from "@/zustand/useAuthStore";

const Navbar = () => {
  const {user} = useAuthstore();
  return (
    <div className="h-16 dark:bg-[#0A0A0A] bg-white border-b dark:border-b-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 z-50 duration-300">
      {/* Desktop */}
      <div className="max-w-7xl mx-auto hidden md:flex justify-between items-center gap-10 h-full">
        <div className="flex items-center gap-3">
          <School size={"30"} />
          <h1 className="hidden md:block text-2xl font-bold">Learn Online</h1>
        </div>
        <div className="flex gap-3">
          {user ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar>
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link to={"/my-learning"} className="w-full">My Learning</Link>
                    </DropdownMenuItem>
                  <DropdownMenuItem><Link to={"/profile"} className="w-full">Edit Profile</Link></DropdownMenuItem>
                  <DropdownMenuItem className="w-full flex justify-between items-center">
                    <span>Log out</span>
                    <LogOut className="text-gray-700" />
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Button className="w-full">Dashboard</Button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <Button variant={"outline"}>
                <Link to={"/login"}>Sign In</Link>
              </Button>
              <Button>
                <Link to={"/signup"}>Sign Up</Link>
              </Button>
            </div>
          )}
          <ModeToggle />
        </div>
      </div>

      {/* mobile  */}
      <div className="md:hidden flex justify-between items-center h-full w-full px-3">
        <div className="flex items-center gap-3">
          <School size={"30"} />
          <h1 className="hidden sm:block text-2xl font-bold">Learn Online</h1>
        </div>
        <SheetDemo />
      </div>
    </div>
  );
};

export default Navbar;

function SheetDemo() {
  const role = "instructo";
  const navigate = useNavigate();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="bg-gray-400 rounded-full group" size="icon">
          <Menu className="text-gray-800 size-5 group-hover:text-white " />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-full sm:w-[400px]">
        <SheetHeader>
          <SheetTitle className="w-full flex justify-between items-center mt-8">
            <span>Learn Online</span> <ModeToggle />
          </SheetTitle>
        </SheetHeader>
        <ul className="flex flex-col space-y-3 my-3 w-full">
          <li >
            <SheetClose asChild >
            <Link to={"/my-learning"}>My Learning</Link>
            </SheetClose>
          </li>
          <li>
            <SheetClose asChild>
            <Link to={"/profile"}>Edit Profile</Link>
            </SheetClose>
          </li>
          <li>
            <Link>LogOut </Link>
          </li>
        </ul>
        {role === "instructor" ? (
          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit">Dashboard</Button>
            </SheetClose>
          </SheetFooter>
        ) : (
          <div className="flex items-center gap-3 w-full justify-center">
            <SheetClose asChild>
              <Button variant={"outline"} onClick={()=>navigate("/login")}>
                Sign In
              </Button>
            </SheetClose>
            <SheetClose asChild>
              <Button onClick={()=>navigate("/signup")}>
                Sign Up
              </Button>
            </SheetClose>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
