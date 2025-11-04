import projects from "../content/projects";
import Card from "../components/Card";

function Projects() {
  return (
    <section className="min-h-screen bg-blue-50 px-6 py-12 text-gray-800">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
        My Projects
      </h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {projects.map((project, index) => (
          <Card
            key={index}
            title={project.title}
            image={project.image}
            description={project.description}
          />
        ))}
      </div>
    </section>
  );
}

export default Projects;