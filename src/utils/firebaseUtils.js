
import { storage } from './firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const uploadUserImage = async (userId, imageUri) => {
    try {
        const response = await fetch(imageUri);
        const blob = await response.blob();
        const storageRef = ref(storage, `users/${userId}/user_image.jpg`);

        await uploadBytes(storageRef, blob);

        const downloadURL = await getDownloadURL(storageRef);

        console.log('Image URL:', downloadURL);
        return downloadURL;
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
};


export { uploadUserImage }