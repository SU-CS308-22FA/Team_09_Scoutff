import React, { ReactChildren } from "react";
import LeaderboardUI from "./LeaderboardUI";
import type { RatingPlayers, MarketPlayers } from "../../../pages/leaderboards";



const LBCompIndex = ({children} : React.PropsWithChildren) => {
  return (
    <div>
      {children}
    </div>
  );
};


export default LBCompIndex;
