


// const environment variables

import { Account, Avatars, Client, Databases, ID, Query } from "appwrite"
import { useUserContext } from '../context/Context'
const appwriteconfi = {
    projectid: import.meta.env.VITE_APPWRITE_PROJECTID,
    endpoint: import.meta.env.VITE_APPWRITE_ENDPOINT,
    user_collection: import.meta.env.VITE_APPWRITE_USER_COLLECTIONID,
    databaseid: import.meta.env.VITE_APPWRITE_DATABASEID,
}

const client = new Client().setEndpoint(appwriteconfi.endpoint).setProject(appwriteconfi.projectid)
const account = new Account(client)
const avatar = new Avatars(client)
const database = new Databases(client)




// create new user in database
export async function createUser(username, name, email, password) {
    try {

        const newUser = await account.create(ID.unique(), email, password, name)
        if (!newUser) return Error
        const profileUrl=avatar.getInitials(name, 100, 100).href;
        const userData = {
            accountId: newUser.$id,
            username: username,
            name: name,
            email: email,
            profileUrl: profileUrl,
            imageId: ID.unique()
        }
        const data = await SaveDataToUserDB(userData)
        
        console.log('data : ', data)
        const loginHere = loginUser(email, password)

        console.log('created')

        return newUser
    }
    catch (error) {
        console.log(error)
    }
}

// login current user 
export async function loginUser(email, password) {
    try {
        const user = await account.createEmailSession(email, password)
        if (!user) return Error;
        return user
    } catch (error) {
        console.log(error)
    }
}

export async function SaveDataToUserDB(userData) {
    try {
        console.log('data :', userData)
        const user = await database.createDocument(
            appwriteconfi.databaseid,
            appwriteconfi.user_collection,
            userData.accountId,
            { ...userData }
        )
        return user
    } catch (error) {
        console.log(error)
    }
}

export async function getCurrentUser() {
    try {
        const user = await account.get();
        if (!user) throw Error
        const userData = await database.listDocuments(
            appwriteconfi.databaseid,
            appwriteconfi.user_collection,
            [Query.equal('accountId', user.$id)]
        )
        if (!userData) throw Error
        return userData.documents[0]

    } catch (error) {
        console.log(error)

    }
}

export async function createProfile(id, name, bio, url) {
    try {
        const appendInfo = database.updateDocument(
            appwriteconfi.databaseid,
            appwriteconfi.user_collection,
            id,
            {
                name: name,
                bio: bio,
                profileUrl: url,
                imageId: ID.unique()
            }
        )
        if (!appendInfo) throw Error;

    } catch (error) {
        console.log(error)
    }
}

export async function signOutUser() {
    try {
        const loggout = await account.deleteSession('current');
        if (!loggout) throw Error;
        else {
            return loggout
        }
        return loggout;
    } catch (error) {
        console.log(error)
    }
}

export async function signInAccount(user) {
    try {
        const session = await account.createEmailSession(user.email, user.password)
        return session;

    } catch (error) {
        console.log(error)
        return error;
    }
}



export async function getUserProfile(id){
    try {
        const user=await database.getDocument(
            appwriteconfi.databaseid,
            appwriteconfi.user_collection,
            id
        )
        if(!user) return Error;
        return user;
    } catch (error) {
        console.log(error)
        return error;
    }
}