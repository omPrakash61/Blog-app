import config from '../config/config'
import { Client, Account, ID} from 'appwrite';


export class AuthService{
    client = new Client();
    

    constructor(){
        this.client.setEndpoint(config.appWriteURL)
        .setProject(config.appWriteProjectId);

        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }){
        try{
            const createdUser = await this.account.create(ID.unique(), email, password, name);
            if (createdUser){
                return true;

            }else{
                return false;
            }
        }
        catch(error){
            throw error
        }
    }

    async login({email, password}){
        try{
            return await this.account.createEmailPasswordSession(email, password);
        }
        catch(error){
            console.log(error)
            throw error

        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get()
            
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error :", error);
        }
    }

    async logOut(){
        try {
            return await this.account.deleteSessions()
        } catch (error) { 
            console.log("Appwrite service :: logOut :: error :", error);
        }
    }
}

const authService = new AuthService()
export default authService