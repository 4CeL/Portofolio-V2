// "SM" monogram built from straight strokes. Same geometry as app/icon.svg.
export default function Logo(props) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false" {...props}>
      <rect x="1" y="1" width="62" height="62" fill="none" stroke="currentColor" strokeWidth="2" />
      <g fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="square" strokeLinejoin="miter">
        <polyline points="27,17 14,17 14,32 25,32 25,47 12,47" />
        <polyline points="35,47 35,17 43.5,31 52,17 52,47" />
      </g>
    </svg>
  );
}
