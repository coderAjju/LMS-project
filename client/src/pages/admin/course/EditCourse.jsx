import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

const EditCourse = () => {
  return (
    <div className="flex-1">
        <div className="flex items-center justify-between mb-5">
            <h1 className="font-bold text-xl">
                Add detail information regarding course
            </h1>
            <Link>
                <Button className="hover:text-blue-600" variant="link">Go to lectures page</Button>
            </Link>
        </div>
    </div>
  )
}

export default EditCourse