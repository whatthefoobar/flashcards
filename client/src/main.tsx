import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Demo from "./pages/Demo.tsx";
import Home from "./pages/Home.tsx";
import Register from "./pages/Register.tsx";
import MyProfile from "./pages/MyProfile.tsx";
import { Provider } from "react-redux";
import { store } from "./store.ts";
import SetPage from "./pages/SetPage.tsx";
import Login from "./pages/Login.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/demo" element={<Demo />} />
      <Route path="/myprofile" element={<MyProfile />} />
      <Route path="/sets/:id" element={<SetPage />} />
    </Route>
  )
);

createRoot(document.getElementById("root")! as HTMLElement).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
