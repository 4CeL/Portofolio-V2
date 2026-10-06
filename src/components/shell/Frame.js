import { ViewTransition } from "react";
import Header from "./Header";
import SideNav from "./SideNav";
import StatusBar from "./StatusBar";
import KeyboardNav from "./KeyboardNav";
import Loader from "@/components/effects/Loader";
import DotField from "@/components/effects/DotField";
import TargetCursor from "@/components/effects/TargetCursor";

// Layout shell: backdrop -> frame (header, side-nav, stage, status bar). See DESIGN.md section 4.
export default function Frame({ children }) {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Loader />
      <div className="backdrop" aria-hidden="true">
        <DotField />
      </div>
      <div className="frame">
        <Header />
        <div className="frame-body">
          <SideNav />
          {/* Page transition: only the stage animates (class "page-swap", styles in shell.css).
              Snapshotting the stage itself keeps the animation clipped to the stage box,
              so long pages never slide over the header or status bar. */}
          <ViewTransition update="page-swap" default="none">
            <main id="main" className="stage" tabIndex={-1}>
              {children}
            </main>
          </ViewTransition>
          <StatusBar />
        </div>
      </div>
      <TargetCursor />
      <KeyboardNav />
    </>
  );
}
