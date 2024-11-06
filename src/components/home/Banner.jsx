const Banner = () => {
  return (
    <div className="bg-white p-4 mt-10">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text-gray-800">
          Budget Distribution Management System{" "}
          <span className="text-red-600">(BDMS)</span>
        </h1>
        <p className="text-2xl font-bold text-gray-800">
          For Department of ICT Officials
        </p>
      </div>

      <div className="flex flex-col items-center">
        <h2 className="text-3xl font-bold mb-8 text-gray-600">Core Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 w-full max-w-3xl">
          {[
            { icon: "🔒", text: "Secure Login & Personalized Dashboard" },
            { icon: "📊", text: "Efficient Budget Tracking & Approval" },
            { icon: "📱", text: "Fully Responsive for Desktop & Mobile" },
            { icon: "💾", text: "24-Hour Database Backup" },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-gray-50 text-gray-800 p-6 rounded-2xl shadow-md transform transition-all hover:scale-105 hover:shadow-lg"
            >
              <div className="flex items-center space-x-4">
                <span className="text-3xl text-cyan-600">{feature.icon}</span>
                <span className="text-lg font-semibold">{feature.text}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banner;
