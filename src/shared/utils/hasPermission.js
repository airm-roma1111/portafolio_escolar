export function hasPermission(menus, route) {
  return menus.some((menu) => menu.items.some((item) => item.route === route));
}
