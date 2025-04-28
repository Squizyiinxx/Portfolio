interface EmailTemplateProps {
  name: string;
  email: string;
  message: string;
}

export default function EmailTemplate({
  name,
  email,
  message,
}: EmailTemplateProps) {  
  return (
    <section
      style={{
        fontFamily: "Arial, sans-serif",
        color: "#333",
        padding: "24px",
      }}
      aria-label="New message notification"
    >
      <header>
        <h1 style={{ color: "#52796F" }}>📬 New Message from Portfolio</h1>
      </header>
      <p>
        <strong>From:</strong> {name} ({email})
      </p>
      <p>
        <strong>Message:</strong>
      </p>
      <blockquote
        style={{
          borderLeft: "4px solid #84A98C",
          margin: "12px 0",
          paddingLeft: "16px",
          fontStyle: "italic",
          color: "#555",
        }}
        aria-label="Message content"
      >
        {message}
      </blockquote>
      <footer>
        <p style={{ marginTop: "32px", fontSize: "12px", color: "#999" }}>
          This message was sent via your portfolio contact form.
        </p>
      </footer>
    </section>
  );
}
