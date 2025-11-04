function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-200 py-6 mt-12">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
        <p className="text-sm">
          © {new Date().getFullYear()} Centennial College ® - COMP 229. All Rights Reserved.
        </p>

        <div className="flex space-x-4 mt-4 md:mt-0">
          <a
            href="https://www.linkedin.com/in/juan-manuel-ramirez-cruz-46356715a/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/Juanma57CC"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400 transition"
          >
            GitHub
          </a>
          <a
            href="mailto:jmanrc13@gmail.com"
            className="hover:text-red-400 transition"
          >
            Email Me
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;