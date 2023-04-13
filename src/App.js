import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./components/Root/Root";
import LibraryGallery, {loader as libraryLoader} from "./components/LibraryGallery/LibraryGallery";

const router = createBrowserRouter([
  {
    element: <Root />,
    children: [
      {
        path: "/",
        element: <LibraryGallery/>,
        loader: libraryLoader,
      }
    ]
  }
])

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
