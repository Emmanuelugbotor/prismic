import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { routeData } from "./service/routes";

export default function App() {

  return (
    <>
      <Routes>
        {routeData.map(({ path, component: Component }, index) => {
          return (
            <Route
              path={path}
              key={index}
              element={
                <Suspense fallback={<div>loading...</div>}>
                  <Component />
                </Suspense>
              }
            />
          );
        })}
      </Routes>
    </>
  );
}