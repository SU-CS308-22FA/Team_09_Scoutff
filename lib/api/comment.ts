import mongooseConnection from "../mongoose"
import Comments, { IComment, ICommentt } from "../../models/Comments";
import console from "console";


export async function postComment(comment : IComment): Promise<ICommentt>  {

    await mongooseConnection();
    





    const newComment = await Comments.create(comment);


    return newComment;

  }


  export async function getComments(): Promise<IComment[]> {

    await mongooseConnection();

    const comments = await Comments.find().lean();

    return comments;

  }
