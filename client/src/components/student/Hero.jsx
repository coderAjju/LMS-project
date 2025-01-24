import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const navigate = useNavigate();
  const searchHandler = (e) => {
    e.preventDefault();
    if (searchQuery.trim() === "") return;
    navigate(`/course/search?query=${searchQuery}`);
  };
  return (
    <div className="relative bg-gradient-to-r from-blue-500 to bg-indigo-600 dark:from-gray-800 dark:to-gray-900 py-16 px-4 text-center">
      <div className="max-w-3xl mx-auto flex items-center mt-6 justify-center flex-col">
        <h1 className="text-white text-4xl font-bold mb-4">
          Find Best Courses for You
        </h1>
        <p className="text-gray-200 dark:text-gray-400 mb-8">
          Discover, Learn, and Upskill with our wide range of courses{" "}
        </p>
        <form
          onSubmit={searchHandler}
          className=" relative flex w-full justify-center  max-w-md items-center space-x-2"
        >
          <Input
            type="text"
            value={searchQuery}
            className="w-full rounded-2xl bg-white outline-none focus-visible:ring-0 border-none"
            placeholder="Search here ..."
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button
            type={"submit"}
            className="absolute right-0 rounded-r-2xl rounded-l-none"
          >
            Search
          </Button>
        </form>
        <Button variant="outline" size="" className="rounded-2xl mt-5">
          Explore Courses
        </Button>
      </div>
    </div>
  );
};

export default Hero;
