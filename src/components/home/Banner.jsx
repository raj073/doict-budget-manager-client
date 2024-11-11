const Banner = () => {
  return (
    <div className=" my-7 py-16 bg-gradient-to-r from-blue-50 to-cyan-100 rounded-lg">
      {/* Title and Subtitle */}
      <div className="text-center mb-24">
        <h1 className="text-3xl md:text-5xl font-extrabold mb-4 text-gray-800 drop-shadow-lg">
          Budget Distribution Management System{" "}
          <span className="text-cyan-950 font-extrabold">(BDMS)</span>
        </h1>
        <p className="text-xl md:text-2xl font-bold text-gray-900">
          For Department of ICT Officials
        </p>
      </div>

      {/* Core Features */}
      <div className="flex flex-col items-center">
        <h2 className="text-3xl font-bold mb-10 text-gray-700">
          Core Features
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 w-full max-w-4xl">
          {[
            { icon: "🔒", text: "Secure Login & Personalized Dashboard" },
            { icon: "📊", text: "Efficient Budget Tracking & Approval" },
            { icon: "📱", text: "Fully Responsive for Desktop & Mobile" },
            { icon: "💾", text: "24-Hour Database Backup" },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-white text-gray-800 p-8 rounded-2xl shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-xl hover:bg-cyan-50"
            >
              <div className="flex items-center space-x-4">
                <span className="text-4xl text-cyan-600">{feature.icon}</span>
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
