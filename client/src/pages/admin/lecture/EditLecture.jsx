import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import axiosInstance from "@/lib/axios";
import useLectureStore from "@/zustand/useLectureStore";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const EditLecture = () => {
  const params = useParams();
  const {lectureId, courseId} = params;
  const [lectureTitle, setLectureTitle] = useState("")
  const [uploadVideoInfo, setUploadVideoInfo] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isFree, setIsFree] = useState(false)
 const [mediaProgress, setMediaProgress] = useState(false)
 const [uploadProgress, setUploadProgress] = useState(0)
 const [btnDisabled, setBtnDisabled] = useState(true)
 const {UploadLecture} = useLectureStore();
  const navigate= useNavigate();

 const fileChangeHandler = async (e) => {
    const file = e.target.files[0];

    if(file){
        const formData = new FormData();
        formData.append("video",file)
        setMediaProgress(true)
        try {
            const res = await axiosInstance.post(`/api/media/upload-video`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                onUploadProgress: ({loaded,total}) => {
                    const percentCompleted = Math.round((loaded * 100) / total);
                    setUploadProgress(percentCompleted)
                }
            })
            if(res.data.success){
                setUploadVideoInfo({videoUrl:res.data.data.url,publicId:res.data.data.public_id})
                setBtnDisabled(false)
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.message || error.message)
            setMediaProgress(false)
        }finally{
            setMediaProgress(false);
        }
    }
 }

  const uploadLecture = async () => {
      console.log(uploadVideoInfo)
      console.log(isFree)
      console.log(lectureTitle)
      if(!uploadVideoInfo || !lectureTitle) return toast.error("All fields are required")
      try {
      setIsLoading(true);
      const response = await UploadLecture(courseId,lectureId ,uploadVideoInfo,lectureTitle,isFree);
      if (!response.success) {
        throw new Error(response.error);  
      }
    } catch (error) {
      console.error(error.message);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    } 
  }


  useEffect(() => {
      (async()=>{
          try {
              const res = await axiosInstance.get(`/api/lecture/${lectureId}`)
              setLectureTitle(res.data.lecture.lectureTitle);
          } catch (error) {
              console.log(error);
          }
      })()
  },[])

  const removeLecture = async () => {
      try {
          const res = await axiosInstance.delete(`/api/lecture/${lectureId}`);
          toast.success(res.data.message);
          navigate(`/admin/course/${courseId}/lecture`)
      } catch (error) {
          console.log(error);
      }
  }



  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-3" onClick={()=>navigate(-1)}>
        <div className=" rounded-full border-2 border-gray-200 text-gray-700 w-8 h-8 flex justify-center items-center">
          <ArrowLeft className="" size={16} />
        </div>
        <span className="font-bold text-lg">Update Your Lecture</span>
      </div>
      <div className="border-2 border-gray-200 rounded-xl p-5 flex flex-col gap-4">
        <div>
          <span className="font-semibold">Edit Lecture</span>
          <p className="text-gray-500 text-sm">Make changes and click save when done.</p>
          <Button variant="destructive" className="mt-2" onClick={removeLecture}>Remove Lecture</Button>
        </div>
        <div>
          <Label>Title</Label>
          <Input type="text" value={lectureTitle} onChange={(e)=>setLectureTitle(e.target.value)} placeholder="lecture title" />
        </div>
        <div>
          <Label>Video <span className="text-red-500">*</span></Label>
          <Input type="file" accept="video/*" name="video" onChange={fileChangeHandler} />
        </div>
        <div className="flex items-center space-x-2">
          <Switch id="freeVideo" checked={isFree} onCheckedChange={(checked) => setIsFree(checked)}/>
          <Label htmlFor="freeVideo">Is this video FREE?</Label>
        </div>
        {
            mediaProgress && (
                <div className="my-4">
                    <Progress value={uploadProgress}/>
                    <div className="flex gap-2">
                    <p>{uploadProgress}% uploaded</p>
                    <Loader2 className="animate-spin"/>
                    </div>
                </div>
            )
        }
        <Button onClick={uploadLecture} className="w-fit" disabled={btnDisabled}>
          {
            isLoading ? <>
            <Loader2 className="animate-spin"/> 
            <span>Uploading...</span>
            </>
            : "Upload Lecture"
          }
        </Button>
      </div>
    </div>
  );
};

export default EditLecture;
