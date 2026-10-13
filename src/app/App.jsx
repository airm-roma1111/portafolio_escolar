import { RouterProvider } from "react-router-dom";
import HackerBackground from "../components/particles/HackerBackground";
import { router } from "../router";

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <HackerBackground />
      {/* <HomePage /> */}
    </>
  );
}
