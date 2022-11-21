import React from "react";
import LeaderboardUI from "./LeaderboardUI";
import type { RatingPlayers, MarketPlayers } from "../../../pages/leaderboards";

type Props = {
  dataMarket : MarketPlayers[];
  dataRating : RatingPlayers[];
}

const LBCompIndex = ({dataMarket,dataRating} : Props ) => {
  return (
    <div>
<LeaderboardUI dataMarket={dataMarket} dataRating={dataRating}></LeaderboardUI>  </div>
  );
};


export default LBCompIndex;
