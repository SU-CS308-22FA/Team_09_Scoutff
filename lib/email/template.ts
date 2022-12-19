import { exit } from "process";
import { MatchCommonInterface, PlayerMatchStatisticsInterface } from "../../interfaces/MatchInterface";
import { IUser } from "../../models/User"
import { getCommonData } from "./emailData";

const generateGoalTemplate =  (commonData : Awaited<ReturnType<typeof getCommonData>>) => 
    `              <div style="Margin-left: 20px;Margin-right: 20px;">
    <div style="mso-line-height-rule: exactly;mso-text-raise: 11px;vertical-align: middle;">
    ${ commonData.topScorers.map((scorer,index) => `<p style="Margin-top: 0;Margin-bottom: 0;">${index + 1}- ${scorer.name ?? "N/A"} (${scorer.statistics?.attacking?.goals ?? "N/A"})</p>`).join("")}
    </div>
  </div>`


const rankPlayer = (index: number) => {
    switch(index){
        case 0 : return "Your";
        case 1 : return "Second";
        case 2 : return "Third";
        default : return `${index + 1}th`;
    }
    

    
}

const handleRating = (player : PlayerMatchStatisticsInterface | undefined) => {

    if(!player?.rating || !player.matches_played) return "N/A";

    return (player.rating / player.matches_played).toFixed(2);

}

const generateNonTopThree = (players : (PlayerMatchStatisticsInterface | undefined)[]) => {
    const list =  players.map((player,index) => 
       `<li style="Margin-top: 16px;Margin-bottom: 0;Margin-left: 0;">${index + 4}-${player?.name} (${handleRating(player)})</li>` 

    ).join("");

    return `     <div style="mso-line-height-rule: exactly;mso-text-raise: 11px;vertical-align: middle;">
    <h2 style="Margin-top: 0;Margin-bottom: 0;font-style: normal;font-weight: normal;color: #3d3b3d;font-size: 22px;line-height: 31px;">Other Favorite Players' Ratings</h2><ul style="Margin-top: 16px;Margin-bottom: 0;Margin-left: 24px;padding: 0;list-style-type: disc;">${list}</ul><p class="size-16" style="Margin-top: 20px;Margin-bottom: 0;font-size: 
16px;line-height: 24px;text-align: left;" lang="x-size-16"><strong><a style="text-decoration: underline;transition: opacity 0.1s ease-in;color: #198754;" href="https://scoutff.createsend1.com/t/y-i-nhrbil-dylyiyjhx-d/" data-emb-iscopy="true" target="_blank">Check out your favorite player on the website.</a></strong></p>
  </div>`
    

}


    

const generateTopThreeTemplate =  (topThree : (PlayerMatchStatisticsInterface | undefined)[]) => {





    return topThree.map((player,index) => {
        if(!player) return;

        const rank = rankPlayer(index);

        const url = `https://scoutff.vercel.app/player_profile/${player.slug}`

        return `
        <div style="mso-line-height-rule: exactly;line-height: 20px;font-size: 20px;">&nbsp;</div>
      
          <div class="layout fixed-width stack" style="Margin: 0 auto;max-width: 600px;min-width: 320px; width: 320px;width: calc(28000% - 167400px);overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;">
            <div class="layout__inner" style="border-collapse: collapse;display: table;width: 100%;background-color: #ffffff;">
            <!--[if (mso)|(IE)]><table align="center" cellpadding="0" cellspacing="0" role="presentation"><tr class="layout-fixed-width" style="background-color: #ffffff;"><td style="width: 200px" valign="top" class="w160"><![endif]-->
              <div class="column narrow" style="text-align: left;color: #717a8a;font-size: 16px;line-height: 24px;font-family: Georgia,serif;Float: left;max-width: 320px;min-width: 200px; width: 320px;width: calc(72200px - 12000%);">
              
                <div style="Margin-left: 20px;Margin-right: 20px;Margin-top: 24px;Margin-bottom: 24px;">
            <div style="font-size: 12px;font-style: normal;font-weight: normal;line-height: 19px;" align="center">
              <img style="border: 0;display: block;height: auto;width: 100%;max-width: 150px;" alt="${player.slug}" width="150" src=${player.photo}>
            </div>
          </div>
              
              </div>
            <!--[if (mso)|(IE)]></td><td style="width: 400px" valign="top" class="w360"><![endif]-->
              <div class="column wide" style="text-align: left;color: #717a8a;font-size: 16px;line-height: 24px;font-family: Georgia,serif;Float: left;max-width: 400px;min-width: 320px; width: 320px;width: calc(8000% - 47600px);">
              
                <div style="Margin-left: 20px;Margin-right: 20px;Margin-top: 24px;">
          <div style="mso-line-height-rule: exactly;mso-text-raise: 11px;vertical-align: middle;">
            <h3 style="Margin-top: 0;Margin-bottom: 12px;font-style: normal;font-weight: normal;color: #3d3b3d;font-size: 17px;line-height: 26px;">${rank} top-rated player:&nbsp;${player.name ?? "N/A"}</h3>
          </div>
        </div>
              
                <div style="Margin-left: 20px;Margin-right: 20px;">
          <div style="mso-line-height-rule: exactly;mso-text-raise: 11px;vertical-align: middle;">
            <p style="Margin-top: 0;Margin-bottom: 0;">Rating: ${handleRating(player)}</p><p style="Margin-top: 20px;Margin-bottom: 0;">Goals: ${player.goals ?? "N/A"}</p><p style="Margin-top: 20px;Margin-bottom: 0;">Assists: ${player.goal_assist ?? "N/A"}</p><p style="Margin-top: 20px;Margin-bottom: 0;">Minutes Played: ${player.minutes_played ?? "N/A"}</p><p style="Margin-top: 20px;Margin-bottom: 0;">Team: ${player.team_name ?? "N/A"}</p><p style="Margin-top: 20px;Margin-bottom: 20px;">Position: ${player.position_name ?? "N/A"}</p>
          </div>
        </div>
              
                <div style="Margin-left: 20px;Margin-right: 20px;">
          <div class="btn btn--flat btn--large" style="Margin-bottom: 20px;text-align: left;">
            <!--[if !mso]--><a style="border-radius: 4px;display: inline-block;font-size: 14px;font-weight: bold;line-height: 24px;padding: 12px 24px;text-align: center;text-decoration: none !important;transition: opacity 0.1s ease-in;color: #ffffff !important;background-color: #198754;font-family: Georgia, serif;" href="${url}" target="_blank">Check the player's profile!</a><!--[endif]-->
          <!--[if mso]><p style="line-height:0;margin:0;">&nbsp;</p><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" href=${url} style="width:177pt" arcsize="9%" fillcolor="#198754" stroke="f"><v:textbox style="mso-fit-shape-to-text:t" inset="0pt,8.25pt,0pt,8.25pt"><center style="font-size:14px;line-height:24px;color:#FFFFFF;font-family:Georgia,serif;font-weight:bold;mso-line-height-rule:exactly;mso-text-raise:1.5px">Check the player&#39;s profile!</center></v:textbox></v:roundrect><![endif]--></div>
        </div>
              
                <div style="Margin-left: 20px;Margin-right: 20px;Margin-bottom: 24px;">
          <div style="mso-line-height-rule: exactly;line-height: 8px;font-size: 1px;">&nbsp;</div>
        </div>
              
              </div>
            <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
            </div>
          </div>
      
        `

    }).join("")

    

}


