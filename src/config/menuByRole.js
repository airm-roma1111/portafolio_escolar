export const menuByRole = {
  VISITANTE: [
    {
      id: "portafolio",
      name: "Portafolio",
      items: [
        {
          id: "inicio",
          name: "Inicio",
          route: "/",
          icon: "home",
        },
      ],
    },
  ],

  INVITADO: [
    {
      id: "general",
      name: "General",
      items: [
        {
          id: "inicio",
          name: "Inicio",
          route: "/",
          icon: "🏠",
        },
        {
          id: "sobre-mi",
          name: "Sobre Mi",
          route: "/sobre-mi",
          icon: "👤",
        },
      ],
    },
  ],
};
