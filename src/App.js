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
  
  // 장바구니의 해당상품을 추가 
  const addCartItem = (itemId) => {
    console.log(itemId)
    const findItem = cartItems.filter(cartItem => cartItem.itemId === itemId)[0];
    const idx = cartItems.indexOf(findItem);
    // 장바구니의 동일한 상품이 있는 경우, 수량만 업뎃
    if(findItem) {
      console.log('동일한 상품이 장바구니에 있어요')
      setCartItems([
        ...cartItems.slice(0, idx),
        {itemId, quantity: findItem.quantity+1},
        ...cartItems.slice(idx+1)
      ]);
    } else { // 없는 경우 상품을 추가하는
      console.log('장바구니에 없는 상품입니다.')
      setCartItems([...cartItems, {itemId, quantity: 1}]);
    }
    

  }
  // 장바구니의 해당상품 삭제
  const deleteCartItem = filteredCartItems => setCartItems(filteredCartItems);
  // 장바구니의 해당상품 수량 수정
  const updateQuantity = (updateQuantityItems) => {
    setCartItems(updateQuantityItems);
  }
  return (
    <Router>
      <Nav count={cartItems.length}/>
      <Switch>
        <Route exact={true} path="/">
          <ItemListContainer items={items} addCartItem={addCartItem} />
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
