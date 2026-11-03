const menus = useMenuStore((state) => state.menus);

if (!hasPermission(menus, "/admin")) {
  return <h1>Acceso denegado</h1>;
}
