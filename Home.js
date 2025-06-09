
import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async () => {
    try {
      const res = await fetch("https://api.convertkit.com/v3/forms/8161423/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          api_key: "Dpjzr5PjVE2TBHeIbQuIKQ",
          email
        }),
      });
      if (res.ok) setSubscribed(true);
    } catch (err) {
      console.error("Subscribe error:", err);
    }
  };

  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>JetSettingPro.com</h1>
      <p>Luxury travel tips, gear, and destinations weekly.</p>

      <div style={{ marginTop: "1.5rem" }}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: "0.5rem", marginRight: "0.5rem" }}
        />
        <button onClick={handleSubscribe} disabled={subscribed}>
          {subscribed ? "Subscribed!" : "Subscribe"}
        </button>
      </div>
    </main>
  );
}
