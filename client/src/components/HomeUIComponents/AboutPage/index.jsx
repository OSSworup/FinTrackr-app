import Header from "../Header";
import img from '../../../assets/about.svg'
import Footer from "../Footer";

export default function AboutPage() {
  return (
    <div className="bg-[#F5F5F5] text-gray-800 max-w-screen-xl mx-auto p-6 pt-24 font-['Roboto']">
      <Header />
      <h1 className="text-4xl font-bold text-[#2E7D32] text-center mb-6 tracking-wide">
        About Me
      </h1>
      <p className="text-center max-w-2xl mx-auto mb-10 text-lg leading-relaxed">
        <span className="font-semibold">Hey, I’m Omm Subham Sworup Ojha</span> — a Computer Science graduate and full-stack web developer in the making.  
        <br />
        This Finance Planner was built from scratch using the <span className="font-medium text-[#2E7D32]">MERN stack</span> as part of my personal roadmap to becoming job-ready.
        <br /><br />
        It’s more than just a project — it’s proof that I can turn ideas into clean, functional, and scalable code.
      </p>

      <div className="flex justify-center mb-10">
        <img
          src={img}
          alt="Developer Illustration"
          className="w-full max-w-md drop-shadow-md"
        />
      </div>

      <div className="grid md:grid-cols-3 gap-6 text-center mb-10">
        <div className="px-4">
          <h2 className="text-xl font-bold text-[#2E7D32] mb-2 uppercase tracking-wide">Why I Built This</h2>
          <p className="text-gray-700 leading-relaxed text-base">
            To level up my backend skills, understand real-world auth, and automate logic with cron jobs — no tutorials, no shortcuts.
          </p>
        </div>
        <div className="px-4">
          <h2 className="text-xl font-bold text-[#2E7D32] mb-2 uppercase tracking-wide">Stack + Tools</h2>
          <p className="text-gray-700 leading-relaxed text-base">
            MERN, Tailwind, React Query, node-cron — with help from AI like ChatGPT and Grok for debugging and brainstorming.
          </p>
        </div>
        <div className="px-4">
          <h2 className="text-xl font-bold text-[#2E7D32] mb-2 uppercase tracking-wide">What’s Next</h2>
          <p className="text-gray-700 leading-relaxed text-base">
            I’m actively seeking <span className="font-medium text-[#2E7D32]">junior developer roles</span> — ready to build, learn, and grow in a team environment.
          </p>
        </div>
      </div>

      <div className="text-center mt-10">
        <a
          href="https://github.com/OSSworup/mern-finance-planner"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#2E7D32] text-white px-6 py-2 rounded shadow-md hover:bg-green-800 transition duration-200"
        >
          🚀 View Source Code
        </a>
      </div>
      <Footer />
    </div>
  );
}

