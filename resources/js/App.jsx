import './bootstrap';

import { Component } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Routes, Route, BrowserRouter } from "react-router-dom"; // ✅ Import these
import Create_model from './Forms/Bill/Create';
import Dashboard from './Forms/Dashboard';
import Bill_My from './Forms/Bill/Bill';
import NotFound from './Forms/404';
// index.js
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Sales_add_form from './Forms/Bill/Sales-add';
import Sales_my from './Forms/Bill/Sales-my';
import Sales_editform from './Forms/Bill/Sales-edit';
import Index_page from './Forms/Index-page';
import Stock_my from './Forms/Bill/Stock-my';
import Stock_add_form from './Forms/Bill/Stock-add';
import Stock_editform from './Forms/Bill/Stock.edit';
import Login from './Forms/Login';
import Login_with_otp from './Forms/Login-with-otp';
import Confirm_otp from './Forms/Cofirm_Otp';
import axios from 'axios'; // ✅ Import axios globally

var base_url = "http://127.0.0.1:8000";
class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Routes>
                     <Route path="/login" element={<Login />} />
                    <Route path='/Login-with-otp' element={<Login_with_otp base_url={base_url} />} />
                    <Route path='/Confirm-otp' element={<Confirm_otp base_url={base_url} />} />

                    <Route element={<Dashboard base_url={base_url} />}>
                        <Route path="/create" element={< Create_model />} />
                        <Route path='/Bill' element={<Bill_My />} />
                        <Route path='/dashboard' element={<Index_page />} />
                        <Route path='/sales-my' element={<Sales_my base_url={base_url} />} />
                        <Route path='/sales-add' element={< Sales_add_form base_url={base_url} />} />
                        <Route path='/sales-edit/:id' element={< Sales_editform base_url={base_url} />} />
                        <Route path='/stock-my' element={<Stock_my base_url={base_url} />} />
                        <Route path='/stock-add' element={<Stock_add_form base_url={base_url} />} />
                        <Route path='/stock-edit/:id' element={<Stock_editform base_url={base_url} />} />

                    </Route>
                    <Route path="*" element={<NotFound />} />

                   
                </Routes>
            </BrowserRouter>
        );
    }
}
const root = createRoot(document.getElementById('app'));
root.render(<App />)