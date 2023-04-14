import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./components/Root/Root";
import Home, {loader as homeLoader} from "./components/Home/Home";
import BookDetail, {loader as bookDetailLoader} from "./components/BookDetail/BookDetail";
import CartProvider from "./CartProvider";
import Cart from "./components/Cart/Cart";
import OrderConfirmed from "./components/OrderConfirmed/OrderConfirmed";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
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
