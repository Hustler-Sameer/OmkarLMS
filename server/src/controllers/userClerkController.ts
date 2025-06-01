import { Request , Response } from "express";
import { ClerkClient } from "@clerk/express";
import { clerkClient } from "..";

export const updateUser = async (req: Request, res: Response): Promise<void> => {
  console.log("Hello")
  const { userId } = req.params;
  const userData = req.body;
  try {
   const user =await clerkClient.users.updateUserMetadata(userId ,{
    publicMetadata :{
        userType: userData.publicMetadata.userType,
        settings:userData.publicMetadata.settings
    }
   }, )

    res.json({ message: "User updated successfully",data:user });
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error });
  }
};