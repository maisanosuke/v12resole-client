import React from 'react';
import { sendPostLogin, sendPostSignup, sendPatchUpdateUser, getOrderHistory } from '../api';
import useLocalStorage from '../hooks/useLocalStorage';
import * as Realm from "realm-web";
import {APP_ID} from "../realm/constants";

const app = new Realm.App(APP_ID);

const UserContext = React.createContext();

export const useUser = () => React.useContext(UserContext);

export function UserProvider({children}){
    const [currentUser, setCurrentUser] = useLocalStorage('currentUser', null);
    const [tempUser, setTempUser] = useLocalStorage('tempUser', null);

    const login = async ({email, password}) => {
        try{
            const credentials = Realm.Credentials.emailPassword(email, password);
            await app.logIn(credentials);
            //console.log('currentUser:', app.currentUser);
            const {data} = await sendPostLogin({email});
            //console.log('res from server:', data);
            //console.log('user data: ', data.user)
            const {firstName, lastName} = data.user;
            setCurrentUser({id: app.currentUser.id, email: email, name: `${firstName} ${lastName}`});
            return data.message;
            //return 'Successfully Logged in!';
        }catch(e){
            if(e.error === 'invalid username/password'){
                throw new Error("Invalid Email or Password");
            }

            if(e.response.data && e.response.status){
                throw new Error(`${e.response.status}: ${e.response.data}`);
            }

            throw new Error(e.message);
        }
    }

    const signup = async (values) => {//values = {email, firstName, lastName, password}
        //await new Promise((resolve) => setTimeout(resolve, 1000));
            try {
                const {firstName, lastName, email, password} = values;
                //sign up & login user on Realm
                await app.emailPasswordAuth.registerUser({email, password});
                //await app.emailPasswordAuth.sendVerificationEmail(email);
                //console.log("verification email sent:", app.currentUser);
                setTempUser({firstName, lastName, email});
                return "Verification email sent!";

            }catch(e){
                if(e.error === 'name already in use'){
                    throw new Error('Email already in use');
                }
                else throw new Error(`ERROR SIGNING UP: ${e}`);
                //throw (e?.response ? `ERROR ${e.response.status}: ${e?.response?.data}` : e )
            }
    }

    const confirmEmailAndLogin = async(token) => {
        try{
            if(!tempUser) throw new Error({error: "No Temp User stored!"});
            await app.emailPasswordAuth.confirmUser(token);
            // const credentials = Realm.Credentials.emailPassword(tempUser.email, password);
            // await app.logIn(credentials);
            setCurrentUser({id: app.currentUser.id, email: tempUser.email, name: `${tempUser.firstName} ${tempUser.lastName}`});
            //const {data} = await sendPostSignup({id: app.currentUser.id, email: tempUser.email, firstName: tempUser.firstName, lastName: tempUser.lastName});
            //return data.message;
            return 'successfully confirmed email!';
        }catch(e){
            console.error('e.error', e.error);
            throw new Error('Error confirming Email');
        }
    } 


    const logout = async () => {
        if(app.currentUser){
            try{
                await app.currentUser.logOut();
                setCurrentUser(null);
                console.log('Successfully Logged out!');
            }
            catch(e){
                console.error(e);
                throw e;
            }
        }
    }

    const updateUser = async ({email, oldPassword, newPassword}) => 
    {
        console.log(`email:${email}, oldPassword:${oldPassword}, newPassword:${newPassword}`);
        try{
            if(email){
                //await sendPatchUpdateUser({email: currentUser.email, newEmail: email});
                //await app.updateEmail(email);
                // setCurrentUser({email: email})
            }
            if(newPassword){
                //await app.currentUser.changePassword(oldPassword, newPassword);
            }
            console.log('Successfully updated user: ', currentUser.email);
        }catch(e){
            console.error(e);
            throw e;
        }
    }

    const fetchOrderHistory = async () => {
        try{
            //const userData = await app.currentUser.functions.getOrderHistory();
            const res = await getOrderHistory(currentUser.id);
            //console.log('orders received from server: ', res.data);
            return res.data;
        }catch(e){
            console.error(e);
            throw e;
        }
    }

    const value = {
        app: app,
        currentUser: currentUser,
        signup: signup,
        login: login,
        logout: logout,
        updateUser: updateUser,
        fetchOrderHistory: fetchOrderHistory
    }

    return(
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}


    //to access mongoDB
    // const mongo = authedUser.mongoClient("mongodb-atlas");//atlas service name
    // const collection = mongo.db("V12Resole").collection("custom_users");
    // const filter = {
    //     user_id: atlasUser.id, // Query for the user object of the logged in user
    //   };
    //   const updateDoc = {
    //     $push: {
    //       orders: "order_num", // Set the logged in user's favorite color to pink
    //     },
    //   };
    //   const result = await collection.updateOne(filter, updateDoc);
    //   console.log(result);


