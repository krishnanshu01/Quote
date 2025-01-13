import Login from "./component/Login";
import Profile from "./component/Profile";
import Signup from "./component/Signup";
import CreateQuote from "./component/CreateQuote";
import Home from "./component/Home";
import OtherProfile from "./component/OtherProfile";
import NotFound from "./component/NotFound";

export const routes = [
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/create", element: <CreateQuote /> },
  { path: "/profile", element: <Profile /> },
  { path: "/profile/:userid", element: <OtherProfile /> },
  { path: "*", element: <NotFound /> },
];
