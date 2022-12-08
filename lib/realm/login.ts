
import { ApolloClient, HttpLink, InMemoryCache, NormalizedCacheObject } from "@apollo/client";
import * as Realm from "realm-web";




const app = new Realm.App({ id: process.env.NEXT_PUBLIC_APP_ID! });


//convert each rating in statistics.rating array to double




// Log in user using realm API key
const credentials = Realm.Credentials.apiKey(process.env.REALM_API_KEY ?? "");


const createClient = (token : string) =>
  new ApolloClient({
    ssrMode : true,
    link: new HttpLink({
      uri: process.env.NEXT_PUBLIC_GRAPHQL_API_ENDPOINT,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
    cache: new InMemoryCache(),
  }); 





export async function getClient() : Promise<ApolloClient<NormalizedCacheObject> | undefined> {

   if (!global?.realmGlobal?.graphqlClient || !app.currentUser) {
        const user = await app.logIn(credentials);

        global.realmGlobal = {
            graphqlClient : createClient(user?.accessToken ?? "")
        }
   }


   return global.realmGlobal?.graphqlClient;

  }

