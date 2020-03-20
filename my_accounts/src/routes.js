import React from "react";
import {BrowserRouter,Route} from "react-router-dom";

import LandingPage from "./pages/landing-page";
import LoginPage from "./pages/login-page";
import SignupPage from "./pages/signup-page";
import HomePage from "./pages/home-page";

import AddExpenses from "./pages/expenses/add-expense";
import ExpensesPage from "./pages/expenses/expenses-page";
import EditExpenses from "./pages/expenses/edit-expense";

import InventoryPage from "./pages/inventory/inventory-page";
import AddInventory from "./pages/inventory/add-inventory";
import EditInventory from "./pages/inventory/edit-inventory";
export default () => (
    
    <BrowserRouter>
        <div>
            <Route exact path = "/" render={() => <LandingPage  />} /> 
            <Route exact path = "/login" component = {LoginPage} />
            <Route exact path = "/signup" component = {SignupPage} />
            <Route exact path = "/home" component = {HomePage} />

            <Route exact path = "/add-expense" component = {AddExpenses} />
            <Route exact path = "/expenses" render = {() => <ExpensesPage/> }/>
            <Route exact path = "/edit-expense" render = {() => <EditExpenses/> }/>

            <Route exact path = "/inventory" render = {() => <InventoryPage/> }/>
            <Route exact path = "/add-inventory" component = {AddInventory} />
            <Route exact path = "/edit-inventory" component = {EditInventory} />
        </div>

    </BrowserRouter>
)