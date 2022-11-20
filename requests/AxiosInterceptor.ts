import axios,{AxiosRequestConfig} from "axios";



export const graphqlClient = axios.create({
    baseURL: `${process.env.NEXTAUTH_URL}/api/graphql`,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});

graphqlClient.interceptors.request.use((config: AxiosRequestConfig) => {
    console.log(config.baseURL,"was called")
    return config;
})
