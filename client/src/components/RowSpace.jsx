function RowSpace({ institution, degree, year, details }) {
  return (
    <div className="border-b border-gray-300 py-4">
      <h2 className="text-xl font-semibold text-gray-800">{institution}</h2>
      <p className="text-gray-600">{degree} — <span className="font-medium">{year}</span></p>
      <p className="text-gray-500 text-sm mt-1">{details}</p>
    </div>
  );
}

export default RowSpace;