import { Owner } from "../../domain/models/owner";
import { MongoDBOwner, ownerModel } from "../database/ownerModel";
import { updateRes } from "../../domain/models/update";
import { stadium } from "../../domain/models/stadium";
import { ObjectId } from "bson";

export type ownerRepository = {
  create: (owner: Owner) => Promise<Owner>;
  findByEmail: (email: string) => Promise<Owner | null>;
  findOwner: () => Promise<Owner[]>;
  blockOwners(id: string): Promise<Owner | void | updateRes>;
  unblcokowner(id: string): Promise<Owner | void | updateRes>;
  updatePremium(stadiumId :string,orderId:string,ownerId : string,userId : string,stadiumPrice :string,date:string,startDate : string ,endDate : string): Promise<Owner | void | updateRes>;
  ownerFetch(email: string,item :string): Promise<Owner[]| null | any>;
  ownerFetchById(ownerid: string): Promise<Owner[] | null>;
  changePassword(email :string,changedpassword:string) : Promise<Owner | null | updateRes>

  userInfo(
    userId: string,
    ownerid: string
  ): Promise<Owner[] | null | updateRes>;
  userList(id: string): Promise<Owner[] | null>;
};
export const OwnerRepositoryImpl = (
  OwnerModel: MongoDBOwner
): ownerRepository => {
  const findByEmail = async (email: string): Promise<Owner | null> => {
    const owner = await OwnerModel.findOne({ email });
    return owner ? owner.toObject() : null;
  };
  const create = async (owner: Owner): Promise<Owner> => {
    const createOwner = await OwnerModel.create(owner);

    return createOwner.toObject();
  };
  const findOwner = async (): Promise<Owner[]> => {
    const adminOwnerFetch = await OwnerModel.find();

    return adminOwnerFetch;
  };
  const blockOwners = async (id: string): Promise<Owner | void | updateRes> => {
    const result = await OwnerModel.updateOne(
      { _id: id },
      { $set: { isblocked: true } }
    );
    if (result.matchedCount > 0) {
      return result;
    }
  };
  const unblcokowner = async (
    id: string
  ): Promise<Owner | void | updateRes> => {
    const result = await ownerModel.updateOne(
      { _id: id },
      { $set: { isblocked: false } }
    );

    if (result.matchedCount > 0) {
      return result;
    }
  };
  const updatePremium = async (
    stadiumId :string,orderId:string,ownerId : string,userId : string,stadiumPrice:string,date:string,startDate : string,endDate : string
  ): Promise<Owner | void | updateRes> => {
    const objectId = new ObjectId(ownerId)
    const result = await ownerModel.updateOne(
      { _id: objectId },
      { $push: { paymentDetails:{orderId : orderId,stadiumId : stadiumId,userId :userId,stadiumPrice:stadiumPrice,date:date,startDate :startDate,endDate:endDate} } }
    );
    if (result.matchedCount > 0) {
      return result;
    }
  };

  const ownerFetch = async (email: string,item :string): Promise<Owner[] | null | any > => {
    
    const page : any = item
    const  pageSize =5
    const skipCount = (page - 1) * pageSize
    console.log(skipCount,"5555");
    
    const result = await ownerModel.find({ email:email }).populate("User")

    const modifiedOwners = result.map((owner :any) => {
      if (owner.User && owner.User.length > 0) {
        owner.User = owner.User.slice(skipCount, skipCount + pageSize);
      }
      return owner;
    });
    const userCount :any = result[0].User?.length
    console.log(userCount);
    
  const totalCount = Math.ceil(userCount/pageSize) 
  console.log(totalCount);
    return {modifiedOwners,totalCount};
  };
  const ownerFetchById = async (ownerid: string): Promise<Owner[] | null> => {
    const objectid = new ObjectId(ownerid);
    const result = await ownerModel.find({ _id: objectid });
    return result ? result : null;
  };

  const userInfo = async (
    userId: string,
    ownerid: string
  ): Promise<Owner[] | null | updateRes> => {

    const result = await ownerModel.updateMany(
      { _id: ownerid },
      { $addToSet: { User: userId } }
    );
    return result ? result : null;
  };
  const userList = async (id: string): Promise<Owner[] | null> => {
    const objectId = new ObjectId(id);
    const result = await ownerModel.find({ _id: objectId });
    return result ? result : null;
  };
  const changePassword =async (email :string,changedpassword :string):Promise<Owner | null | updateRes>=>{
    const result =await ownerModel.updateOne({email :email},{$set:{password :changedpassword}})

    return result ? result : null
  }
  return {
    findByEmail,
    create,
    findOwner,
    blockOwners,
    unblcokowner,
    updatePremium,
    ownerFetch,
    userInfo,
    userList,
    ownerFetchById,
    changePassword
  };
};
