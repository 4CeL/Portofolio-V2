import Link from "next/link";
import { ArrowRight } from "@/components/ui/Icons";

export const metadata = {
  title: "404",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <div className="notfound">
      <figure className="api-block reveal">
        <figcaption className="api-head">
          <span>
            <strong>GET</strong> this route
          </span>
          <span>404 Not Found</span>
        </figcaption>
        <pre className="api-body">{`{
  "error": "route_not_found",
  "hint": "check the URL or go back home"
}`}</pre>
      </figure>
      <h1 className="display display--page reveal" style={{ "--i": 1 }}>
        Nothing here.
      </h1>
      <Link href="/" className="btn btn--solid reveal" style={{ "--i": 2 }}>
        Back home <ArrowRight />
      </Link>
    </div>
  );
}