const generateAssistTemplate =  (commonData : Awaited<ReturnType<typeof getCommonData>>) => 
         `   <div style="Margin-left: 20px;Margin-right: 20px;">
    <div style="mso-line-height-rule: exactly;mso-text-raise: 11px;vertical-align: middle;">
    ${ commonData.topAssists.map((scorer,index) => `<p style="Margin-top: 0;Margin-bottom: 0;">${index + 1}- ${scorer.name ?? "N/A"} (${scorer.statistics?.passes?.assists ?? "N/A"})</p>`).join("")}
    </div>
  </div>`





export const createTemplate = (weeklyCommonData : MatchCommonInterface,commonData : Awaited<ReturnType<typeof getCommonData>>,user : IUser,userWithLikedPlayers : (PlayerMatchStatisticsInterface | undefined)[],maximumRound : number)  =>  {

    
    




    return `
    <html><head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title></title>
    <!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
    <meta name="viewport" content="width=device-width"><style type="text/css">
@media only screen and (min-width: 620px){.wrapper{min-width:600px !important}.wrapper h1{}.wrapper h1{font-size:36px !important;line-height:43px !important}.wrapper h2{}.wrapper h2{font-size:26px !important;line-height:34px !important}.wrapper h3{}.wrapper h3{font-size:20px !important;line-height:28px !important}.column{}.wrapper .size-8{font-size:8px !important;line-height:14px !important}.wrapper .size-9{font-size:9px !important;line-height:16px !important}.wrapper .size-10{font-size:10px !important;line-height:18px !important}.wrapper .size-11{font-size:11px !important;line-height:19px !important}.wrapper .size-12{font-size:12px !important;line-height:19px !important}.wrapper .size-13{font-size:13px !important;line-height:21px !important}.wrapper .size-14{font-size:14px !important;line-height:21px !important}.wrapper .size-15{font-size:15px !important;line-height:23px 
!important}.wrapper .size-16{font-size:16px !important;line-height:24px !important}.wrapper .size-17{font-size:17px !important;line-height:26px !important}.wrapper .size-18{font-size:18px !important;line-height:26px !important}.wrapper .size-20{font-size:20px !important;line-height:28px !important}.wrapper .size-22{font-size:22px !important;line-height:31px !important}.wrapper .size-24{font-size:24px !important;line-height:32px !important}.wrapper .size-26{font-size:26px !important;line-height:34px !important}.wrapper .size-28{font-size:28px !important;line-height:36px !important}.wrapper .size-30{font-size:30px !important;line-height:38px !important}.wrapper .size-32{font-size:32px !important;line-height:40px !important}.wrapper .size-34{font-size:34px !important;line-height:43px !important}.wrapper .size-36{font-size:36px !important;line-height:43px !important}.wrapper 
.size-40{font-size:40px !important;line-height:47px !important}.wrapper .size-44{font-size:44px !important;line-height:50px !important}.wrapper .size-48{font-size:48px !important;line-height:54px !important}.wrapper .size-56{font-size:56px !important;line-height:60px !important}.wrapper .size-64{font-size:64px !important;line-height:68px !important}.wrapper .size-72{font-size:72px !important;line-height:76px !important}.wrapper .size-80{font-size:80px !important;line-height:84px !important}.wrapper .size-96{font-size:96px !important;line-height:100px !important}.wrapper .size-112{font-size:112px !important;line-height:116px !important}.wrapper .size-128{font-size:128px !important;line-height:132px !important}.wrapper .size-144{font-size:144px !important;line-height:148px !important}}
</style>
    <meta name="x-apple-disable-message-reformatting">
    <style type="text/css">
.main, .mso {
  margin: 0;
  padding: 0;
}
table {
  border-collapse: collapse;
  table-layout: fixed;
}
* {
  line-height: inherit;
}
[x-apple-data-detectors] {
  color: inherit !important;
  text-decoration: none !important;
}
.wrapper .footer__share-button a:hover,
.wrapper .footer__share-button a:focus {
  color: #ffffff !important;
}
.wrapper .footer__share-button a.icon-white:hover,
.wrapper .footer__share-button a.icon-white:focus {
  color: #ffffff !important;
}
.wrapper .footer__share-button a.icon-black:hover,
.wrapper .footer__share-button a.icon-black:focus {
  color: #000000 !important;
}
.btn a:hover,
.btn a:focus,
.footer__share-button a:hover,
.footer__share-button a:focus,
.email-footer__links a:hover,
.email-footer__links a:focus {
  opacity: 0.8;
}
.preheader,
.header,
.layout,
.column {
  transition: width 0.25s ease-in-out, max-width 0.25s ease-in-out;
}
.preheader td {
  padding-bottom: 8px;
}
.layout,
div.header {
  max-width: 400px !important;
  -fallback-width: 95% !important;
  width: calc(100% - 20px) !important;
}
div.preheader {
  max-width: 360px !important;
  -fallback-width: 90% !important;
  width: calc(100% - 60px) !important;
}
.snippet,
.webversion {
  Float: none !important;
}
.stack .column {
  max-width: 400px !important;
  width: 100% !important;
}
.fixed-width.has-border {
  max-width: 402px !important;
}
.fixed-width.has-border .layout__inner {
  box-sizing: border-box;
}
.snippet,
.webversion {
  width: 50% !important;
}
.ie .btn {
  width: 100%;
}
.ie .stack .column,
.ie .stack .gutter {
  display: table-cell;
  float: none !important;
}
.ie div.preheader,
.ie .email-footer {
  max-width: 560px !important;
  width: 560px !important;
}
.ie .snippet,
.ie .webversion {
  width: 280px !important;
}
.ie div.header,
.ie .layout {
  max-width: 600px !important;
  width: 600px !important;
}
.ie .two-col .column {
  max-width: 300px !important;
  width: 300px !important;
}
.ie .three-col .column,
.ie .narrow {
  max-width: 200px !important;
  width: 200px !important;
}
.ie .wide {
  width: 400px !important;
}
.ie .stack.fixed-width.has-border,
.ie .stack.has-gutter.has-border {
  max-width: 602px !important;
  width: 602px !important;
}
.ie .stack.two-col.has-gutter .column {
  max-width: 290px !important;
  width: 290px !important;
}
.ie .stack.three-col.has-gutter .column,
.ie .stack.has-gutter .narrow {
  max-width: 188px !important;
  width: 188px !important;
}
.ie .stack.has-gutter .wide {
  max-width: 394px !important;
  width: 394px !important;
}
.ie .stack.two-col.has-gutter.has-border .column {
  max-width: 292px !important;
  width: 292px !important;
}
.ie .stack.three-col.has-gutter.has-border .column,
.ie .stack.has-gutter.has-border .narrow {
  max-width: 190px !important;
  width: 190px !important;
}
.ie .stack.has-gutter.has-border .wide {
  max-width: 396px !important;
  width: 396px !important;
}
.ie .fixed-width .layout__inner {
  border-left: 0 none white !important;
  border-right: 0 none white !important;
}
.ie .layout__edges {
  display: none;
}
.mso .layout__edges {
  font-size: 0;
}
.layout-fixed-width,
.mso .layout-full-width {
  background-color: #ffffff;
}
@media only screen and (min-width: 620px) {
  .column,
  .gutter {
    display: table-cell;
    Float: none !important;
    vertical-align: top;
  }
  div.preheader,
  .email-footer {
    max-width: 560px !important;
    width: 560px !important;
  }
  .snippet,
  .webversion {
    width: 280px !important;
  }
  div.header,
  .layout,
  .one-col .column {
    max-width: 600px !important;
    width: 600px !important;
  }
  .fixed-width.has-border,
  .fixed-width.x_has-border,
  .has-gutter.has-border,
  .has-gutter.x_has-border {
    max-width: 602px !important;
    width: 602px !important;
  }
  .two-col .column {
    max-width: 300px !important;
    width: 300px !important;
  }
  .three-col .column,
  .column.narrow,
  .column.x_narrow {
    max-width: 200px !important;
    width: 200px !important;
  }
  .column.wide,
  .column.x_wide {
    width: 400px !important;
  }
  .two-col.has-gutter .column,
  .two-col.x_has-gutter .column {
    max-width: 290px !important;
    width: 290px !important;
  }
  .three-col.has-gutter .column,
  .three-col.x_has-gutter .column,
  .has-gutter .narrow {
    max-width: 188px !important;
    width: 188px !important;
  }
  .has-gutter .wide {
    max-width: 394px !important;
    width: 394px !important;
  }
  .two-col.has-gutter.has-border .column,
  .two-col.x_has-gutter.x_has-border .column {
    max-width: 292px !important;
    width: 292px !important;
  }
  .three-col.has-gutter.has-border .column,
  .three-col.x_has-gutter.x_has-border .column,
  .has-gutter.has-border .narrow,
  .has-gutter.x_has-border .narrow {
    max-width: 190px !important;
    width: 190px !important;
  }
  .has-gutter.has-border .wide,
  .has-gutter.x_has-border .wide {
    max-width: 396px !important;
    width: 396px !important;
  }
}
@supports (display: flex) {
  @media only screen and (min-width: 620px) {
    .fixed-width.has-border .layout__inner {
      display: flex !important;
    }
  }
}
/***
* Mobile Styles
*
* 1. Overriding inline styles
*/
@media(max-width: 619px) {
  .email-flexible-footer .left-aligned-footer .column,
  .email-flexible-footer .center-aligned-footer,
  .email-flexible-footer .right-aligned-footer .column {
    max-width: 100% !important; /* [1] */
    text-align: center !important; /* [1] */
    width: 100% !important; /* [1] */
  }
  .flexible-footer-logo {
    margin-left: 0px !important; /* [1] */
    margin-right: 0px !important; /* [1] */
  }
  .email-flexible-footer .left-aligned-footer .flexible-footer__share-button__container,
  .email-flexible-footer .center-aligned-footer .flexible-footer__share-button__container,
  .email-flexible-footer .right-aligned-footer .flexible-footer__share-button__container {
    display: inline-block;
    margin-left: 5px !important; /* [1] */
    margin-right: 5px !important; /* [1] */
  }
  .email-flexible-footer__additionalinfo--center {
    text-align: center !important; /* [1] */
  }
  
  .email-flexible-footer .left-aligned-footer table,
  .email-flexible-footer .center-aligned-footer table,
  .email-flexible-footer .right-aligned-footer table {
    display: table !important; /* [1] */
    width: 100% !important; /* [1] */
  }
  .email-flexible-footer .footer__share-button,
  .email-flexible-footer .email-footer__additional-info {
    margin-left: 20px;
    margin-right: 20px;
  }
}
@media only screen and (-webkit-min-device-pixel-ratio: 2), only screen and (min--moz-device-pixel-ratio: 2), only screen and (-o-min-device-pixel-ratio: 2/1), only screen and (min-device-pixel-ratio: 2), only screen and (min-resolution: 192dpi), only screen and (min-resolution: 2dppx) {
  .fblike {
    background-image: url(https://i7.createsend1.com/static/eb/master/13-the-blueprint-3/images/fblike@2x.png) !important;
  }
  .tweet {
    background-image: url(https://i8.createsend1.com/static/eb/master/13-the-blueprint-3/images/tweet@2x.png) !important;
  }
  .linkedinshare {
    background-image: url(https://i9.createsend1.com/static/eb/master/13-the-blueprint-3/images/lishare@2x.png) !important;
  }
  .forwardtoafriend {
    background-image: url(https://i10.createsend1.com/static/eb/master/13-the-blueprint-3/images/forward@2x.png) !important;
  }
}
@media (max-width: 321px) {
  .fixed-width.has-border .layout__inner {
    border-width: 1px 0 !important;
  }
  .layout,
  .stack .column {
    min-width: 320px !important;
    width: 320px !important;
  }
  .border {
    display: none;
  }
  .has-gutter .border {
    display: table-cell;
  }
}
.mso div {
  border: 0 none white !important;
}
.mso .w560 .divider {
  Margin-left: 260px !important;
  Margin-right: 260px !important;
}
.mso .w360 .divider {
  Margin-left: 160px !important;
  Margin-right: 160px !important;
}
.mso .w260 .divider {
  Margin-left: 110px !important;
  Margin-right: 110px !important;
}
.mso .w160 .divider {
  Margin-left: 60px !important;
  Margin-right: 60px !important;
}
.mso .w354 .divider {
  Margin-left: 157px !important;
  Margin-right: 157px !important;
}
.mso .w250 .divider {
  Margin-left: 105px !important;
  Margin-right: 105px !important;
}
.mso .w148 .divider {
  Margin-left: 54px !important;
  Margin-right: 54px !important;
}
.mso .size-8,
.ie .size-8 {
  font-size: 8px !important;
  line-height: 14px !important;
}
.mso .size-9,
.ie .size-9 {
  font-size: 9px !important;
  line-height: 16px !important;
}
.mso .size-10,
.ie .size-10 {
  font-size: 10px !important;
  line-height: 18px !important;
}
.mso .size-11,
.ie .size-11 {
  font-size: 11px !important;
  line-height: 19px !important;
}
.mso .size-12,
.ie .size-12 {
  font-size: 12px !important;
  line-height: 19px !important;
}
.mso .size-13,
.ie .size-13 {
  font-size: 13px !important;
  line-height: 21px !important;
}
.mso .size-14,
.ie .size-14 {
  font-size: 14px !important;
  line-height: 21px !important;
}
.mso .size-15,
.ie .size-15 {
  font-size: 15px !important;
  line-height: 23px !important;
}
.mso .size-16,
.ie .size-16 {
  font-size: 16px !important;
  line-height: 24px !important;
}
.mso .size-17,
.ie .size-17 {
  font-size: 17px !important;
  line-height: 26px !important;
}
.mso .size-18,
.ie .size-18 {
  font-size: 18px !important;
  line-height: 26px !important;
}
.mso .size-20,
.ie .size-20 {
  font-size: 20px !important;
  line-height: 28px !important;
}
.mso .size-22,
.ie .size-22 {
  font-size: 22px !important;
  line-height: 31px !important;
}
.mso .size-24,
.ie .size-24 {
  font-size: 24px !important;
  line-height: 32px !important;
}
.mso .size-26,
.ie .size-26 {
  font-size: 26px !important;
  line-height: 34px !important;
}
.mso .size-28,
.ie .size-28 {
  font-size: 28px !important;
  line-height: 36px !important;
}
.mso .size-30,
.ie .size-30 {
  font-size: 30px !important;
  line-height: 38px !important;
}
.mso .size-32,
.ie .size-32 {
  font-size: 32px !important;
  line-height: 40px !important;
}
.mso .size-34,
.ie .size-34 {
  font-size: 34px !important;
  line-height: 43px !important;
}
.mso .size-36,
.ie .size-36 {
  font-size: 36px !important;
  line-height: 43px !important;
}
.mso .size-40,
.ie .size-40 {
  font-size: 40px !important;
  line-height: 47px !important;
}
.mso .size-44,
.ie .size-44 {
  font-size: 44px !important;
  line-height: 50px !important;
}
.mso .size-48,
.ie .size-48 {
  font-size: 48px !important;
  line-height: 54px !important;
}
.mso .size-56,
.ie .size-56 {
  font-size: 56px !important;
  line-height: 60px !important;
}
.mso .size-64,
.ie .size-64 {
  font-size: 64px !important;
  line-height: 68px !important;
}
.mso .size-72,
.ie .size-72 {
  font-size: 72px !important;
  line-height: 76px !important;
}
.mso .size-80,
.ie .size-80 {
  font-size: 80px !important;
  line-height: 84px !important;
}
.mso .size-96,
.ie .size-96 {
  font-size: 96px !important;
  line-height: 100px !important;
}
.mso .size-112,
.ie .size-112 {
  font-size: 112px !important;
  line-height: 116px !important;
}
.mso .size-128,
.ie .size-128 {
  font-size: 128px !important;
  line-height: 132px !important;
}
.mso .size-144,
.ie .size-144 {
  font-size: 144px !important;
  line-height: 148px !important;
}
/***
* Online store block styles
*
* 1. maintaining right and left margins in outlook
* 2. respecting line-height for tds in outlook
*/
.mso .cmctbl table td, .mso .cmctbl table th {
  Margin-left: 20px !important;  /* [1] */
  Margin-right: 20px !important; /* [1] */
}
.cmctbl--inline table {
  border-collapse: collapse;
}
.mso .cmctbl--inline table, .mso .cmctbl table {
    mso-table-lspace: 0pt;
    mso-table-rspace: 0pt;
    mso-line-height-rule: exactly; /* [2] */
}
</style>
    
  <style type="text/css">
.main,.mso{background-color:#f5f6f8}.logo a:hover,.logo a:focus{color:#1e2e3b !important}.footer-logo a:hover,.footer-logo a:focus{color:#372d1b !important}.mso .layout-has-border{border-top:1px solid #b9c0ce;border-bottom:1px solid #b9c0ce}.mso .layout-has-bottom-border{border-bottom:1px solid #b9c0ce}.mso .border,.ie .border{background-color:#b9c0ce}.mso h1,.ie h1{}.mso h1,.ie h1{font-size:36px !important;line-height:43px !important}.mso h2,.ie h2{}.mso h2,.ie h2{font-size:26px !important;line-height:34px !important}.mso h3,.ie h3{}.mso h3,.ie h3{font-size:20px !important;line-height:28px !important}.mso .layout__inner,.ie .layout__inner{}.mso .footer__share-button p{}.mso .footer__share-button p{font-family:Georgia,serif}
</style><link href="https://css.createsend1.com/frontend/css/previewiframe.090e57e0c6577c59a7cf.min.css?c=1587855496" rel="stylesheet"></head>
<!--[if mso]>
  <body class="mso">
<![endif]-->
<!--[if !mso]><!-->
  <body class="main full-padding" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;">
<!--<![endif]-->
    <table class="wrapper" style="border-collapse: collapse;table-layout: fixed;min-width: 320px;width: 100%;background-color: #f5f6f8;" cellpadding="0" cellspacing="0" role="presentation"><tbody><tr><td>
      <div role="banner">
        <div class="preheader" style="Margin: 0 auto;max-width: 560px;min-width: 280px; width: 280px;width: calc(28000% - 167440px);">
          <div style="border-collapse: collapse;display: table;width: 100%;">
          <!--[if (mso)|(IE)]><table align="center" class="preheader" cellpadding="0" cellspacing="0" role="presentation"><tr><td style="width: 280px" valign="top"><![endif]-->
            <div class="snippet" style="display: table-cell;Float: left;font-size: 12px;line-height: 19px;max-width: 280px;min-width: 140px; width: 140px;width: calc(14000% - 78120px);padding: 10px 0 5px 0;color: #999;font-family: Georgia,serif;">
              
            </div>
          <!--[if (mso)|(IE)]></td><td style="width: 280px" valign="top"><![endif]-->
            <div class="webversion" style="display: table-cell;Float: left;font-size: 12px;line-height: 19px;max-width: 280px;min-width: 139px; width: 139px;width: calc(14100% - 78680px);padding: 10px 0 5px 0;text-align: right;color: #999;font-family: Georgia,serif;">
              <p style="Margin-top: 0;Margin-bottom: 0;" emb-social="webversion">No images? <a style="text-decoration: underline;transition: opacity 0.1s ease-in;color: #999;" href="https://scoutff.createsend1.com/t/y-e-nhrbil-l-m/" target="_blank">Click here</a></p>
            </div>
          <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
          </div>
        </div>
        <div class="header" style="Margin: 0 auto;max-width: 600px;min-width: 320px; width: 320px;width: calc(28000% - 167400px);" id="emb-email-header-container">
        <!--[if (mso)|(IE)]><table align="center" class="header" cellpadding="0" cellspacing="0" role="presentation"><tr><td style="width: 600px"><![endif]-->
          <div class="logo emb-logo-margin-box" style="font-size: 26px;line-height: 32px;Margin-top: 24px;Margin-bottom: 40px;color: #41637e;font-family: Georgia,serif;Margin-left: 20px;Margin-right: 20px;" align="center">
            <div class="logo-left" align="left" id="emb-email-header"><a style="text-decoration: none;transition: opacity 0.1s ease-in;color: #41637e;" href="https://scoutff.createsend1.com/t/y-i-nhrbil-dylyiyjhx-r/" target="_blank"><img style="display: block;height: auto;width: 100%;border: 0;max-width: 108px;" src="https://i1.createsend1.com/ei/y/7C/5B3/4F7/025018/csfinal/Logo.png" alt="" width="108"></a></div>
          </div>
        <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
        </div>
      </div>
      <div>
      <div class="layout one-col fixed-width stack" style="Margin: 0 auto;max-width: 600px;min-width: 320px; width: 320px;width: calc(28000% - 167400px);overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;">
        <div class="layout__inner" style="border-collapse: collapse;display: table;width: 100%;background-color: #f5f6f8;">
        <!--[if (mso)|(IE)]><table align="center" cellpadding="0" cellspacing="0" role="presentation"><tr class="layout-fixed-width" style="background-color: #f5f6f8;"><td style="width: 600px" class="w560"><![endif]-->
          <div class="column" style="text-align: left;color: #717a8a;font-size: 16px;line-height: 24px;font-family: Georgia,serif;">
        
            <div style="Margin-left: 20px;Margin-right: 20px;Margin-top: 24px;">
      <div style="mso-line-height-rule: exactly;line-height: 20px;font-size: 1px;">&nbsp;</div>
    </div>
        
            <div style="Margin-left: 20px;Margin-right: 20px;">
      <div style="mso-line-height-rule: exactly;mso-text-raise: 11px;vertical-align: middle;">
        <h1 style="Margin-top: 0;Margin-bottom: 20px;font-style: normal;font-weight: normal;color: #3d3b3d;font-size: 30px;line-height: 38px;">${user.name}, Week #${maximumRound} is over and here is your results!</h1>
      </div>
    </div>
        
            <div style="Margin-left: 20px;Margin-right: 20px;">
      <div style="mso-line-height-rule: exactly;mso-text-raise: 11px;vertical-align: middle;">
        <h3 style="Margin-top: 0;Margin-bottom: 0;font-style: normal;font-weight: normal;color: #3d3b3d;font-size: 17px;line-height: 26px;">Number of players in your favorite list: ${userWithLikedPlayers.length ?? 0}</h3><h3 style="Margin-top: 12px;Margin-bottom: 0;font-style: normal;font-weight: normal;color: #3d3b3d;font-size: 17px;line-height: 26px;">Total number of goals in week #${maximumRound}: ${weeklyCommonData.goals}</h3><h3 style="Margin-top: 12px;Margin-bottom: 0;font-style: normal;font-weight: normal;color: #3d3b3d;font-size: 17px;line-height: 26px;">Total number of assists in week #${maximumRound}: ${weeklyCommonData.goal_assist}</h3><h3 style="Margin-top: 12px;Margin-bottom: 0;font-style: normal;font-weight: normal;color: #3d3b3d;font-size: 17px;line-height: 26px;">Total number of yellow cards in week #${maximumRound}: ${weeklyCommonData.yellow_cards}</h3><h3 style="Margin-top: 12px;Margin-bottom: 12px;font-style: normal;font-weight: normal;color: #3d3b3d;font-size: 17px;line-height: 26px;">Total number of red cards in week 
#${maximumRound}: ${weeklyCommonData.red_cards}</h3>
      </div>
    </div>
        
            <div style="Margin-left: 20px;Margin-right: 20px;">
      <div class="btn btn--flat btn--large" style="Margin-bottom: 20px;text-align: left;">
        <!--[if !mso]--><a style="border-radius: 4px;display: inline-block;font-size: 14px;font-weight: bold;line-height: 24px;padding: 12px 24px;text-align: center;text-decoration: none !important;transition: opacity 0.1s ease-in;color: #ffffff !important;background-color: #198754;font-family: Georgia, serif;" href="https://scoutff.createsend1.com/t/y-i-nhrbil-dylyiyjhx-y/" target="_blank">Check the statistics!</a><!--[endif]-->
      <!--[if mso]><p style="line-height:0;margin:0;">&nbsp;</p><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" href="https://scoutff.createsend1.com/t/y-i-nhrbil-dylyiyjhx-y/" style="width:143.25pt" arcsize="9%" fillcolor="#198754" stroke="f"><v:textbox style="mso-fit-shape-to-text:t" inset="0pt,8.25pt,0pt,8.25pt"><center style="font-size:14px;line-height:24px;color:#FFFFFF;font-family:Georgia,serif;font-weight:bold;mso-line-height-rule:exactly;mso-text-raise:1.5px">Check the statistics!</center></v:textbox></v:roundrect><![endif]--></div>
    </div>
        
            <div style="Margin-left: 20px;Margin-right: 20px;">
      <div style="mso-line-height-rule: exactly;line-height: 16px;font-size: 1px;">&nbsp;</div>
    </div>
        
            <div style="Margin-left: 20px;Margin-right: 20px;">
        <div style="font-size: 12px;font-style: normal;font-weight: normal;line-height: 19px;Margin-bottom: 20px;" align="center">
          <img style="border: 0;display: block;height: auto;width: 100%;max-width: 900px;" alt="" width="560" src="https://i1.createsend1.com/ei/y/7C/5B3/4F7/025018/csfinal/stockimg-2-473432-990000079e04513c.jpg">
        </div>
      </div>
        
            <div style="Margin-left: 20px;Margin-right: 20px;Margin-bottom: 24px;">
      <div style="mso-line-height-rule: exactly;line-height: 8px;font-size: 1px;">&nbsp;</div>
    </div>
        
          </div>
        <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
        </div>
      </div>
  
      ${generateTopThreeTemplate(userWithLikedPlayers.slice(0,3))}
  
      <div style="mso-line-height-rule: exactly;line-height: 20px;font-size: 20px;">&nbsp;</div>
  
      <div class="layout one-col fixed-width stack" style="Margin: 0 auto;max-width: 600px;min-width: 320px; width: 320px;width: calc(28000% - 167400px);overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;">
        <div class="layout__inner" style="border-collapse: collapse;display: table;width: 100%;background-color: #ffffff;">
        <!--[if (mso)|(IE)]><table align="center" cellpadding="0" cellspacing="0" role="presentation"><tr class="layout-fixed-width" style="background-color: #ffffff;"><td style="width: 600px" class="w560"><![endif]-->
          <div class="column" style="text-align: left;color: #717a8a;font-size: 16px;line-height: 24px;font-family: Georgia,serif;">
        
            <div style="Margin-left: 20px;Margin-right: 20px;Margin-top: 24px;Margin-bottom: 24px;">
        ${generateNonTopThree(userWithLikedPlayers.slice(3,10))}
          </div>
        <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
        </div>
      </div>
  
      <div style="mso-line-height-rule: exactly;line-height: 20px;font-size: 20px;">&nbsp;</div>
  
      <div style="background-color: #ffffff;">
        <div class="layout two-col stack" style="Margin: 0 auto;max-width: 600px;min-width: 320px; width: 320px;width: calc(28000% - 167400px);overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;">
          <div class="layout__inner" style="border-collapse: collapse;display: table;width: 100%;">
          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" role="presentation"><tr class="layout-full-width" style="background-color: #ffffff;"><td class="layout__edges">&nbsp;</td><td style="width: 300px" valign="top" class="w260"><![endif]-->
            <div class="column" style="text-align: left;color: #717a8a;font-size: 16px;line-height: 24px;font-family: Georgia,serif;max-width: 320px;min-width: 300px; width: 320px;width: calc(12300px - 2000%);Float: left;">
            
              <div style="Margin-left: 20px;Margin-right: 20px;Margin-top: 24px;">
      <div style="mso-line-height-rule: exactly;mso-text-raise: 11px;vertical-align: middle;">
        <h3 style="Margin-top: 0;Margin-bottom: 12px;font-style: normal;font-weight: normal;color: #3d3b3d;font-size: 17px;line-height: 26px;">Top Scorers</h3>
      </div>
    </div>
            
            ${generateGoalTemplate(commonData)}
            
              <div style="Margin-left: 20px;Margin-right: 20px;Margin-bottom: 24px;">
      <div style="mso-line-height-rule: exactly;mso-text-raise: 11px;vertical-align: middle;">
        <p style="Margin-top: 0;Margin-bottom: 0;"><strong><a style="text-decoration: underline;transition: opacity 0.1s ease-in;color: #198754;" data-emb-iscopy="true" href="https://scoutff.createsend1.com/t/y-i-nhrbil-dylyiyjhx-h/" target="_blank">Check out the goal rankings in detail.</a></strong></p>
      </div>
    </div>
            
            </div>
          <!--[if (mso)|(IE)]></td><td style="width: 300px" valign="top" class="w260"><![endif]-->
            <div class="column" style="text-align: left;color: #717a8a;font-size: 16px;line-height: 24px;font-family: Georgia,serif;max-width: 320px;min-width: 300px; width: 320px;width: calc(12300px - 2000%);Float: left;">
            
              <div style="Margin-left: 20px;Margin-right: 20px;Margin-top: 24px;">
      <div style="mso-line-height-rule: exactly;mso-text-raise: 11px;vertical-align: middle;">
        <h3 style="Margin-top: 0;Margin-bottom: 12px;font-style: normal;font-weight: normal;color: #3d3b3d;font-size: 17px;line-height: 26px;">Assist Merchants</h3>
      </div>
    </div>
            
              ${generateAssistTemplate(commonData)}
            
              <div style="Margin-left: 20px;Margin-right: 20px;Margin-bottom: 24px;">
      <div style="mso-line-height-rule: exactly;mso-text-raise: 11px;vertical-align: middle;">
        <p style="Margin-top: 0;Margin-bottom: 0;"><strong><a style="text-decoration: underline;transition: opacity 0.1s ease-in;color: #198754;" href="https://scoutff.createsend1.com/t/y-i-nhrbil-dylyiyjhx-k/" data-emb-iscopy="true" target="_blank">Check out the assist rankings in detail.</a></strong></p>
      </div>
    </div>
            
            </div>
          <!--[if (mso)|(IE)]></td><td class="layout__edges">&nbsp;</td></tr></table><![endif]-->
          </div>
        </div>
      </div>
  
      <div style="mso-line-height-rule: exactly;line-height: 24px;font-size: 24px;">&nbsp;</div>
  
      <div class="layout one-col fixed-width stack" style="Margin: 0 auto;max-width: 600px;min-width: 320px; width: 320px;width: calc(28000% - 167400px);overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;">
        <div class="layout__inner" style="border-collapse: collapse;display: table;width: 100%;background-color: #f5f6f8;">
        <!--[if (mso)|(IE)]><table align="center" cellpadding="0" cellspacing="0" role="presentation"><tr class="layout-fixed-width" style="background-color: #f5f6f8;"><td style="width: 600px" class="w560"><![endif]-->
          <div class="column" style="text-align: left;color: #717a8a;font-size: 16px;line-height: 24px;font-family: Georgia,serif;">
        
            <div style="Margin-left: 20px;Margin-right: 20px;Margin-top: 24px;Margin-bottom: 24px;">
      <div>
        <div style="padding-top: 8px; text-align: left"><span style="padding-right: 4px;"><a style="text-decoration: underline;transition: opacity 0.1s ease-in;color: #198754;display: inline-block;border-radius: 50%;width: 24px;height: 24px;max-height: 24px;background-color: #7a7b7c;" href="https://scoutff.createsend1.com/t/y-i-nhrbil-dylyiyjhx-u/" target="_blank"><img style="border: 0;" src="https://i4.createsend1.com/static/eb/master/13-the-blueprint-3/images/socialmedia/twitter-white-small.png" alt="Twitter" height="24" width="24" cm_dontimportimage=""></a></span><span style="padding-right: 4px;"><a style="text-decoration: underline;transition: opacity 0.1s ease-in;color: #198754;display: inline-block;border-radius: 50%;width: 24px;height: 24px;max-height: 24px;background-color: #7a7b7c;" href="https://scoutff.createsend1.com/t/y-i-nhrbil-dylyiyjhx-o/" target="_blank"><img style="border: 0;" src="https://i5.createsend1.com/static/eb/master/13-the-blueprint-3/images/socialmedia/website-white-small.png" alt="Website" height="24" width="24" cm_dontimportimage=""></a></span></div>
      </div>
    </div>
        
          </div>
        <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
        </div>
      </div>
  
      </div>
      <div role="contentinfo"><div style="line-height:4px;font-size:4px;" id="footer-top-spacing">&nbsp;</div><div class="layout email-flexible-footer email-footer" style="Margin: 0 auto;max-width: 600px;min-width: 320px; width: 320px;width: calc(28000% - 167400px);overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;" id="footer-content">
      <div class="layout__inner left-aligned-footer" style="border-collapse: collapse;display: table;width: 100%;">
        <!--[if (mso)|(IE)]><table align="center" cellpadding="0" cellspacing="0" role="presentation"><tr class="layout-email-footer"><![endif]-->
        <!--[if (mso)|(IE)]><td><table cellpadding="0" cellspacing="0"><![endif]-->
        <!--[if (mso)|(IE)]><td valign="top"><![endif]-->
          <div class="column" style="text-align: left;font-size: 12px;line-height: 19px;color: #999;font-family: Georgia,serif;">
      <div class="footer-logo emb-logo-margin-box" style="font-size: 26px;line-height: 32px;Margin-top: 24px;Margin-bottom: 40px;color: #7b663d;font-family: Roboto,Tahoma,sans-serif;" align="center">
        <div style="margin-right: 20px;" emb-flexible-footer-logo="" align="center"><a style="text-decoration: none;transition: opacity 0.1s ease-in;color: #7b663d;" href="https://scoutff.createsend1.com/t/y-i-nhrbil-dylyiyjhx-b/" target="_blank"><img style="border: 0;display: block;height: auto;width: 100%;max-width: 108px;" src="https://i1.createsend1.com/ei/y/7C/5B3/4F7/025018/csfinal/LogoFooter.png" alt="" width="108"></a></div>
      </div>
    </div>
        <!--[if (mso)|(IE)]></td><![endif]-->
        <!--[if (mso)|(IE)]><td valign="top"><![endif]-->
          <div class="column" style="text-align: left;font-size: 12px;line-height: 19px;color: #999;font-family: Georgia,serif;display: none;">
      <div style="margin-left: 0;margin-right: 0;Margin-top: 10px;Margin-bottom: 10px;">
        <div class="footer__share-button">
          
          
          
          
        </div>
      </div>
    </div>
        <!--[if (mso)|(IE)]></td><![endif]-->
        <!--[if (mso)|(IE)]><td valign="top"><![endif]-->
          <table style="border-collapse: collapse;table-layout: fixed;display: inline-block;width: 472px;" cellpadding="0" cellspacing="0"><tbody><tr><td><div class="column js-footer-additional-info" style="text-align: left;font-size: 12px;line-height: 19px;color: #999;font-family: Georgia,serif;width: 472px;">
      <div style="margin-left: 0;margin-right: 0;Margin-top: 10px;Margin-bottom: 10px;">
        <div class="email-footer__additional-info" style="font-size: 12px;line-height: 19px;margin-bottom: 18px;margin-top: 0px;">
          <div bind-to="address"><h2 class="email-flexible-footer__additionalinfo--center" style="Margin-top: 0;Margin-bottom: 0;font-style: normal;font-weight: normal;color: #3d3b3d;font-size: 22px;line-height: 31px;font-family: Montserrat,&quot;DejaVu Sans&quot;,Verdana,sans-serif;"><span class="font-montserrat" style="text-decoration: inherit;">Scoutff</span></h2></div>
        </div>
        <div class="email-footer__additional-info" style="font-size: 12px;line-height: 19px;margin-bottom: 18px;margin-top: 0px;">
          <div><p class="email-flexible-footer__additionalinfo--center" style="Margin-top: 0;Margin-bottom: 0;">All rights reserved.</p></div>
        </div>
        
        <div class="email-footer__additional-info" style="font-size: 12px;line-height: 19px;margin-bottom: 15px;">
          <span><a style="text-decoration: underline;transition: opacity 0.1s ease-in;color: #999;" href="https://scoutff.updatemyprofile.com/y-l-2AD73FFF-l-c" lang="en" target="_blank">Preferences</a>&nbsp;&nbsp;|&nbsp;&nbsp;</span><a style="text-decoration: underline;transition: opacity 0.1s ease-in;color: #999;" href="https://scoutff.createsend1.com/t/y-u-nhrbil-l-q/" target="_blank">Unsubscribe</a>
        </div>
        <!--[if mso]>&nbsp;<![endif]-->
      </div>
    </div></td></tr></tbody></table>
        <!--[if (mso)|(IE)]></table></td><![endif]-->
        <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
      </div>
    </div><div style="line-height:40px;font-size:40px;" id="footer-bottom-spacing">&nbsp;</div></div>
      
    </td></tr></tbody></table>
  <style type="text/css">
@media (max-width:619px){.email-flexible-footer .left-aligned-footer .column,.email-flexible-footer .center-aligned-footer,.email-flexible-footer .right-aligned-footer .column{max-width:100% !important;text-align:center !important;width:100% !important}.flexible-footer-logo{margin-left:0px !important;margin-right:0px !important}.email-flexible-footer .left-aligned-footer .flexible-footer__share-button__container,.email-flexible-footer .center-aligned-footer .flexible-footer__share-button__container,.email-flexible-footer .right-aligned-footer .flexible-footer__share-button__container{display:inline-block;margin-left:5px !important;margin-right:5px !important}.email-flexible-footer__additionalinfo--center{text-align:center !important}.email-flexible-footer .left-aligned-footer table,.email-flexible-footer .center-aligned-footer table,.email-flexible-footer .right-aligned-footer 
table{display:table !important;width:100% !important}.email-flexible-footer .footer__share-button,.email-flexible-footer .email-footer__additional-info{margin-left:20px;margin-right:20px}}
</style>
<script type="text/javascript" src="https://js.createsend1.com/js/compiled/app/global/polyfill/polyfill.min.js?h=8D4972A220210825125555"></script>
<script type="text/javascript" src="https://js.createsend1.com/js/tsb.min.js?h=354E27EC20210825125555"></script>
<script type="text/javascript" src="https://js.createsend1.com/js/compiled/app/content/emailPreview-iframe.min.js?h=8AF34A3A20210825125555" data-model="{&quot;Scrollbars&quot;:true}"></script>

</body></html>
    `
}
