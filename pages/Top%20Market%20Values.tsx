import mongoose from "mongoose";
import { unstable_getServerSession } from "next-auth"
import { GetServerSideProps, GetServerSidePropsContext, GetStaticPropsContext, InferGetServerSidePropsType, InferGetStaticPropsType, PreviewData } from "next/types"
import { ParsedUrlQuery } from "querystring";
import Player from "../models/Player";
import clientPromise from "../lib/mongoose";
import { authOptions } from "./api/auth/[...nextauth]"




export default function General({playerWithMarketValues} : InferGetStaticPropsType<typeof getStaticProps>) {


    


    

    return (
       
        <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">MarketValues</th>

          </tr>
        </thead>
        <tbody>
            {
                playerWithMarketValues.map((player,index) => {
                    return (
                        <tr key={player.name}>
                            <th scope="row">{index+1}</th>
                            <td>{player.name}</td>
                            <td>{player.market_value}</td>
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


    const playerWithMarketValues = await 
                                Player.find({market_value : {$ne : null}})
                                .select('name market_value -_id')
                                .sort({market_value : -1})
                                .lean()


    //const playerWithSuperLeagueMarketValues = await
      //                                      Player.find({"statistics.season_id" : 19367},{_id:0,name:1,statistics : {$elemMatch : {season_id : 19367}}})
        //                                    .sort({"statistics.details.market_value" : -1})
          //                                  .lean()
                                            
    

    
    return {
        props: {
            playerWithMarketValues
        },
        revalidate : 60
    }
    }