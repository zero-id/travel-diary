import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import Home from "./pages/Home";
import BookMark from "./pages/Bookmark";
import Profile from "./pages/Profile";
import DetailJourney from "./pages/DetailJourney";
import useSignIn from "./features/auth/hook/useSignIn";
import { useEffect } from "react";
import NewJourney from "./pages/NewJourney";

const App = () => {
  const { checkAuth } = useSignIn();

  useEffect(() => {
    checkAuth();
  }, []);

  const IsLogin = () => {
    if (!localStorage.token) return <Navigate to="/" />;

    return <Outlet />;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<IsLogin />}>
          <Route path="/bookmark" element={<BookMark />} />
          <Route path="/new-journey" element={<NewJourney />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/detail-journey/:id" element={<DetailJourney />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
