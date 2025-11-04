import { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you! Your message has been recorded.");
  };

  return (
    <section className="min-h-screen bg-blue-50 px-6 py-12 text-gray-800">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
        Contact Me
      </h1>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-lg p-6 flex flex-col space-y-4"
        >
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-2"
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-2"
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Contact Number"
            value={formData.phone}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-2"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-2"
            required
          />
          <textarea
            name="message"
            placeholder="Message"
            value={formData.message}
            onChange={handleChange}
            rows="4"
            className="border border-gray-300 rounded-lg px-4 py-2"
            required
          ></textarea>

          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
          >
            Send Message
          </button>
        </form>

        {/* Business card */}
        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col justify-center">
          <h2 className="text-2xl font-semibold mb-4">My Contact Info</h2>
          <p><strong>Email:</strong> jmanrc13@gmail.com</p>
          <p><strong>Phone:</strong> +1 (289) 400-6275</p>
          <p><strong>Location:</strong> Toronto, Canada</p>
        </div>
      </div>
    </section>
  );
}

export default Contact;