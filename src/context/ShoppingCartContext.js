import React from 'react'
import useLocalStorage from '../hooks/useLocalStorage';
import { sendPostCheckout, sendPostOrder, getStripeSession} from '../api';
import { useUser } from './UserContext';

const ShoppingCartContext = React.createContext();
export const useShoppingCart = () => React.useContext(ShoppingCartContext); //must be called as custom react hook function 

export function ShoppingCartProvider({children}) {
    const [cartItems, setCartItems] = useLocalStorage('cart', []);
    const [sessionId, setSessionId] = useLocalStorage('sessionId', '');
    const {currentUser} = useUser();

    const cartQty = cartItems.reduce((total, currentItem) => total + currentItem.count, 0 );
    const itemQty = (id) => cartItems.find(item => item.id === id).count;

    const increaseCartQty = (id, count) => {
        setCartItems(items => {
            if(items.find(item => item.id === id)){
                 return items.map(item => item.id === id ? {id: id, count: item.count+count} : item);
            }else{
                return [...items, {id: id, count: count}];
            } 
        })
    };
    const decreaseCartQty = (id) => {
        setCartItems(items => {
            const updatedItems = items.map(item => (item.id === id) ? {id: id, count: item.count -1} : item)
            return updatedItems.filter(item => item.count !== 0);
        })
    }
    const initCartQty = () => {
        setCartItems([]);
    };

    const [show, setShow] = React.useState(false);
    const openCart = () => setShow(true);
    const closeCart = () => setShow(false);

    const checkout = async () => {
        try{
            const res = await sendPostCheckout(cartItems);
            const {sessionId, url} = res.data;
            console.log(`sessionId: ${sessionId}, url: ${url}`);
            setSessionId(sessionId);
            //sendPostOrder({id: sessionId, items: cartItems});
            window.location = url;
            //await 
            return;
        }catch(e){
            throw (e?.response ? `ERROR ${e.response.status}: ${e?.response?.data}` : e );
        }
    }

    const addOrderHistory = async () => {
        try{
            const res = await getStripeSession(sessionId);
            console.log('res.data(session data) in addorderhistory: ', res.data);
            //await app.currentUser.functions.addOrder({sessionId, ...res.data, cartItems});
            //const newOrder = await app.currentUser.functions.getOrder(sessionId);
            //await app.currentUser.functions.addOrderRef(newOrder);
            await sendPostOrder(sessionId, currentUser.id, cartItems);
            initCartQty();
            console.log('ordered added to history');
        }catch(e){
            console.log(e);
        }
    }

    const value ={
        cartItems,
        cartQty,
        increaseCartQty,
        decreaseCartQty,
        initCartQty,
        itemQty,
        show,
        openCart,
        closeCart,
        checkout,
        addOrderHistory
    }

  return (
    <ShoppingCartContext.Provider value={value}>
      {children}
    </ShoppingCartContext.Provider>
  )
}



    // //to access mongoDB
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