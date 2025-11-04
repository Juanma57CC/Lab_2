import services from "../content/services";
import Card from "../components/Card";

function Services() {
  return (
    <section className="min-h-screen bg-blue-50 px-6 py-12 text-gray-800">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
        My Services
      </h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {services.map((service, index) => (
          <Card
            key={index}
            title={service.title}
            image={service.image}
            description={service.description}
          />
        ))}
      </div>
    </section>
  );
}

export default Services;