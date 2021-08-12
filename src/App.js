import React, { useState } from "react";
import Nav from "./components/Nav";
import ItemListContainer from "./pages/ItemListContainer";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ShoppingCart from "./pages/ShoppingCart";
import { initialState } from "./assets/state";

function App() {
  const [items] = useState(initialState.items);
  const [cartItems, setCartItems] = useState(initialState.cartItems);
  //console.log(cartItems);
  // 쇼핑 카트의 상품을 추가 
  const updateCart = (itemId) => {
    const findItem = cartItems.filter(cartItem => cartItem.itemId === itemId)[0];
    const idx = cartItems.indexOf(findItem);

    if(findItem) { // 카트에 동일한 상품이 있는 경우
      console.log('카트에 이미 들어가 있는 상품이에요');
      setCartItems([
        ...cartItems.slice(0, idx),
        {itemId, quantity: ++findItem.quantity},
        ...cartItems.slice(idx+1)
      ]);
    } else { // 카트에 동일한 상품이 없는 경우
      console.log('카트에 없는 상품이에요');
      setCartItems([...cartItems, {itemId, quantity: 1}])
    }

  }
  // 쇼핑 카트의 상품 삭제
  const deleteCartItem = (filteredCartItems) => {
    setCartItems(filteredCartItems);
  }
  // 쇼핑 카트의 수량 수정
  const updateQuantity = updateCartItems => {
    setCartItems(updateCartItems); 
  }
  return (
    <Router>
      <Nav count={cartItems.length}/>
      <Switch>
        <Route exact={true} path="/">
          <ItemListContainer items={items} updateCart={updateCart}/>
        </Route>
        <Route path="/shoppingcart">
          <ShoppingCart
            cartItems={cartItems}
            items={items}
            deleteCartItem={deleteCartItem}
            updateQuantity={updateQuantity}
          />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
