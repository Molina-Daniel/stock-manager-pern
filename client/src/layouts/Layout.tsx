import { Outlet } from "react-router";

export default function Layout() {
  return (
    <>
      <div>From Layout</div>
      <Outlet />
    </>
  );
}
