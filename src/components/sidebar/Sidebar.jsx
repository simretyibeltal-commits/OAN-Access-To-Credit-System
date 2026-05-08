import {
  ShieldCheck,
} from 'lucide-react';

import './Sidebar.scss';

function Sidebar({ isCollapsed, sections = [], activePageKey, onNavigate }) {
  return (
    <aside
      id="dashboard-sidebar"
      className={`dashboard-sidebar ${isCollapsed ? 'dashboard-sidebar--collapsed' : ''}`}
    >
      <div className="dashboard-sidebar__brand">
        <div className="dashboard-sidebar__brand-icon" aria-hidden="true">
          <ShieldCheck size={18} strokeWidth={2.3} />
        </div>
        <div className="dashboard-sidebar__brand-copy">
          <span className="dashboard-sidebar__brand-title">Open AgriNet</span>
          <span className="dashboard-sidebar__brand-subtitle">Access Credit System</span>
        </div>
      </div>

      <nav className="dashboard-sidebar__nav" aria-label="Dashboard navigation">
        {sections.map((section) => (
          <section key={section.title} className="dashboard-sidebar__section">
            <h2 className="dashboard-sidebar__section-title">{section.title}</h2>
            <div className="dashboard-sidebar__section-list">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = activePageKey === item.key;

                return (
                  <button
                    key={item.label}
                    className="dashboard-sidebar__nav-item"
                    data-active={isActive ? 'true' : 'false'}
                    type="button"
                    aria-label={item.label}
                    aria-current={isActive ? 'page' : undefined}
                    title={item.label}
                    onClick={() => onNavigate?.(item.key)}
                  >
                    <span className="dashboard-sidebar__nav-item-icon" aria-hidden="true">
                      <Icon size={14} strokeWidth={2.3} />
                    </span>
                    <span className="dashboard-sidebar__nav-item-label">{item.label}</span>
                    {item.badge ? (
                      <span className="dashboard-sidebar__nav-badge">{item.badge}</span>
                    ) : null}
                  </button>
                );
              })}
            </div>
          </section>
        ))}
      </nav>

    </aside>
  );
}

export default Sidebar;
