import { NextResponse } from "next/server";
import Replicate from "replicate";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { storage } from "@/configs/FirebaseConfig";
import axios from "axios";

export async function POST(req) {
    try {
        const {prompt} = await req.json();
        const replicate = new Replicate({
            auth: process.env.REPLICATE_API_KEY
        });

        const input = {
            prompt: prompt,
            height: 1280,
            width: 1024,
            num_outputs: 1
        };

        const output = await replicate.run("bytedance/sdxl-lightning-4step:5599ed30703defd1d160a25a63321b4dec97101d98b4674bcc56e41f62f35637", { input });
        console.log(output);

        const base64Image = "data:image/png;base64,"+await convertImage(output[0]);
        const fileName='ai-shorts-video/'+Date.now()+".png"
        const storageRef = ref(storage, fileName);

        await uploadString(storageRef, base64Image, 'data_url');

        const downloadURL = await getDownloadURL(storageRef);
        console.log("download url", downloadURL);


        return NextResponse.json({'result' : downloadURL});

    } 
    catch(e){}
}

const convertImage = async (imageUrl) => {
  try {
    const resp = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const base64Image = Buffer.from(resp.data).toString('base64');
    return base64Image;
  } catch (e) {
    console.log('Error converting image:', e.message);
  }
}

// export async function GET(req) {
//     // const {prompt} = req.json();
//     try {
//         const { searchParams } = new URL(req.url);
//         const prompt = searchParams.get('prompt');
//         const response = await axios.get(`https://api.pexels.com/v1/search?query=${prompt}&per_page=1`, {
//           headers: {
//             Authorization: process.env.PEXELS_API_KEY,
//           },
//         });
    
//         const imageUrl = response.data.photos[0].src.original;

//         //save to firebase
//         const base64Image = "data:image/png;base64,"+await convertImage(imageUrl);
//         const fileName='ai-shorts-video/'+Date.now()+".png"
//         const storageRef = ref(storage, fileName);

//         await uploadString(storageRef, base64Image, 'data_url');

//         const downloadURL = await getDownloadURL(storageRef);
//         console.log("download url", downloadURL);

//         return NextResponse.json({ downloadURL });
//       } catch (error) {
//         console.error('Error fetching photos from Pexels:', error.message);
//         return NextResponse.json({ message: error.message }, { status: error.response?.status || 500 });
//     }
// }

// const convertImage = async (imageUrl) => {
//   try {
//     const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
//     const base64Image = Buffer.from(response.data).toString('base64');
//     return base64Image;
//   } catch (e) {
//     console.log('Error converting image:', e.message);
//   }
// }


// import { NextResponse } from "next/server";
// import Replicate from "replicate";
// import { getDownloadURL, ref, uploadString } from "firebase/storage";
// import { storage } from "@/configs/FirebaseConfig";

// export async function POST(req) {
//     try {
//         const {prompt} = await req.json();
//         const replicate = new Replicate({
//             auth: process.env.REPLICATE_API_KEY
//         });

//         const input = {
//             prompt: prompt,
//             height: 1280,
//             width: 1024,
//             num_outputs: 1
//         };

//         const output = await replicate.run("bytedance/sdxl-lightning", { input });
//         console.log(output);
//         return NextResponse.json({'result' : output[0]});

//     } 
//     catch(e){}
// }