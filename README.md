![This is an image](/index_page_small.jpg)
# **Scoutff**

<table>
<tr>
<td>
Scoutff is a web application that provides various Turkish Super League related leaderboards and custom squads to its users. It aims to increase the popularity of the league among fans and discover young talents.
It has been developed in Next.js v12.2 environment with ReactJS v18, NodeJS v18, MongoDB and ChakraUI.
</td>
</tr>
</table>

### Table of Contents
+ #### [User Documentation](#userdoc)
  - [Installing and Running the Software](#installandrunsoftware)
  - [Reporting bugs](#reportbugs)
  - [Known bugs](#knownbugs)
+ #### [Develeoper Documentation](#devdoc)
  - [Obtaining the source code](#obtainsource)
  - [Layout of the directory and branching](#layoutdirectory)
  - [Building and deploying](#buildanddeploy)



## User Documentation <a name="userdoc"/>
### Installing the Software <a name="installandrunsoftware"/>
No installation is required. You can just click on the link: https://scoutff.vercel.app
### Reporting bugs <a name="reportbugs"/>
To report a bug, navigate to 'Help' page on the website and fill the complaint form.
### Known bugs <a name="knownbugs"/>
If the user stays idle in any page for longer periods than 30 minutes, user token expires and database calls do not work.
## Develeoper Documentation <a name="devdoc"/>
### Obtaining the source code <a name="obtainsource"/>
Cloning the repository is enough to obtain the source codes, since both backend and frontend are available here.
### Layout of the directory and branching <a name="layoutdirectory"/>
#### Layout
+ adapters
  + Includes Nextout verification with database for login and register actions.
+ components
  + Includes necessary react components and functions, and ChakraUI definitions.
+ lib 
  + Handles general MongoDB connection where /api handles post requests from database.
+ models
  + Configurations for different types of namespaces in database
+ pages
  + Includes the frontend spesifications of all the possible pages. 
  + api 
    + Handles backend related authentiaction and api operations.
#### Branching
  + ##### main
    The main branch which includes the deployed content.
  + ##### v3
    The experimental branch where features are  examined before committing to main branch.
### Building and deploying <a name="buildanddeploy"/>
1. Clone the repository
2. For local uses, utilize the main branch.
3. Run the following command: 
`npm install`
4. Depending on your approach;
    + For development, run: `npm dev`
    + For production, run: `npm build` + `npm start`

