const Header = () => (
  <nav className="bg-gradient-to-tr from-primary to-primary-light bg-primary-light p-6 flex justify-between items-center">
    <div className="text-slate-100">
      <h1 className="font-bold text-2xl">Hamro Chunaab</h1>
      <p className="font-medium">Digital Election Application</p>
    </div>
    <div className="flex gap-x-2 text-white text-sm font-medium">
      <a className="block px-6 py-2 border-2 border-white" href="/register">
        Register
      </a>
      <a className="block px-6 py-2 border-2 border-white" href="/login">
        Login
      </a>
    </div>
  </nav>
);

export default Header;
