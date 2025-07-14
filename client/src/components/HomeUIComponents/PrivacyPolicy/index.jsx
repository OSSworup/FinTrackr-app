import { useNavigate } from "react-router-dom";
import Footer from "../Footer";
import Header from "../Header";

export default function PrivacyPolicy() {
  const navigate=useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F5F5] text-gray-800 font-['Roboto']">
      <Header />

      <main className="flex-grow max-w-screen-xl mx-auto p-6 pt-24">
        <h1 className="text-4xl font-bold text-[#2E7D32] text-center mb-8">Your Privacy Matters</h1>

        <div className="max-w-3xl mx-auto space-y-6">
          <p>
            At Finance Planner, we are committed to protecting your personal information and your right to privacy. 
            This Privacy Policy outlines how we collect, use, and safeguard your information when you use our services.
          </p>

          <div>
            <h2 className="text-[#2E7D32] font-semibold text-xl mb-2">1. Information We Collect</h2>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li><strong>Personal Information:</strong> Name, email address, and other contact details provided during registration.</li>
              <li><strong>Financial Data:</strong> Transaction records, budgets, and spending data you enter into the app.</li>
              <li><strong>Technical Information:</strong> Browser type, IP address, device identifiers, and usage patterns collected via cookies or analytics tools.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-[#2E7D32] font-semibold text-xl mb-2">2. How We Use Your Information</h2>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li>To provide and maintain our financial tracking services.</li>
              <li>To personalize your dashboard and improve user experience.</li>
              <li>To detect, prevent, and address technical issues or misuse.</li>
              <li>To communicate with you regarding service updates or support requests.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-[#2E7D32] font-semibold text-xl mb-2">3. Data Sharing & Third Parties</h2>
            <p>
              We do not sell, rent, or trade your personal information to third parties. 
              We may share data with trusted service providers (e.g., analytics, hosting) only when necessary for operation and only under strict confidentiality agreements.
            </p>
          </div>

          <div>
            <h2 className="text-[#2E7D32] font-semibold text-xl mb-2">4. Data Security</h2>
            <p>
              We implement industry-standard security measures, including data encryption, secure servers, and access controls to protect your data from unauthorized access, alteration, or destruction.
            </p>
          </div>

          <div>
            <h2 className="text-[#2E7D32] font-semibold text-xl mb-2">5. Your Rights</h2>
            <p>
              You can request access, correction, or deletion of your personal data at any time by contacting us. 
              We will respond within a reasonable timeframe in accordance with applicable laws.
            </p>
          </div>

          <div>
            <h2 className="text-[#2E7D32] font-semibold text-xl mb-2">6. Policy Updates</h2>
            <p>
              We may update this policy from time to time to reflect changes in technology, regulations, or service enhancements. 
              When we do, we will revise the "Last Updated" date below.
            </p>
          </div>

          <p className="text-[#2E7D32] font-medium">Last Updated: July 12, 2025</p>
        </div>

        <div className="text-center mt-10">
          <button onClick={()=>navigate('/dashboard')} className="bg-[#2E7D32] text-white px-6 py-2 rounded hover:bg-green-800">
            Get Started
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
