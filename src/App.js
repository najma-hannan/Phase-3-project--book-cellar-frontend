import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root, {loader as rootLoader} from "./components/Root/Root";
import Home, {loader as homeLoader} from "./components/Home/Home";
import BookDetail, {loader as bookDetailLoader} from "./components/BookDetail/BookDetail";
import CartProvider from "./CartProvider";
import Cart from "./components/Cart/Cart";
import OrderConfirmed from "./components/OrderConfirmed/OrderConfirmed";
import Login, {action as loginAction} from "./components/Login/Login";

const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    element: <Root />,
    loader: rootLoader,
    children: [
      {
        index: true,
        element: <Home/>,
        loader: homeLoader,
      },
      {
        path: "books/:bookId",
        element: <BookDetail/>,
        loader: bookDetailLoader,
      },
      {
        path: "cart",
        element: <Cart/>,
      },
      {
        path: "order-confirmed",
        element: <OrderConfirmed/>,
      },
      {
        path: "login",
        element: <Login/>,
        action: loginAction,
      }
    ]
  }
])

function App() {
  return (
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  );
}

export default App;
