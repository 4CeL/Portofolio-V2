export default function PageHeading({ label, title, children }) {
  return (
    <header className="page-head reveal" style={{ "--i": 0 }}>
      <p className="label">{label}</p>
      <h1 className="display display--page">{title}</h1>
      {children}
    </header>
  );
}
