const SidebarLayout = ({
  sidebar,
  children
}) => {

  return (
    <div className="sidebar-layout">

      <aside className="sidebar">
        {sidebar}
      </aside>

      <main className="content">
        {children}
      </main>

    </div>
  );
};

export default SidebarLayout;