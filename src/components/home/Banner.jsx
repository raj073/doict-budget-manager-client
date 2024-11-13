
const Banner = () => {
  return (
    <div className="my-7 py-16 ">
      {/* শিরোনাম এবং সাবটাইটেল */}
      <div className="text-center mb-24 max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 drop-shadow-lg tracking-wide">
          বাজেট ডিস্ট্রিবিউশন ম্যানেজমেন্ট সিস্টেম{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-700 font-black drop-shadow-lg">(BDMS)</span>
        </h1>
        <p className="text-xl md:text-2xl font-bold text-gray-800 py-5 tracking-wide">
          তথ্য ও যোগাযোগ প্রযুক্তি (আইসিটি) অধিদপ্তরের কর্মকর্তাদের জন্য
        </p>
      </div>

      {/* মূল বৈশিষ্ট্যসমূহ */}
      <div className="flex flex-col items-center">
        <h2 className="text-3xl font-extrabold mb-10 text-gray-700 tracking-wider">
          মূল বৈশিষ্ট্যসমূহ
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10 w-full max-w-4xl">
          {[
            { icon: "🔒", text: "নিরাপদ লগইন ও ব্যক্তিগত ড্যাশবোর্ড" },
            { icon: "📊", text: "কার্যকর বাজেট ট্র্যাকিং ও অনুমোদন" },
            { icon: "📱", text: "ডেস্কটপ ও মোবাইলের জন্য সম্পূর্ণ রেসপন্সিভ" },
            { icon: "💾", text: "২৪ ঘণ্টা ডেটাবেস ব্যাকআপ" },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-white text-gray-800 p-8 rounded-2xl shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:bg-gradient-to-r from-cyan-50 to-cyan-100"
            >
              <div className="flex items-center space-x-4">
                <span className="text-5xl text-cyan-600">{feature.icon}</span>
                <span className="text-lg font-semibold tracking-wide">{feature.text}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banner;
