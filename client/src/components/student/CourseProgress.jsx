import { CheckCircle2, CirclePlay } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";

const CourseProgress = () => {
  let isCompleted = false;
  return (
    <div className="max-w-7xl mx-auto p-4 mt-16">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Course Title</h1>
        <Button>Completed</Button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* video section */}
        <div className="flex-1 md:w-3/5 h-fit rounded-lg shadow-lg p-4">
          <div>
            {/* video ayega */}
            {/* video */}
          </div>
          {/* display current watching lecture title */}
          <div className="mt-2">
            <h3 className=" font-medium text-lg ">Lecutre -1 introduction</h3>
          </div>
        </div>
        {/* lecture sidebar */}
        <div className="flex flex-col w-full md:w-2/5 border-t md:border-t-0 md:border-l border-gray-200 md:pl-4 pt-4 md:pt-0">
          <h1 className=" font-semibold text-xl mb-4">Course Lecture </h1>
          {[1, 2, 3, 4].map((_, index) => (
            <Card
              key={index}
              className="mb-3 hover:cursor-pointer transition transform"
            >
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center">
                  {isCompleted ? (
                    <CheckCircle2 size={24} className="text-green-600 mr-2" />
                  ) : (
                    <CirclePlay size={24} className="text-gray-600 mr-2" />
                  )}
                  <div>
                    <CardTitle className="font-medium text-lg">
                      Introduction
                    </CardTitle>
                  </div>
                </div>
                <Badge
                  variant={"outline"}
                  className={"bg-green-200 text-green-600"}
                >
                  {isCompleted ? "Completed" : "Not Completed"}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseProgress;
