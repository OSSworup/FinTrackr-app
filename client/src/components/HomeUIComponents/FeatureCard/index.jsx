


function FeatureCard({ icon, title, description }) {
  return (
    <div className="border border-green-700 bg-white rounded-lg p-6 text-center hover:shadow-lg hover:shadow-green-700/20 transition duration-500 ease-in-out transform hover:scale-105 animate-fade-in">
      <div className="text-4xl mb-3 text-green-700">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
}

export default FeatureCard;