import React from 'react'
import { createBrowserRouter } from 'react-router-dom'

import MainLayout from '../Layouts/MainLayout/MainLayout'
import ManageLayout from '../Layouts/ManageLayout/ManageLayout'
import QuestionLayout from '../Layouts/QuestionLayout/QuestionLayout'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import NotFound from '../pages/NotFound'
import List from '../pages/manage/List/List'
import Star from '../pages/manage/Star/Star'
import Trash from '../pages/manage/Trash/Trash'
import Edit from '../pages/question/edit/Index'
import Static from '../pages/question/static/Index'


const router = createBrowserRouter([{
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <Home />
        },
        {
            path: 'login',
            element: <Login />
        },
        {
            path: 'register',
            element: <Register />
        },
        {
            path: 'manage',
            element: <ManageLayout />,
            children: [
                {
                    path: 'list',
                    element: <List />
                },
                {
                    path: 'star',
                    element: <Star />
                },
                {
                    path: 'trash',
                    element: <Trash />
                }
            ]
        },
        {
            path: '*',
            element: <NotFound />
        }
    ]
},
{
    path: 'question',
    element: <QuestionLayout />,
    children: [
        {
            path: 'edit/:id',
            element: <Edit />
        },
        {
            path: 'static/:id',
            element: <Static />
        }
    ]
}])


export default router