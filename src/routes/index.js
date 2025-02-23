import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import ChatDialog from "../components/ChatDialog/ChatDialog";
import App from "../App";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/chat",
    element: <ChatDialog />,
  },
  {
    path: "*",
    element: <div>404 Not Found</div>,
  },
]);

const Routes = () => {
  return <RouterProvider router={router} />;
};

export default Routes;
