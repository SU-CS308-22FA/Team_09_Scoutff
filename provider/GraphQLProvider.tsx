import { ApolloClient, ApolloProvider, from, HttpLink, InMemoryCache, NormalizedCacheObject,fromPromise } from "@apollo/client";
import { useApp } from "../hook/useApp";
import {ReactNode, useCallback, useEffect, useState} from "react";
import * as Realm from "realm-web";
import { Buffer } from 'buffer';
import {onError} from "@apollo/client/link/error";


const anonymousUser = Realm.Credentials.anonymous();


export const  isExpired = (token ?: string | null) => {

  if (!token) return true;

  Buffer.from(token.split(".")[1], "base64");
  

  const payload = JSON.parse(Buffer.from(token.split(".")[1], "base64").toString("binary"));
  const now = new Date().getTime() / 1000;
  return payload.exp < now;

}


export function GraphQLProvider({ children } : {children : ReactNode}) {
    const app = useApp();

    const [client, setClient] = useState<ApolloClient<NormalizedCacheObject> | null>(null);






    const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {

        if (!app) return;

        
        if (networkError && 'statusCode' in networkError && networkError.statusCode === 401) {


            //checj if error is 401
            
       
                    
                return fromPromise(refresh(app.currentUser)).flatMap((accessToken) => {

                const oldHeaders = operation.getContext().headers;
                operation.setContext({
                  headers: {
                    ...oldHeaders,
                  },
                });
                // Retry the request, returning the new observable
                return forward(operation);
            });
            
          }
        }
    );
      
    


    const httpLink = new HttpLink({
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

          console.log("options", options)
    
          return fetch(uri, options);
        },
      }) 




    async function refresh(currentUser : Realm.User | null ) {
        try {

            if (!currentUser) return app!.logIn(anonymousUser);
            await currentUser?.refreshAccessToken();
            
           
        } catch (e) {
            app!.logIn(anonymousUser)
        }
    }

    

    useEffect(() => {
        if (app) {
            const currentUser = app.currentUser;
            //check if users access token is expired

    

            if (isExpired(currentUser?.accessToken) ) {  
                //if refresh token exists, log in with refresh token
               
                refresh(currentUser)

            } 

        


      
            

            if (!client) {
                setClient(new ApolloClient({
                    link: from([errorLink, httpLink]),
                    cache: new InMemoryCache(),
                }));
            }



     

        }

      
    }, [app, app?.currentUser]);





    if (!client) return null;







    return <ApolloProvider client={client}>{children}</ApolloProvider>;
  }

