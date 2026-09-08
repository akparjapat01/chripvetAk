import axios from "axios";
import { BASE_URL } from "../constants/Host";
import { getTimeZone } from "react-native-localize";


export const PostAPIRequest = async ({ formData, endpoint, token }) => {

    const timezone = getTimeZone();

    try {
        const response = await axios.post(BASE_URL + endpoint, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'x-access-token': token ? `${token}` : "",
                'timezone': timezone,
            },
        });
        return response;
    } catch (err) {
        return err;
    };

};

export const GetAPIRequest = async ({ formData, endpoint, token }) => {

    const timezone = getTimeZone();
    if (formData) {
        try {
            const response = await axios.get(BASE_URL + endpoint, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'x-access-token': token ? `${token}` : "",
                    'timezone': timezone,
                },
            });
            return response;
        } catch (error) {
            return error;
        }
    } else {
        try {
            const response = await axios.get(BASE_URL + endpoint, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'x-access-token': token ? `${token}` : "",
                    'timezone': timezone,
                },
            });
            return response;
        } catch (error) {
            return error;
        };
    };

};

