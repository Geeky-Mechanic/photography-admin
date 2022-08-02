import app from '../utils/firebaseConfig.js';
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL
} from "firebase/storage";

export async function POST(event) {
    const req = await event.request.formData();

    //get image binary
    const image = await req.get("image").arrayBuffer();

    // choose file name
    const fileName = req.get("imageName")

    //choose storage service
    const storage = getStorage(app);

    // create ref for storage bucket
    const storageRef = ref(storage, fileName);

    //define metadata
    const metadata = {
        contentType: 'image/jpeg',
    };
    let imageUrl;

    //create a promise to await the url before returning the value
    const uploadPromise = new Promise((resolve, reject) => {
        //start task
        const uploadTask = uploadBytesResumable(storageRef, image, metadata);

        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on('state_changed',
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                //console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        //console.log('Upload is paused');
                        break;
                    case 'running':
                        //console.log('Upload is running');
                        break;
                    default:
                }
            },
            (error) => {
                // Handle unsuccessful uploads
                console.log(error);
                reject(error);
            },
            () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    imageUrl = downloadURL;
                    resolve(imageUrl)
                });
            }
        );
    });

    await uploadPromise;

    return {
        status: 200,
        body: JSON.stringify(imageUrl),
        headers: {
            "Content-Type": "application/json",
        },
    }
};