import Footer from "../Footer";
import Header from "../Header";
import { useState } from "react";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (result.success) {
        alert("✅ Thank you! Your message has been sent.");
        e.target.reset();
      } else {
        alert("❌ Something went wrong. Please try again.");
      }
    } catch (err) {
      alert("⚠️ Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-[#F5F5F5] text-gray-800 max-w-screen-xl mx-auto p-6 pt-24 font-['Roboto']">
      <Header />
      <h1 className="text-4xl font-bold text-[#2E7D32] text-center mb-8 tracking-wide">
        Get in Touch
      </h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto grid gap-4 mb-10"
      >
        <input
          type="hidden"
          name="access_key"
          value="f04141bc-0484-46a6-93b9-09094cf2307b"
        />
        <input
          type="hidden"
          name="from_name"
          value="Finance Planner Contact Form"
        />
        <input type="checkbox" name="botcheck" className="hidden" />

        <input
          type="text"
          name="name"
          placeholder="Your Name"
          required
          className="p-3 border border-[#2E7D32] rounded bg-white"
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          required
          className="p-3 border border-[#2E7D32] rounded bg-white"
        />
        <textarea
          name="message"
          placeholder="Your Message"
          rows={5}
          required
          className="p-3 border border-[#2E7D32] rounded bg-white"
        ></textarea>

        <div className="h-captcha" data-captcha="true"></div>

        <button
          type="submit"
          disabled={loading}
          className="bg-[#2E7D32] text-white px-6 py-2 rounded hover:bg-green-800 mx-auto disabled:opacity-60"
        >
          {loading ? "Sending..." : "Send Message"}
        </button>
      </form>

      <div className="grid md:grid-cols-2 text-center gap-6 mb-10">
        <div>
          <a
            href="mailto:ossworupojha@gmail.com"
            className="text-[#2E7D32] font-medium hover:underline"
          >
            📧 ossworupojha@gmail.com
          </a>
        </div>
        <div className="flex justify-center gap-6">
          <a
            href="https://github.com/OSSworup"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#2E7D32] font-medium hover:underline"
          >
            🐙 GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/omm-subham-sworup-ojha-b80144338/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#2E7D32] font-medium hover:underline"
          >
            💼 LinkedIn
          </a>
        </div>
      </div>

      <Footer />
    </div>
  );
}
