import { Owner } from "../../domain/models/owner";
import { MongoDBOwner, ownerModel } from "../database/ownerModel";
import { updateRes } from "../../domain/models/update";

export type ownerRepository = {
  create: (owner: Owner) => Promise<Owner>;
  findByEmail: (email: string) => Promise<Owner | null>;
  findOwner: () => Promise<Owner[]>;
  blockOwners(id: string): Promise<Owner | void | updateRes>;
  unblcokowner(id: string): Promise<Owner | void | updateRes>;
  updatePremium (email : string) : Promise<Owner | void |updateRes>
  ownerFetch(email : string) : Promise<Owner | null>
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
  }
  const updatePremium = async(email : string) : Promise<Owner|void | updateRes>=>{ 
    const result = await ownerModel.updateOne({email : email},{$set:{premium : true}})
    if(result.matchedCount>0){
      return result
    }
  }
  
  const ownerFetch = async(email : string) : Promise<Owner|null >=>{

    const result = await ownerModel.findOne({email})
  
    if(result){
      
    }
    return  result

    

  };

  return {
    findByEmail,
    create,
    findOwner,
    blockOwners,
    unblcokowner,
    updatePremium,
    ownerFetch,
  };
};
