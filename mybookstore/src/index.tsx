import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./assets/styles/bootstrap.custom.css";
import "./assets/styles/index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import HomeScreen from "./screens/HomeScreen";
import { Provider } from "react-redux";
import store from "./store";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import PrivateRoute from "./components/PrivateRoute";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import AdminRoute from "./components/AdminRoute";
import OrderListScreen from "./screens/admin/OrderListScreen";
import UserListScreen from "./screens/admin/UserListScreen";
import UserEditScreen from "./screens/admin/UserEditScreen";
import { HelmetProvider } from "react-helmet-async";
import ForgetPasswordScreen from "./screens/ForgetPasswordScreen";
import AboutUs from "./screens/AboutUs";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import CustomizationForm from "./components/CustomizationForm";
import OurServices from "./components/OurServices";
import HelpSection from "./components/HelpSection";
import PlacedOrder from "./components/placedOrder";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* Public route */}
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="/forgetpassword" element={<ForgetPasswordScreen />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/our-services" element={<OurServices />} />
      <Route path="/help" element={<HelpSection />} />
      {/*is any route make Private take it  here  */}
      <Route path="" element={<PrivateRoute />}>
        <Route path="/customization" element={<CustomizationForm />} />
        <Route path="/placed-order" element={<PlacedOrder />} />
      </Route>

      {/*is any route make Admin take it  here  */}
      <Route path="" element={<AdminRoute />}>
        <Route path="/admin/orderlist" element={<OrderListScreen />} />
        <Route
          path="/admin/orderlist/:pageNumber"
          element={<OrderListScreen />}
        />
        <Route path="/admin/userlist" element={<UserListScreen />} />
        <Route path="/admin/user/:id/edit" element={<UserEditScreen />} />
      </Route>
    </Route>
  )
);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <I18nextProvider i18n={i18n}>
    <React.StrictMode>
      <HelmetProvider>
        <I18nextProvider i18n={i18n}>
          <Provider store={store}>
            <PayPalScriptProvider
              deferLoading={true}
              options={{ clientId: "" }}
            >
              <RouterProvider router={router} />
            </PayPalScriptProvider>
          </Provider>
        </I18nextProvider>
      </HelmetProvider>
    </React.StrictMode>
  </I18nextProvider>
);

reportWebVitals();
