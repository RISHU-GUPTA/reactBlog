import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf";


class AuthService{
    client=new Client();
    account;

    constructor(){
        this.client.setEndpoint(conf.appwriteUrl) // Your API Endpoint
        .setProject(conf.appwriteProjectId);     
        this.account=new Account(this.client);
    }
    async createAccount({email,password,name}){
        try{
         const userAccount=   await this.account.create(ID.unique(),email,password,name);
         if(userAccount){
            return this.login(email,password);
         }else{
            return userAccount;
         }
        }
        catch(e){
            throw(e);
        }
    }

    async login({email,password}){
        try{
           return await this.account.createEmailPasswordSession(email,password);
        }catch(e){
                throw e;
        }
    }

    async getCurrentuser(){
        try{
          return await this.account.get();
        }catch(e){
            console.log(e)
        }

        return null;
    }

    async logout(){
        try{
            await this.account.deleteSessions();
        }catch(e){
            console.log(e)
        }

        return null;
    }
}
const authService=new AuthService();

export default authService;