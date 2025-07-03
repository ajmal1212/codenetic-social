
import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import { Layout } from "./components/Layout";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Analytics = lazy(() => import("./pages/Analytics"));
const PostComposer = lazy(() => import("./pages/PostComposer"));
const Accounts = lazy(() => import("./pages/Accounts"));
const ContentCalendar = lazy(() => import("./pages/ContentCalendar"));
const Profile = lazy(() => import("./pages/Profile"));
const Instagram = lazy(() => import("./pages/Instagram"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth/instagram/callback" element={<Index />} />
          <Route element={<Layout />}>
            <Route path="/dashboard" element={
              <Suspense fallback={<div>Loading...</div>}>
                <Dashboard />
              </Suspense>
            } />
            <Route path="/analytics" element={
              <Suspense fallback={<div>Loading...</div>}>
                <Analytics />
              </Suspense>
            } />
            <Route path="/create" element={
              <Suspense fallback={<div>Loading...</div>}>
                <PostComposer />
              </Suspense>
            } />
            <Route path="/accounts" element={
              <Suspense fallback={<div>Loading...</div>}>
                <Accounts />
              </Suspense>
            } />
            <Route path="/calendar" element={
              <Suspense fallback={<div>Loading...</div>}>
                <ContentCalendar />
              </Suspense>
            } />
            <Route path="/profile" element={
              <Suspense fallback={<div>Loading...</div>}>
                <Profile />
              </Suspense>
            } />
            <Route path="/instagram" element={
              <Suspense fallback={<div>Loading...</div>}>
                <Instagram />
              </Suspense>
            } />
          </Route>
          <Route path="*" element={
            <Suspense fallback={<div>Loading...</div>}>
              <NotFound />
            </Suspense>
          } />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
