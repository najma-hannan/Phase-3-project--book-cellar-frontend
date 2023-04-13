import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./components/Root/Root";
import Home, {loader as libraryLoader} from "./components/Home/Home";
import CartProvider from "./CartProvider";
import Cart from "./components/Cart/Cart";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home/>,
        loader: libraryLoader,
      },
      {
        path: "cart",
        element: <Cart/>,
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
