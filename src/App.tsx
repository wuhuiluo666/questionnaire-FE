import React from 'react';
import { RouterProvider } from 'react-router-dom';
import 'antd/dist/antd.css'
import router from './router/index'

function App() {
  return (
    <RouterProvider router={router}></RouterProvider>
  );
}

export default App;
