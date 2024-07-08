import Navbar from '../Navbar';
interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const d = new Date();
  let year = d.getFullYear();
  return (
    <div className="container mx-auto p-4 min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto p-4">{children}</main>
      <footer className="bottom-0 text-center p-4 fix">
        &copy; {year} Chandra Perdiansyah
      </footer>
    </div>
  );
};

export default Layout;
