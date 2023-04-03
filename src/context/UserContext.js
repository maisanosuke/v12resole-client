import React from 'react';
import { sendPostLogin, sendPostSignup, sendPatchUpdatePassword, getOrderHistory } from '../api';
import useLocalStorage from '../hooks/useLocalStorage';
import * as Realm from "realm-web";
import {APP_ID} from "../realm/constants";

const app = new Realm.App(APP_ID);

const UserContext = React.createContext();

export const useUser = () => React.useContext(UserContext);

export function UserProvider({children}){
    const [currentUser, setCurrentUser] = useLocalStorage('currentUser', null);

    const login = async ({email, password}) => {
        try{
            const credentials = Realm.Credentials.emailPassword(email, password);
            await app.logIn(credentials);
            //console.log('currentUser:', app.currentUser);
            const {data} = await sendPostLogin({email});
            //console.log('res from server:', res);
            const {firstName, lastName} = data.user;
            setCurrentUser({id: app.currentUser.id, email: email, name: `${firstName} ${lastName}`});
            return data.message;//'Successfully Logged in!';

        }catch(e){
            if(e.error === 'invalid username/password'){
                throw new Error("Invalid Email or Password");
            }
            else{
                console.log('e.error', e.error);
                throw new Error('Unable to login at this time');
            }
            // if(e.response.data && e.response.status){
            //     throw new Error(`${e.response.status}: ${e.response.data}`);
            // }
        }
    }

    //sign up & automatically login user on Realm
    const signup = async (values) => {
        //await new Promise((resolve) => setTimeout(resolve, 1000));
            try {
                const {email, firstName, lastName, password} = values;
                await app.emailPasswordAuth.registerUser({email, password});
                //await app.emailPasswordAuth.sendVerificationEmail(email);
                //console.log("verification email sent:", app.currentUser);
                //return "Verification email sent!";

                //automatically confirming user email and proceed to login
                const credentials = Realm.Credentials.emailPassword(email, password);
                await app.logIn(credentials);

                //send to MongoDB to save user's data
                await sendPostSignup({id: app.currentUser.id, email, firstName, lastName});

                setCurrentUser({id: app.currentUser.id, email: email, name: `${firstName} ${lastName}`});
                return 'Successfully signed up!';

            }catch(e){
                if(e.error === 'name already in use'){
                    throw new Error('Email already in use');
                }
                else throw new Error(`ERROR SIGNING UP: ${e}`);
                //throw (e?.response ? `ERROR ${e.response.status}: ${e?.response?.data}` : e )
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


