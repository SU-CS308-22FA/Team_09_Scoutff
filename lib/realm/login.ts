
import { ApolloClient, HttpLink, InMemoryCache, NormalizedCacheObject } from "@apollo/client";
import * as Realm from "realm-web";




const app = new Realm.App({ id: process.env.NEXT_PUBLIC_APP_ID! });


//convert each rating in statistics.rating array to double




// Log in user using realm API key
const credentials = Realm.Credentials.apiKey(process.env.REALM_API_KEY ?? "");


export const httpLink = new HttpLink({
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





  const  isExpired = (token ?: string | null) => {

    if (!token) throw new Error("No token provided");
  
    Buffer.from(token.split(".")[1], "base64");
    
  
    const payload = JSON.parse(Buffer.from(token.split(".")[1], "base64").toString("binary"));
    const now = new Date().getTime() / 1000;
    return payload.exp < now;
  
  }

  




export async function getClient() : Promise<ApolloClient<NormalizedCacheObject> | undefined> {



  

   if (!global?.realmGlobal?.graphqlClient) {

        global.realmGlobal = {
            graphqlClient :  new ApolloClient({
              ssrMode : true,
              link: httpLink,
              cache: new InMemoryCache(),
        })
        
        
   }
  }
   
   try {
      if (isExpired(app.currentUser?.accessToken)) {

            await app.currentUser?.refreshCustomData();
        }
      }
    catch (e) {
            await app.logIn(credentials);
    }
       
   
   



   


   return global.realmGlobal?.graphqlClient;

  }

