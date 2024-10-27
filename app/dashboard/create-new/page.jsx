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
import { VideoData } from "@/configs/schema";
import PlayerDialog from "../_components/PlayerDialog";
import { useRouter } from "next/navigation";


const CreateNew = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [videoScript, setVideoScript] = useState(null);  // Initialize as null
  const [audioFileUrl, setAudioFileUrl] = useState();
  const [imageList, setImageList] = useState([]);
  const [captions, setCaptions] = useState();
  const [playVideo, setPlayVideo] = useState(true);
  const [videoId, setVideoId] = useState(6);
  const {videoData, setVideoData} = useContext(VideoDataContext);
  const {user} = useUser();

  const onHandleInputChange = (fieldName, fieldValue) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: fieldValue,
    }));
  };

  const onCreateClickHandler = async () => {
    setLoading(true);
    try {
      await GetVideoScript();
      // await generateImages()
    } catch (error) {
      console.error("Error in create process:", error);
      setLoading(false);
    }
  };

  const GetVideoScript = async () => {
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

  return (
    <div className="md:px-20">
      <h2 className="font-bold text-2xl text-primary text-center">Create New</h2>
      <div className="mt-10 shadow-md p-10">
        <SelectTopic onUserSelect={onHandleInputChange} />
        <SelectStyle onUserSelect={onHandleInputChange} />
        <SelectDuration onUserSelect={onHandleInputChange} />
        <Button className="mt-10 w-full" onClick={onCreateClickHandler}>
          Create Short Video
        </Button>
      </div>
      <CustomLoading loading={loading} />
      <PlayerDialog playVideo={playVideo} videoId={videoId} />
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