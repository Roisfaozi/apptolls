const FeaturesSection = () => {
  return (
    <section className="bg-white py-12">
      <div className="container mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 border rounded shadow-md">
            <h3 className="text-xl font-semibold text-gray-800">Feature 1</h3>
            <p className="text-gray-600">Explanation of Feature 1.</p>
          </div>
          <div className="bg-white p-6 border rounded shadow-md">
            <h3 className="text-xl font-semibold text-gray-800">Feature 2</h3>
            <p className="text-gray-600">Explanation of Feature 2.</p>
          </div>
          <div className="bg-white p-6 border rounded shadow-md">
            <h3 className="text-xl font-semibold text-gray-800">Feature 3</h3>
            <p className="text-gray-600">Explanation of Feature 3.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
