import { ApolloClient, ApolloProvider, from, HttpLink, InMemoryCache, NormalizedCacheObject,fromPromise } from "@apollo/client";
import { useApp } from "../hook/useApp";
import {ReactNode, useCallback, useEffect, useMemo, useState} from "react";
import * as Realm from "realm-web";
import { Buffer } from 'buffer';
import {onError} from "@apollo/client/link/error";
import { useSession } from "next-auth/react";
import { requiredChakraThemeKeys } from "@chakra-ui/react";


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

  const session = useSession();




  





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

    
          return fetch(uri, options);
        },
      }) 



 const  client = useMemo(() => {
  return new ApolloClient({
    link: from([errorLink, httpLink]),
    cache: new InMemoryCache(),
})
}, [app]);
    

        
      



    async function refresh(currentUser : Realm.User | null ) {
        try {
            const original = session?.data?.original;
            const mismatch = (original && (currentUser?.providerType !== "custom-token"))

            if (mismatch) {
              await currentUser?.logOut();
              localStorage.clear();
            }

           

            

            



            if (!currentUser || (mismatch)) return await app!.logIn(original ? Realm.Credentials.jwt(original) : anonymousUser);
            await currentUser?.refreshAccessToken();
            
           
        } catch (e) {
            app!.logIn(anonymousUser)
        }
    }

    


    useEffect(() => {







      if (app) {

        


      const userSetter = async  () => {
        
            const currentUser = app.currentUser;

            const original = session?.data?.original;


















            



    

            if ((original && (currentUser?.providerType !== "custom-token")) || isExpired(currentUser?.accessToken) ) {  
                //if refresh token exists, log in with refresh token
               
                await refresh(currentUser)

            }  

        


      
            



     

        
      }
      userSetter()

  }
      
    }, [app,session.data?.original]);













    return <ApolloProvider client={client}>{children}</ApolloProvider>;
  }

