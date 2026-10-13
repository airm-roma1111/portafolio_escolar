import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { menuItems } from "./sidebarConfig";

export default function Sidebar() {
  const [expanded, setExpanded] = useState(true);
  const [pinned, setPinned] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

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
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={handleMenuNavigation}
                className={({ isActive }) =>
                  isActive ? "sidebar-link active" : "sidebar-link"
                }
              >
                <span className="sidebar-icon">{item.icon}</span>

                {expanded && <span className="sidebar-text">{item.label}</span>}
              </NavLink>
            ))}
          </nav>
        </aside>
      </>
    </>
  );
}
