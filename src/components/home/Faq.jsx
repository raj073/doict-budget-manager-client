import { useEffect, useState } from "react";
import { FaQuestionCircle } from "react-icons/fa";

const Faq = () => {
  const [faqs, setFaqs] = useState([]);

  // Fetch the FAQs from the JSON file
  useEffect(() => {
    fetch("/faqs.json")
      .then((response) => response.json())
      .then((data) => setFaqs(data))
      .catch((error) => console.error("Error loading FAQs:", error));
  }, []);

  return (
    <div className="py-12 px-4 bg-white w-full max-w-5xl mx-auto mt-10">
      {/* Title */}
      <h2 className="text-4xl font-extrabold text-center mb-6">Frequently Asked Questions</h2>
      <h3 className="text-xl text-center text-gray-500 mb-10">How Budget Manager works for ICT Officials</h3>

      {/* FAQ List */}
      <div className="space-y-6">
        {faqs.length > 0 ? (
          faqs.map((faq, index) => (
            <div
              key={index}
              tabIndex="0"
              className="collapse collapse-arrow border border-gray-300 rounded-xl transition-all duration-300 hover:shadow-lg"
            >
              <div className="collapse-title text-lg font-semibold flex items-center gap-3 p-4 text-gray-700 bg-gray-100 hover:bg-cyan-50">
                <FaQuestionCircle className="text-cyan-600 w-5 h-5" />
                {faq.question}
              </div>
              <div className="collapse-content bg-gray-50 p-5">
                <p className="text-gray-600 text-md leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">Loading FAQs...</p>
        )}
      </div>
    </div>
  );
};

export default Faq;
