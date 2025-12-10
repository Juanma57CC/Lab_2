import { Link } from "react-router-dom";

function Home() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-blue-100 text-gray-800 px-6 text-center">
      {/* Welcome */}
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        Welcome to Juan R. Portfolio
      </h1>

      {/* Highlights */}
      <p className="max-w-2xl text-lg md:text-xl mb-8">
        Driving business results through efficiency<br />Strategic Workforce Planning Expert<br />Business administrator
      <br /><br /> CI/DC deployment and testing of new branch
      </p>

      {/* Shortcuts */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          to="/about"
          className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md 
                     hover:bg-blue-600 transition duration-200"
        >
          About Me
        </Link>

        <Link
          to="/contact"
          className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg shadow-md 
                     hover:bg-gray-300 transition duration-200"
        >
          Contact Me
        </Link>
      </div>
    </section>
  );
}

export default Home;