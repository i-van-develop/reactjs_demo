import React from 'react';
import {BrowserRouter} from "react-router-dom";
import {Route} from "react-router";

import Cart from "./pages/Cart";
import Shipping from "./pages/Shipping/Shipping";

function App() {
    return (
        <BrowserRouter>
            <Route exact path='/cart'>
                <Cart/>
            </Route>
            <Route exact path='/shipping'>
                <Shipping/>
            </Route>
        </BrowserRouter>
    );
}

export default App;