import React from "react";
import { Switch, Route } from "react-router-dom";

import User from "../pages/admin/user/index";
import UserRegister from "../pages/admin/user/userRegister";
import UserUpdate from "../pages/admin/user/userUpdate";
// import UserDetails from "../components/crud/user/User";

import Company from "../pages/admin/company/index";
import CompanyRegister from "../pages/admin/company/companyRegister";
import CompanyUpdate from "../pages/admin/company/companyUpdate";
// import Company from "../components/crud/company/Company";

import Course from "../pages/admin/courses/index";
import CourseRegister from "../pages/admin/courses/coursesRegister";
import CourseUpdate from "../pages/admin/courses/coursesUpdate";

import Seller from "../pages/admin/seller/index";
import SellerRegister from "../pages/admin/seller/sellerRegister";
import SellerUpdate from "../pages/admin/seller/sellerUpdate";

import Calendar from "../pages/admin/calendar/index";
import CalendarRegister from "../pages/admin/calendar/calendarRegister";
import CalendarUpdate from "../pages/admin/calendar/calendarUpdate";

import Home from "../pages/client/home/Home";
import Dashboard from "../pages/admin/dashboard/index";

export default function Routes() {
    return (
        <Switch>
            {/* <Route exact path="/" component={Home} />
            <Route path="/users" component={User} />
            <Route path="/company" component={Company} />
            <Route path="/calendar" component={Calendar} />
            <Redirect from="*" to="/" /> */}

            {/* CLIENT ROUTE */}
            <Route exact path="/" component={Home} />

            {/* ADMIN ROUTE */}
            <Route exact path="/admin" component={Dashboard} />

            {/* USER ROUTE */}
            <Route exact path="/admin/users" component={User} />
            <Route
                exact
                path="/admin/users/register"
                component={UserRegister}
            />
            <Route
                exact
                path="/admin/users/update/:idUser"
                component={UserUpdate}
            />

            {/* COMPANY ROUTE */}
            <Route exact path="/admin/companies" component={Company} />
            <Route
                exact
                path="/admin/companies/register"
                component={CompanyRegister}
            />
            <Route
                exact
                path="/admin/companies/update/:idCompany"
                component={CompanyUpdate}
            />

            {/* SELLER ROUTE */}
            <Route exact path="/admin/sellers" component={Seller} />
            <Route
                exact
                path="/admin/Seller/register"
                component={SellerRegister}
            />
            <Route
                exact
                path="/admin/Seller/update/:idSeller"
                component={SellerUpdate}
            />

            {/* COURSE ROUTE */}
            <Route exact path="/admin/courses" component={Course} />
            <Route
                exact
                path="/admin/courses/register"
                component={CourseRegister}
            />
            <Route
                exact
                path="/admin/courses/update/:idCourse"
                component={CourseUpdate}
            />

            {/* CALENDAR ROUTE */}
            <Route exact path="/admin/calendar" component={Calendar} />
            <Route
                exact
                path="/admin/calendar/register"
                component={CalendarRegister}
            />
            <Route
                exact
                path="/admin/calendar/update/:idCalendar"
                component={CalendarUpdate}
            />
        </Switch>
    );
}
