import { Request, Response } from "express";
import { userModel } from "../../infra/database/userModel";
import {
  fetchOwner,
  fetchUsers,
  ownerBlock,
  ownerUnblock,
  userBlock,
  userUnblock,
} from "../../app/usecases/admin/adminHandle";
import { UserRepositoryImpl } from "../../infra/repositories/userRepositories";
import { ownerModel } from "../../infra/database/ownerModel";
import { OwnerRepositoryImpl } from "../../infra/repositories/ownerRepositories";

const db = userModel;
const ownerDB = ownerModel;
// import ad

const userRepo = UserRepositoryImpl(db);
const ownerRepo = OwnerRepositoryImpl(ownerDB);

export const fetchUserdata = async (req: Request, res: Response) => {
  try {
    const usersFetch = await fetchUsers(userRepo)();

    if (usersFetch) {
      res.status(200).json({ success: "data fetch successfull ", usersFetch });
    } else {
      res.json({ faild: "no student data" });
    }
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};
export const blockUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;

    const userBlocked = await userBlock(userRepo)(id);
    if (userBlocked) {
      res.status(200).json({ message: "user blocked " });
    } else {
      res.json({ message: "user block faild" });
    }
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
    console.log(error);
  }
};
export const unBlockUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;

    const userUnBlocked = await userUnblock(userRepo)(id);
    if (userUnBlocked) {
      res.status(200).json({ message: "user blocked " });
    } else {
      res.json({ failmessage: "user unblock faild" });
    }
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
    console.log(error);
  }
};

export const fetchOnwerdata = async (req: Request, res: Response) => {
  try {
    const ownerFetch = await fetchOwner(ownerRepo)();

    if (ownerFetch) {
      res.status(200).json({ success: "onwer data found", ownerFetch });
    } else {
      res.json({ message: "owner data is not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
    console.log(error);
  }
};
export const blockOwner = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;

    const ownerBlocked = await ownerBlock(ownerRepo)(id);
    if (ownerBlocked) {
      res.status(200).json({ message: "user blocked " });
    } else {
      res.json({ messge: " owner block faild" });
    }
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
    console.log(error);
  }
};
export const unBlockOwner = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;

    const ownerUnBlocked = await ownerUnblock(ownerRepo)(id);
    if (ownerUnBlocked) {
      res.status(200).json({ message: "owner blocked " });
    } else {
      res.json({ mesage: "owner block faild" });
    }
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
    console.log(error);
  }
};
