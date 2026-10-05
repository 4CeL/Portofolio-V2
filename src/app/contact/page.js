import { contacts, profile } from "@/content/profile";
import CopyButton from "@/components/ui/CopyButton";
import { ArrowUpRight, socialIcons } from "@/components/ui/Icons";

export const metadata = {
  title: "Contact",
  description: `Get in touch with ${profile.name} by email, WhatsApp, or LinkedIn.`,
};

const words = ["Let's", "build", "something", "reliable."];

export default function ContactPage() {
  return (
    <div className="contact">
      <div className="contact-title">
        <p className="label reveal" style={{ "--i": 0 }}>
          Contact
        </p>
        <h1 className="display contact-heading" aria-label={words.join(" ")}>
          {words.map((word, i) => (
            <span key={word}>
              <span className="word" style={{ "--i": i }} aria-hidden="true">
                {word}
              </span>{" "}
            </span>
          ))}
        </h1>
        <p className="contact-copy reveal" style={{ "--i": 3 }}>
          Open to internship roles and collaboration on backend, data, or automation work. Email is the fastest way
          to reach me.
        </p>
      </div>

      <ul className="panel contact-list reveal" style={{ "--i": 2 }}>
        {contacts.map((item) => {
          const Icon = socialIcons[item.id];
          const content = (
            <>
              <Icon className="contact-icon" />
              <span className="contact-text">
                <span className="label">{item.label}</span>
                <span className="contact-value">{item.value}</span>
              </span>
            </>
          );
          return (
            <li key={item.id} className="contact-row">
              {item.href ? (
                <a
                  className="contact-link"
                  href={item.href}
                  {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  {content}
                  <ArrowUpRight className="contact-arrow" />
                </a>
              ) : (
                <div className="contact-link is-static">{content}</div>
              )}
              {item.copy ? <CopyButton value={item.value} /> : null}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
