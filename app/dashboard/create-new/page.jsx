"use client";
import React, { useContext, useEffect, useState } from "react";
import SelectTopic from "./_components/SelectTopic";
import SelectStyle from "./_components/SelectStyle";
import SelectDuration from "./_components/SelectDuration";
import { Button } from "@/components/ui/button";
import axios from "axios";
import CustomLoading from "./_components/CustomLoading";
import { v4 as uuidv4 } from "uuid";
import { VideoDataContext } from "@/app/_context/VideoDataContext";
import { db } from "@/configs/db";
import { useUser } from "@clerk/nextjs";
import { Users, VideoData } from "@/configs/schema";
import PlayerDialog from "../_components/PlayerDialog";
import { useRouter } from "next/navigation";
import { UserDetailContext } from "@/app/_context/UserDetailContext";
import { toast } from "sonner";
import { eq } from "drizzle-orm";


const CreateNew = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [videoScript, setVideoScript] = useState(null);
  const [audioFileUrl, setAudioFileUrl] = useState();
  const [imageList, setImageList] = useState([]);
  const [captions, setCaptions] = useState();
  const [playVideo, setPlayVideo] = useState(true);
  const [videoId, setVideoId] = useState(6);
  const {videoData, setVideoData} = useContext(VideoDataContext);
  const {userDetail, setUserDetail} = useContext(UserDetailContext);
  const {user} = useUser();

  const onHandleInputChange = (fieldName, fieldValue) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: fieldValue,
    }));
  };

  const onCreateClickHandler = async () => {
    // if (!userDetail?.credits <= 10) {
    //   toast("You don't have enough Credits.")
    //   return;
    // }
    GetVideoScript();
  };

  const GetVideoScript = async () => {
    setLoading(true);
    try {
      console.log("Getting video script...");
      const prompt =
        "Write a script to generate " +
        formData.duration +
        " video on topic : " +
        formData.topic +
        " along with AI image prompt in " +
        formData.imageStyle +
        " format for each scene and give me result in JSON format with imagePrompt and ContentText as field, No Plain text";

      const result = await axios.post("/api/get-video-script", {
        prompt: prompt,
      });

      if (result.data && result.data.result) {
        console.log("Video script received:", result.data.result);
        setVideoData(prev => ({
          ...prev,
          'videoScript':result.data.result
        }))
        setVideoScript(result.data.result); 
        await GenerateAudioFile(result.data.result);
      } else {
        console.error("Invalid video script response:", result.data);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching video script:", error);
      setLoading(false);
    }
  };

  const GenerateAudioFile = async (videoScriptData) => {
    try {
      console.log("Generating audio file...");
      let script = videoScriptData.map((item) => item.ContentText).join(" ");
      const id = uuidv4();
      const response = await axios.post("/api/generate-audio", {
        text: script,
        id: id,
      });

      if (response.data && response.data.Result) {
        console.log("Audio file generated:", response.data.Result);
        setVideoData(prev => ({
          ...prev,
          'audioFileUrl':response.data.Result
        }))
        setAudioFileUrl(response.data.Result);
        await GenerateAudioCaption(response.data.Result, videoScriptData);
      } else {
        console.error("No audio file URL received in the expected format");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error generating audio file:", error);
      setLoading(false);
    }
  };

  const GenerateAudioCaption = async (fileurl, videoScriptData) => {
    try {
      console.log("Generating audio caption...");
      const response = await axios.post("/api/generate-caption", {
        audioFileUrl: fileurl,
      });
      if (response.data) {
        console.log("Captions generated:", response.data.transcript);
        setVideoData(prev => ({
          ...prev,
          'captions':response.data.transcript
        }))
        setCaptions(response.data.transcriptt);

        // Ensure images are generated after captions
        response.data.transcript&&generateImages(videoScriptData);
      } else {
        console.error("No captions received in the response");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error generating captions:", error);
      setLoading(false);
    }
  };

  const generateImages = async (videoScriptData) => {

    let images = [];

    for (const element of videoScriptData) {
      try {
        const resp = await axios.post('/api/generate-image', {
          prompt:element.imagePrompt
        });
        console.log(resp.data.result);
        images.push(resp.data.result);
      } catch (e){
        console.log("Error while generating image" + e);
      }
    }

    setVideoData(prev => ({
      ...prev,
      'imageList': images
    }))

    console.log(images);
    setImageList(images);
    setLoading(false);
  };

  useEffect(() => {
    console.log("videodata",videoData)
    if(videoData && Object.keys(videoData).length == 4){
      SaveVideoData(videoData);
    }
  }, [videoData])

  const SaveVideoData = async (videoData) => {

    if (!videoData) {
      console.error("videoData is undefined or null in savevideodata.");
      return;
    }
    setLoading(true);
    try {
    const result = await db.insert(VideoData).values({
      script:videoData?.videoScript,
      audioFileUrl:videoData?.audioFileUrl,
      captions:videoData?.captions,
      imageList:videoData?.imageList,
      createdBy:user?.primaryEmailAddress?.emailAddress,
    }).returning({id:VideoData?.id})

    await UpdateUserCredits();
    setVideoId(result[0].id);
    setPlayVideo(true);
    console.log(result);
  }
  catch(error) {
    console.error("Error saving video data:", error);
  } finally{
    setLoading(false);
  }
  };

  const UpdateUserCredits = async () => {
    const result = await db.update(Users).set({
      credits: userDetail?.credits - 5
    }).where(eq(Users.email, user?.primaryEmailAddress?.emailAddress));

    setUserDetail(prev => ({
      ...prev,
      "credits": userDetail?.credits - 5
    }))

    setVideoData(null);
  }

  return (
    <div className="md:px-20">
      <div className="bg-gradient-to-r from-teal-50 to-blue-50 dark:from-teal-900/20 dark:to-blue-900/20 rounded-xl p-6 mb-8 shadow-sm">
        <h2 className="font-bold text-2xl text-teal-600 dark:text-teal-400 text-center">Create Your Video</h2>
        <p className="text-gray-600 dark:text-gray-400 text-center mt-2 max-w-2xl mx-auto">Customize your AI-generated video by selecting content, style, and duration</p>
      </div>
      
      <div className="mt-6 bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 border border-teal-100 dark:border-teal-900/20">
        <SelectTopic onUserSelect={onHandleInputChange} />
        <SelectStyle onUserSelect={onHandleInputChange} />
        <SelectDuration onUserSelect={onHandleInputChange} />
        <Button 
          className="mt-10 w-full bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white py-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300" 
          onClick={onCreateClickHandler}
        >
          Create Short Video
        </Button>
      </div>
      <CustomLoading loading={loading} />
      <PlayerDialog playVideo={false} videoId={videoId} />
    </div>
  );
};

export default CreateNew;







// "use client";
// import React, { useState } from "react";
// import SelectTopic from "./_components/SelectTopic";
// import SelectStyle from "./_components/SelectStyle";
// import SelectDuration from "./_components/SelectDuration";
// import { Button } from "@/components/ui/button";
// import axios from "axios";
// import CustomLoading from "./_components/CustomLoading";
// import { v4 as uuidv4 } from "uuid";

// const CreateNew = () => {
//   const [formData, setFormData] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [videoScript, setVideoScript] = useState();
//   const [audioFileUrl, setAudioFileUrl] = useState();
//   const [imageList, setImageList] = useState([]);
//   const [captions, setCaptions] = useState();

//   const onHandleInputChange = (fieldName, fieldValue) => {
//     console.log(fieldName, fieldValue);
//     setFormData((prev) => ({
//       ...prev,
//       [fieldName]: fieldValue,
//     }));
//   };

//   const onCreateClickHandler = async () => {
//     setLoading(true);
//     console.log("Starting creation process...");
//     try {
//       await GetVideoScript();
//     } catch (error) {
//       console.error("Error in create process:", error);
//       setLoading(false);
//     }
//   };

//   const GetVideoScript = async () => {
//     console.log("Getting video script...");
//     const prompt =
//       "Write a script to generate " +
//       formData.duration +
//       " video on topic : " +
//       formData.topic +
//       " along with AI image prompt in " +
//       formData.imageStyle +
//       " format for each scene and give me result in JSON format with imagePrompt and ContentText as field, No Plain text";
    
//     const result = await axios.post("/api/get-video-script", {
//       prompt: prompt,
//     });

//     console.log("Video script received:", result.data.result);
    
//     setVideoScript(result.data.result);
//     if (result.data.result) {
//       await GenerateAudioFile(result.data.result);
//     }
//   };

//   const GenerateAudioFile = async (videoScriptData) => {
//     console.log("Generating audio file...");
//     let script = videoScriptData.map(item => item.ContentText).join(' ');
//     const id = uuidv4();
//     try {
//     const response = await axios.post('/api/generate-audio', {
//       text: script,
//       id: id,
//     });

//     console.log("Full audio response:", response.data);
      
//       // Check if the response has a Result property
//       if (response.data && response.data.Result) {
//         console.log("Audio file generated:", response.data.Result);
//         setAudioFileUrl(response.data.Result);
//         await GenerateAudioCaption(response.data.Result);
//       } else {
//         console.log("No audio file URL received in the expected format");
//         setLoading(false);
//       }
//     } catch (error) {
//       console.error("Error generating audio file:", error);
//       setLoading(false);
//     }
//   };

//   const GenerateAudioCaption = async (fileurl) => {
//     try {
//       console.log("Generating audio caption...");
//     const response = await axios.post('/api/generate-caption', {
//       audioFileUrl: fileurl
//     });
//     if (response.data) {
//       console.log("Captions generated:", response.data.transcript);
//       setCaptions(response.data.transcript);
//       await generateImages();
//     } else {
//       console.log("No captions received in the response");
//       setLoading(false);
//     } 
//     } catch(e) {
//       console.error("Error generating captions:", error.message);
//       setLoading(false); 
//     }
//   };

//   // const generateImages = async () => {
//   //   console.log("Generating images...");
//   //   let images = [];
//   //     videoScript.map(async (element) => {
//   //       const response = await axios.get('/api/generate-image', {
//   //         prompt: element?.imagePrompt
//   //       });
//   //       return response.data.result;
//   //     })

//   //   setImageList(images);
//   //   setLoading(false);
//   // };

//   const generateImages = async () => {
//     try {
//       console.log("Generating images...");
      
//       // Check if videoScript is populated correctly
//       if (!videoScript || videoScript.length === 0) {
//         console.error("videoScript is empty or undefined.");
//         setLoading(false);
//         return;
//       }
  
//       let images = [];
  
//       // Logging videoScript content to verify its structure
//       console.log("Video script received:", videoScript);
  
//       // Map through the videoScript to generate images for each prompt
//       const imagePromises = videoScript.map(async (element, index) => {
//         console.log(`Generating image for prompt ${index + 1}: ${element?.imagePrompt}`);
  
//         try {
//           // Call your API to generate images
//           const response = await axios.get('/api/generate-image', {
//             params: {
//               prompt: element?.imagePrompt
//             }
//           });
  
//           if (response.data && response.data.result) {
//             console.log(`Image generated for prompt ${index + 1}`);
//             images.push(response.data.result); // Add the generated image to the array
//           } else {
//             console.error(`No image generated for prompt ${index + 1}`);
//           }
//         } catch (error) {
//           console.error(`Error generating image for prompt ${index + 1}:`, error.message);
//         }
//       });
  
//       // Wait for all image requests to complete
//       await Promise.all(imagePromises);
  
//       // After all images are generated, set them in state
//       setImageList(images);
//       setLoading(false); // Stop loading
  
//     } catch (err) {
//       console.error("Error in generateImages:", err.message);
//       setLoading(false); // Stop loading if an error occurs
//     }
//   };
  
  

//   return (
//     <div className="md:px-20">
//       <h2 className="font-bold text-2xl text-primary text-center">
//         Create New
//       </h2>
      
//       <div className="mt-10 shadow-md p-10">
//         <SelectTopic onUserSelect={onHandleInputChange} />
//         <SelectStyle onUserSelect={onHandleInputChange} />
//         <SelectDuration onUserSelect={onHandleInputChange} />
//         <Button className="mt-10 w-full" onClick={onCreateClickHandler}>Create Short Video</Button>
//       </div>
      
//       <CustomLoading loading={loading} />
//     </div>
//   );
// };

// export default CreateNew;