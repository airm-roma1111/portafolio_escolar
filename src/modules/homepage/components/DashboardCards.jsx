import { useMenuStore } from "../../../services/menu/menuStore";

export default function DashboardCards() {
  const menus = useMenuStore((state) => state.menus);

  const cards = menus.flatMap((menu) => menu.items);

  return (
    <div className="dashboard-grid">
      {cards.map((card) => (
        <a key={card.id} href={card.route} className="dashboard-card">
          <h3>{card.name}</h3>
        </a>
      ))}
    </div>
  );
}
