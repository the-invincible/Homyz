import { Suspense, useState } from "react";
import "./App.css";
import Website  from "./pages/Website";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import { ReactQueryDevtools } from "react-query/devtools"
import "react-toastify/dist/ReactToastify.css";
import Property from "./pages/Property/Property";
import Properties from "./pages/Properties/Properties";
import UserDetailContext from "./context/UserDetails.js"
import Bookings from "./pages/Bookings/Bookings.jsx";
import Favourites from "./pages/Favourites/Favourites.jsx";

function App() {
  
  const queryClient = new QueryClient();

  const [ userDetails, setUserDetails ] = useState({
    favourites: [],
    bookings: [],
    token: null,
  });

  return (
    <UserDetailContext.Provider value={{userDetails, setUserDetails}}>
     <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Website />} />
              <Route path="/properties">
                <Route index element={<Properties />} />
                <Route path=":propertyId" element={<Property />} />
              </Route>
              <Route path="/bookings" element={<Bookings />} />
              <Route path="/favourites" element={<Favourites />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
      <ToastContainer />
      {process.env.NODE_ENV === "development" && 
        <ReactQueryDevtools initialIsOpen={false} />
      }
     </QueryClientProvider>
    </UserDetailContext.Provider>
  );
}

export default App;