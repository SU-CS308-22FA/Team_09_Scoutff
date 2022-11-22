import mongoose from "mongoose";
import { unstable_getServerSession } from "next-auth"
import { GetServerSideProps, GetServerSidePropsContext, GetStaticPropsContext, InferGetServerSidePropsType, InferGetStaticPropsType, PreviewData } from "next/types"
import { ParsedUrlQuery } from "querystring";
import Player from "../models/Player";
import clientPromise from "../lib/mongoose";
import { authOptions } from "./api/auth/[...nextauth]"




export default function Super({playerWithSuperLeagueRatings} : InferGetStaticPropsType<typeof getStaticProps>) {


    


    

    return (
       
        <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Rating</th>

          </tr>
        </thead>
        <tbody>
            {
                playerWithSuperLeagueRatings.map((player,index) => {
                    return (
                        <tr key={player.name}>
                            <th scope="row">{index+1}</th>
                            <td>{player.name}</td>
                            <td>{player.rating}</td>
                        </tr>
                    )
                })
            }
        </tbody>
      </table>
    )
 

    

}



export const getStaticProps = async (context : GetStaticPropsContext<ParsedUrlQuery,PreviewData>) => {

    

    await clientPromise()



    const playerWithSuperLeagueRatings = await
            Player.
                aggregate()
                .unwind("statistics")
                .match({ "statistics.season_id" : 19367 })
                .project({name : 1, _id :0, "rating": "$statistics.rating"})
                .sort({"rating" : -1})


                                            
    

    
    return {
        props: {
            playerWithSuperLeagueRatings
        },
    }
    }