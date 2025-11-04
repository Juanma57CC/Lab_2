import education from "../content/education";
import RowSpace from "../components/RowSpace";

function Education() {
  return (
    <section className="min-h-screen bg-blue-50 px-6 py-12 text-gray-800">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
        Education & Professional Qualifications
      </h1>

      <div className="max-w-3xl mx-auto">
        {education.map((item, index) => (
          <RowSpace
            key={index}
            institution={item.institution}
            degree={item.degree}
            year={item.year}
            details={item.details}
          />
        ))}
      </div>
    </section>
  );
}

export default Education;