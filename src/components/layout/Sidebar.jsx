import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useMenuStore } from "../../services/menu/menuStore";

import { menuByRole } from "../../config/menuByRole";

import { logout as logoutApi } from "../../modules/auth/authService";
import { useAuthStore } from "../../services/auth/authStore";

import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const iconMap = {
    home: "🏠",
    person: "👤",
    rocket: "🚀",
    school: "🎓",
    mail: "✉️",
    logout: "🚪",
  };

  const [expanded, setExpanded] = useState(true);
  const [pinned, setPinned] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

  const role = useAuthStore((state) => state.role);

  const logout = useAuthStore((state) => state.logout);
  const token = useAuthStore((state) => state.token);

  const menuStore = useMenuStore((state) => state.menus ?? []);
  const navigate = useNavigate();

  const menus = role === "VISITANTE" ? menuByRole.VISITANTE : menuStore;

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 1024;

      setIsMobile(mobile);

      if (mobile) {
        setExpanded(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const timer = setTimeout(() => {
      if (!pinned) {
        setExpanded(false);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [pinned, isMobile]);

  const handleMouseEnter = () => {
    if (!pinned) setExpanded(true);
  };

  const handleMouseLeave = () => {
    if (!pinned) setExpanded(false);
  };

  const handleMenuNavigation = () => {
    if (!pinned) {
      setExpanded(false);
    }
  };

  const handleLogout = async () => {
    try {
      if (token) {
        await logoutApi(token);
      }
    } catch (error) {
      console.error("[LOGOUT]", error);
    } finally {
      logout();
      navigate("/");
      useMenuStore.getState().clearMenus();
    }
  };

  if (role !== "VISITANTE" && !menus.length) {
    return (
      <aside className="sidebar">
        <div className="sidebar-header">Cargando menú...</div>
      </aside>
    );
  }

  const showCategories = menus.length > 1;

  return (
    <>
      {/* Chincheta móvil */}
      <button
        className={`mobile-pin ${expanded ? "open" : ""}`}
        onClick={(e) => {
          e.stopPropagation();

          setExpanded((prev) => !prev);
        }}
      >
        📌
      </button>

      <>
        {isMobile && expanded && (
          <div className="sidebar-overlay" onClick={() => setExpanded(false)} />
        )}

        <aside
          className={`
              sidebar
              ${expanded ? "expanded" : "collapsed"}
              ${isMobile ? "mobile" : ""}
            `}
          onMouseEnter={!isMobile ? handleMouseEnter : undefined}
          onMouseLeave={!isMobile ? handleMouseLeave : undefined}
        >
          {/* {isMobile && expanded && (
            <div
              className="sidebar-overlay"
              onClick={() => setExpanded(false)}
            />
          )} */}

          <div className="sidebar-header">
            {expanded && (
              <div className="sidebar-title">
                <span>PORTAFOLIO</span>
              </div>
            )}

            <button
              className={`pin-btn ${pinned ? "active" : ""}`}
              onClick={() => setPinned(!pinned)}
            >
              📌
            </button>
          </div>

          <nav className="sidebar-nav">
            {menus.map((menu) => (
              <div key={menu.id} className="sidebar-section">
                {expanded && showCategories && (
                  <div className="sidebar-section-title">{menu.name}</div>
                )}
                {menu.items.map((item) => (
                  <NavLink
                    key={item.id}
                    to={item.route}
                    onClick={handleMenuNavigation}
                    className={({ isActive }) =>
                      isActive ? "sidebar-link active" : "sidebar-link"
                    }
                  >
                    <span className="sidebar-icon">
                      {iconMap[item.icon] ?? "📄"}
                    </span>

                    {expanded && (
                      <span className="sidebar-text">{item.name}</span>
                    )}
                  </NavLink>
                ))}

                {role !== "VISITANTE" && <div className="sidebar-divider" />}

                {role !== "VISITANTE" && (
                  <button
                    className="sidebar-link sidebar-logout"
                    onClick={handleLogout}
                  >
                    <span className="sidebar-icon">🚪</span>

                    {expanded && <span className="sidebar-text">Cerrar </span>}
                  </button>
                )}
              </div>
            ))}
          </nav>
        </aside>
      </>
    </>
  );
}
