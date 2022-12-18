import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

import {maxRequestPerSecond} from "../config/sportConfig";

import {RateLimiter} from "limiter";


let api_keys = process.env.API_KEYS?.split(",");
let order = 0;


const controller = new AbortController();




const rateLimiter = new RateLimiter({tokensPerInterval : maxRequestPerSecond, interval : "second"});





export const sportAPI = axios.create({
    baseURL : "https://sportscore1.p.rapidapi.com",
    headers : {
        'X-RapidAPI-Host' : 'sportscore1.p.rapidapi.com'
    }
});

sportAPI.interceptors.request.use((config :AxiosRequestConfig) => {
    if (api_keys) {
        

        
        config.headers = {
            ...config.headers,
            'X-RapidAPI-Key' : api_keys[order]
        }


        order = (order + 1) % api_keys.length;


        return rateLimiter.removeTokens(1).then(() => config);


    }
    
    else {
        //abort request
        controller.abort();

    }
    return config;

})



sportAPI.interceptors.response.use((response : AxiosResponse)  => {
    return response;
}, (error : AxiosError) => {
    console.log(error?.response?.status,"error");
    if (error?.response?.status === 429) {



        //get headers from error.request



        const headers = error?.config?.headers;

        const headerKey = headers?.["X-RapidAPI-Key"];

        if (headerKey) {
            api_keys = api_keys?.filter((key) => key !== headerKey);

            const length = api_keys?.length;
    
    
            if (!length) {
                return Promise.reject(error);
            }
    
            order = order % length;
    
            
    
    
    
            return sportAPI.request(error.config!);
            
        }









    }
    return Promise.reject(error);
}
)






