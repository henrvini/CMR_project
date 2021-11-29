import React from "react";
import { Switch, Route } from "react-router-dom";

import User from "../pages/admin/user/index";
import UserRegister from "../pages/admin/user/userRegister";
import UserUpdate from "../pages/admin/user/userUpdate";

import Company from "../pages/admin/company/index";
import CompanyRegister from "../pages/admin/company/companyRegister";
import CompanyUpdate from "../pages/admin/company/companyUpdate";

import Course from "../pages/admin/courses/index";
import CourseRegister from "../pages/admin/courses/coursesRegister";
import CourseUpdate from "../pages/admin/courses/coursesUpdate";

import Seller from "../pages/admin/seller/index";
import SellerRegister from "../pages/admin/seller/sellerRegister";
import SellerUpdate from "../pages/admin/seller/sellerUpdate";

import Calendar from "../pages/admin/calendar/index";
import CalendarRegister from "../pages/admin/calendar/calendarRegister";
import CalendarUpdate from "../pages/admin/calendar/calendarUpdate";
import CalendarList from "../pages/admin/calendar/calendarList";

import Home from "../pages/admin/home/home";
import Dashboard from "../pages/admin/dashboard/index";
import Login from "../pages/admin/login/index";

import PrivateRoute from "../services/wAuth";

export default function Routes() {
    return (
        <Switch>
            {/* CLIENT ROUTE */}
            <Route exact path="/" component={Home} />

            {/* ADMIN ROUTE */}
            <Route exact path="/admin/login" component={Login} />
            <PrivateRoute exact path="/admin" component={Dashboard} />

            {/* USER ROUTE */}
            <PrivateRoute exact path="/admin/users" component={User} />
            <PrivateRoute
                exact
                path="/admin/users/register"
                component={UserRegister}
            />
            <PrivateRoute
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
            <PrivateRoute exact path="/admin/calendars" component={Calendar} />
            <PrivateRoute
                exact
                path="/admin/calendars/list"
                component={CalendarList}
            />
            <PrivateRoute
                exact
                path="/admin/calendars/register"
                component={CalendarRegister}
            />
            <PrivateRoute
                exact
                path="/admin/calendars/update/:idCalendar"
                component={CalendarUpdate}
            />
        </Switch>
    );
}
