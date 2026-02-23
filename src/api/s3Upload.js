import axios from 'axios'

export const uploadToS3ByPresignedUrl = (uploadUrl, file) => {
    return axios.put(uploadUrl, file, {
        headers: {
            'Content-Type': file.type,
        },
        withCredentials: false,
    });
};