import RichTextEditor from "@/components/RichTextEditor";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const CourseTab = () => {
    const isPublished = true;
    const [input, setInput] = useState("")
  return (
    <Card>
        <CardHeader className="flex flex-row justify-between">
            <div>
                <CardTitle>
                    Basic Course Information
                </CardTitle>
                <CardDescription>
                    Make changes to your courses here. Click save when you're done.
                </CardDescription>
            </div>
            <div>
                <Button variant="outline">
                    {
                        isPublished ? "Unpublished" : "Published"
                    }
                </Button>
                <Button>
                    Remove Courses
                </Button>
            </div>
        </CardHeader>
        <CardContent>
            <div className="space-y-4 mt-5">
                <div>
                    <Label>Title</Label>
                    <Input type="text" name="courseTitle" placeholder="Ex. Fullstack developer"/>
                </div>
                <div>
                    <Label>Subtitle</Label>
                    <Input type="text" name="subTitle" placeholder="Ex. Become a Fullstack developer from zero to hero in 2 months"/>
                </div>
                <div>
                    <Label>Description</Label>
                    <RichTextEditor input={input} setInput={setInput}/>
                </div>
            </div>
        </CardContent>
    </Card>
  )
}

export default CourseTab