import { createBrowserRouter } from "react-router-dom";
import React, { Suspense, lazy } from "react";
import Layout from "@/components/organisms/Layout";

const Feedback = lazy(() => import("@/components/pages/Feedback"));
const Roadmap = lazy(() => import("@/components/pages/Roadmap"));
const Changelog = lazy(() => import("@/components/pages/Changelog"));
const NotFound = lazy(() => import("@/components/pages/NotFound"));

const mainRoutes = [
  {
    path: "",
    index: true,
    element: (
      <Suspense fallback={<div>Loading.....</div>}>
        <Feedback />
      </Suspense>
    )
  },
  {
    path: "feedback",
    element: (
      <Suspense fallback={<div>Loading.....</div>}>
        <Feedback />
      </Suspense>
    )
  },
  {
    path: "feedback/:id",
    element: (
      <Suspense fallback={<div>Loading.....</div>}>
        {React.createElement(lazy(() => import("@/components/pages/FeedbackDetail")))}
      </Suspense>
    )
  },
  {
    path: "roadmap",
    element: (
      <Suspense fallback={<div>Loading.....</div>}>
        <Roadmap />
      </Suspense>
    )
  },
  {
    path: "changelog",
    element: (
      <Suspense fallback={<div>Loading.....</div>}>
        <Changelog />
      </Suspense>
    )
  },
  {
    path: "*",
    element: (
      <Suspense fallback={<div>Loading.....</div>}>
        <NotFound />
      </Suspense>
    )
  }
]

const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [...mainRoutes]
  }
]

export const router = createBrowserRouter(routes)