import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./_root/RootLayout.tsx";
import { SigninForm, SignupForm, AuthLayout } from "./_auth/import/ImportPages.tsx";
import {Home,Explore,AllUsers,CreatePost,Saved,Profile,UpdatePost,CustoumProfile,PostDetails} from "./_root/import/index.tsx"
import { Toaster } from "./@/components/ui/toaster.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./TanstackQuery/queryMutation.ts";




const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        //Private
        element: <RootLayout />,
        children: [
          {
            path: "/",
            element: <Home />,
          },
          {
            path: "/explore",
            element: <Explore />,
          },
          {
            path: "/all-users",
            element: <AllUsers />,
          },
          {
            path: "/saved",
            element: <Saved />,
          },
          {
            path:'/post-details/:id',
            element:<PostDetails/>
          },
          {
            path: "/create-post",
            element: <CreatePost />,
          },
          {
            element:<Profile/>,
            children:[{
              path:"/profile/:id",
              element:<CustoumProfile/>
            }]
          },
          {
            path:'/update-post/:id',
            element:<UpdatePost/>
          }
        ],
      },
      {
        //Public
        element: <AuthLayout />,
        children: [
          {
            path: "/sign-in",
            element: <SigninForm />,
          },
          {
            path: "/sign-up",
            element: <SignupForm />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
    <Toaster />
  </React.StrictMode>,
);
