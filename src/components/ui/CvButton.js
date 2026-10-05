"use client";

import { useRef } from "react";
import { ArrowUpRight, Close, Download } from "./Icons";

// "Open CV" button + native <dialog> preview (Esc and focus trapping come from the browser).
export default function CvButton({ href, name }) {
  const dialogRef = useRef(null);

  return (
    <>
      <button type="button" className="btn" onClick={() => dialogRef.current?.showModal()}>
        Open CV <ArrowUpRight />
      </button>
      <dialog
        ref={dialogRef}
        className="cv-modal"
        aria-labelledby="cv-title"
        onClick={(event) => {
          // Clicking the backdrop (the dialog element itself) closes it.
          if (event.target === event.currentTarget) event.currentTarget.close();
        }}
      >
        <div className="cv-modal-head">
          <span id="cv-title" className="label">
            CV / {name}
          </span>
          <div className="cv-modal-actions">
            <a className="btn btn--sm" href={href} download>
              Download <Download />
            </a>
            <button type="button" className="btn btn--sm" onClick={() => dialogRef.current?.close()}>
              Close <Close />
            </button>
          </div>
        </div>
        <iframe src={`${href}#view=FitH`} title={`CV of ${name}`} loading="lazy" />
      </dialog>
    </>
  );
}
