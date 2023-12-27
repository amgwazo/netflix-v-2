import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import MainLayout from "./Layout/MainLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import MovieComponent from "./components/crud/MovieComponent";
import Videos from "./pages/Videos";
import Search from "./components/search/search";




const router = createBrowserRouter(

  


  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/movie" element={<MovieComponent />} />

      <Route path="/videos" element={<Videos />} />
      <Route path="/search" element={<Search />} />
    </Route>
  )
);

export default router

