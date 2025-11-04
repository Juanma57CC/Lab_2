function About() {
  return (
    <section className="min-h-screen bg-blue-50 flex flex-col items-center justify-center px-6 py-12 text-gray-800">
      {/* My Name */}
      <h1 className="text-3xl md:text-4xl font-bold mb-6">Juan Ramirez</h1>

      {/* Personal Photo */}
      <img
        src="/PortafolioPhoto.jpg"
        alt="Profile"
        className="w-40 h-40 rounded-full object-cover mb-6 shadow-lg"
      />

      {/* Description */}
      <h2 className="text-3xl md:text-2xl font-bold mb-4">Workforce Manager</h2>
      <p className="max-w-xl text-center text-lg leading-relaxed mb-8">
        Dynamic workforce management leader with proven success in optimizing staffing, boosting efficiency, and exceeding customer service goals. 5+ years of experience in real-time monitoring, scheduling optimization, forecasting, and workforce capacity planning. Adept at leading teams, implementing process improvements, and developing initiatives to maximize productivity. Excel at problem-solving and coordinating workforce management teams in fast-paced environments.
      </p>

      {/* Open Resume */}
      <a
        href="/resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
      >
        View My Resume
      </a>
    </section>
  );
}

export default About;