// Componente para el contenido del sidebar
const SidebarContent = ({ onItemClick }) => {
  const menuItems = [
    { icon: '📊', label: 'Dashboard', href: '/dashboard' },
    { icon: '📝', label: 'Tareas', href: '/tasks' },
    { icon: '📅', label: 'Calendario', href: '/calendar' },
    { icon: '📢', label: 'Anuncios', href: '/announcements' },
    { icon: '👤', label: 'Perfil', href: '/profile' },
    { icon: '⚙️', label: 'Configuración', href: '/settings' },
  ];

  return (
    <div className="space-y-2">
      {menuItems.map((item, index) => (
        <a
          key={index}
          href={item.href}
          onClick={onItemClick}
          className="nav-item w-full text-left"
        >
          <span className="text-xl mr-3">{item.icon}</span>
          <span>{item.label}</span>
        </a>
      ))}
    </div>
  );
};