import { Collection, MongoClient } from "mongodb";
import dotenv from "dotenv";
import { User, FavoriteCharacter, PurchaseItem } from "./types" ;
import { ObjectId } from "mongodb";
dotenv.config();

export const client = new MongoClient(process.env.MongoDB_URI || "mongodb+srv://CHYN-User:t5iKaBbTegc8Ghpw@userdb.tsld2b6.mongodb.net/");

export const collection : Collection<User> = client.db("UserDB").collection<User>("users");

async function exit(){
    try {
        await client.close();
        console.log("Disconnected from database");
    }catch (error){
        console.error(error);
    }
    process.exit(0)
}

export async function getNextId(){
    let users : User[] = await collection.find({}).sort({id: -1}).limit(1).toArray();
    if(users.length == 0){
        return 1;
    }else{
        return users[0].id +1;
    }
}


export async function createUser(user:User){
    user.id = await getNextId();
    user.vbucks = 80000;
    return await collection.insertOne(user);
}

export async function getUsers(){
    return await collection.find({}).toArray()
}

export async function findUserByCredentials(displayName: string, password: string): Promise<User | null> {
    return await collection.findOne({ displayName, password });
}

export async function addFavoriteCharacter(userId: string, name: string, image: string) {
    const result = await collection.updateOne(
        { _id: new ObjectId(userId) },
        {
            $addToSet: {
                favorites: { name, image } 
            }
        }
    );
    return result;
}

export async function addPurchaseItem(userId: string, item: PurchaseItem) {
  const result = await collection.updateOne(
    { _id: new ObjectId(userId) },
    { $push: { purchases: item } } 
  );
  return result;
}

export async function addBlacklistedCharacter(userId: string, name: string, image: string, reason: string) {
    const result = await collection.updateOne(
        { _id: new ObjectId(userId) },
        { 
            $addToSet: {
                blacklist: { name, image, reason}
            }
        }
    );
    return result;
}

export async function updateUserAccountInfo(displayName: string, updatedData: Partial<User>) {
  const result = await collection.updateOne(
    { displayName },
    { $set: updatedData }
  );

  return result;
}

export async function connect(){
    try {
        await client.connect();
        console.log("Connected to database");
        process.on("SIGINT", exit);
    } catch (error){
        console.error(error);
    }
}