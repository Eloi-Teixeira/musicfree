import { Music } from "lucide-react";
import { NavLink } from "react-router-dom";

function AsideMenu() {
  return (
    <aside id="aside-menu">
      <header>
        <div className="icon">
               <Music size={24} strokeWidth={2.5} />
        </div>
        <h2>
          Musics <span>Free</span>
        </h2>
      </header>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Baixar Musica</NavLink>
          </li>
          <li>
            <NavLink to="/historico" className={""}>
              Historico
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default AsideMenu;
