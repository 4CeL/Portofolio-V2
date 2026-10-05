// Remounts on every navigation, so each scene replays its .reveal entrance.
export default function Template({ children }) {
  return <div className="scene">{children}</div>;
}
