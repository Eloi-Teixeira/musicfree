import { Copyright, History, LayoutGrid, Music } from "lucide-react";
import { NavLink } from "react-router-dom";

function AsideMenu() {
    const menuItems = [
    { id: '/', label: 'Baixar Música', icon: <LayoutGrid size={20} className="icon" /> },
    { id: 'history', label: 'Histórico', icon: <History size={20} className="icon" /> },
  ];
  return (
    <aside id="aside-menu">
      <header>
        <div className="icon">
               <Music size={24} strokeWidth={2.5} />
        </div>
        <h2>
          Musics<span>Free</span>
        </h2>
      </header>
      <nav>
        <ul>
          {menuItems.map((item) => (
            <li key={item.id}>
              <NavLink to={item.id} className={""}>
                {item.icon}
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <footer>
        
        <span>v1.0</span>
        <span><Copyright size={16} />2025</span>
        
      </footer>
    </aside>
  );
}

export default AsideMenu;
