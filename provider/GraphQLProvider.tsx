import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache, NormalizedCacheObject } from "@apollo/client";
import { useApp } from "../hook/useApp";
import {ReactNode, useCallback, useEffect, useState} from "react";
import * as Realm from "realm-web";
import { Buffer } from 'buffer';


const anonymousUser = Realm.Credentials.anonymous();

export function GraphQLProvider({ children } : {children : ReactNode}) {
    const app = useApp();

    const [client, setClient] = useState<ApolloClient<NormalizedCacheObject> | null>(null);

    const  isExpired = useCallback((token ?: string | null) => {

        if (!token) return true;

        Buffer.from(token.split(".")[1], "base64");
        

        const payload = JSON.parse(Buffer.from(token.split(".")[1], "base64").toString("binary"));
        const now = new Date().getTime() / 1000;
        return payload.exp < now;
   
    }, []);


    const clientSetter = useCallback(() => {
        

        setClient(
            new ApolloClient({
                link: new HttpLink({
                  uri: process.env.NEXT_PUBLIC_GRAPHQL_API_ENDPOINT,
                  // We get the latest access token on each request
                  fetch: async (uri, options) => {
                    const accessToken = app?.currentUser?.accessToken;
          
                    if (options) {
                      options.headers = {
                        ...options.headers,
                        Authorization : `Bearer ${accessToken}`
          
                      }
                    }
              
                    return fetch(uri, options);
                  },
                }),
                cache: new InMemoryCache(),
     
              })
        )
    }, [app?.currentUser?.accessToken]);


    async function refresh(currentUser : Realm.User | null ) {
        try {
            await currentUser?.refreshAccessToken();
            console.log("refreshed");
            clientSetter();
        } catch (e) {
            //if refresh token doesn't exist, log in with anonymous user
            console.log("refresh failed");
            app!.logIn(anonymousUser).then(clientSetter);
        }
    }

    useEffect(() => {
        if (app) {
            const currentUser = app.currentUser;
            //check if users access token is expired

            
            



            




            

            if (isExpired(currentUser?.accessToken) ) {  
                //if refresh token exists, log in with refresh token

               
                refresh(currentUser);

                

    


                
            }
            else {
                clientSetter();
            }

        }

      
    }, [app, app?.currentUser, app?.currentUser?.id, app?.currentUser?.isLoggedIn]);



    if (!client) return null;







    return <ApolloProvider client={client}>{children}</ApolloProvider>;
  }

