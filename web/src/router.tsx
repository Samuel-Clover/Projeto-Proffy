import React from 'react';
import {BrowserRouter, Route, Router} from 'react-router-dom';
import landing from './pages/Landing';
import TeacherList from './pages/teatcherList';
import TeacherForm from './pages/teacherForm';
function Routers () {
    return (
        <BrowserRouter>
        <Route path="/" exact component={landing}/>
        <Route path="/study" component={TeacherList}/>
        <Route path="/give-classes" component={TeacherForm}/>
        </BrowserRouter>

    )
}

export default Routers;