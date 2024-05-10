import axios from '../LoginForm/axios';

const baseUrl = 'http://localhost:8000/api/files';

// Function to get the URL for an image stored in MongoDB
export const getImageUrl = mongo_id => {
    return `${baseUrl}/${mongo_id}/image`; // Adjust the URL as necessary
};

// Function to fetch an image as a blob if needed for more direct control
export const fetchImageBlob = async mongo_id => {
    try {
        const response = await axios.get(`${baseUrl}/${mongo_id}/image`, {
            responseType: 'blob', // Important for dealing with binary data
            headers: {
                // Add any auth headers or other necessary headers here
            }
        });
        return URL.createObjectURL(response.data);
    } catch (error) {
        console.error('Failed to fetch image:', error);
        throw error;
    }
};
