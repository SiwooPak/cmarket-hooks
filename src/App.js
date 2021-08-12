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

  //쇼핑 카트의 상품을 추가
  const handleCount = (e, id) => {
    // 카트에 동일상품이 있는지 확인
    console.log(id);
    const findItem = cartItems.filter((cartItem) => cartItem.itemId === id)[0];
    console.log(findItem);
    // 있다면 상품 수량을 증가
    if (findItem) {
      console.log("이미 담겨있는 물건이에요");
      let idx = cartItems.indexOf(findItem);

      setCartItems([
        ...cartItems.slice(0, idx),
        {
          itemId: id,
          quantity: findItem.quantity++,
        },
        ...cartItems.slice(idx + 1),
      ]);
    } else {
      console.log("카트에 새로 담긴 물건이에요");
      setCartItems([...cartItems, { itemId: id, quantity: 1 }]);
    }
  };
  // 쇼핑 카트에 상품 삭제
  const deleteCartItem = (filteredCartItems) => {
    setCartItems(filteredCartItems);
  };

  // 쇼핑 카트에 상품 수량 변경
  const updateQuantity = (quantity, itemId) => {
    // cartItem에 상품의 정보 가져오기
    const findItem = cartItems.filter(cartItem => cartItem.itemId === itemId)[0];
    const idx = cartItems.indexOf(findItem);
    const cartItem = {itemId, quantity};
    setCartItems([
      ...cartItems.slice(0, idx),
      cartItem,
      ...cartItems.slice(idx+1)
    ]);
  };

  return (
    <Router>
      <Nav length={cartItems.length} />
      <Switch>
        <Route exact={true} path="/">
          <ItemListContainer items={items} handleCount={handleCount} />
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
