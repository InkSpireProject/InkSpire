"use server";
import connectToDB from "./connectToDB";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { User } from "./models/usermodels";

const authenticate = async () => {
  connectToDB();
  const { userId } = auth();

  if (!userId) {
    auth().redirectToSignIn();
  } else {
    let Newuser: any = await User.find({
      clerkId: userId,
    });

    const user = await clerkClient.users.getUser(userId);

    if (!Newuser || Newuser.length === 0) {
      console.log("********************New user created********************");
      Newuser = new User({
        clerkId: user.id,
        username: user.username,
        email: user.emailAddresses[0].emailAddress,
        admin: false,
      });
      await Newuser.save();
    }
  }
};

export default authenticate;
