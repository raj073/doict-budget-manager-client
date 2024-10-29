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
    <div className="py-10 px-5 bg-white rounded-lg shadow-lg max-w-4xl mx-auto mt-10">
      {/* Title */}
      <h2 className="text-4xl font-bold text-center mb-4 text-blue-600">Frequently Asked Questions</h2>
      <h3 className="text-lg text-center text-gray-500 mb-8">How Budget Manager works for ICT Officials</h3>

      {/* FAQ List */}
      <div className="space-y-6">
        {faqs.length > 0 ? (
          faqs.map((faq, index) => (
            <div
              key={index}
              tabIndex="0"
              className="collapse collapse-arrow border border-gray-300 rounded-lg"
            >
              <div className="collapse-title text-lg font-medium flex items-center gap-2 text-gray-700">
                <FaQuestionCircle className="text-blue-500" />
                {faq.question}
              </div>
              <div className="collapse-content bg-gray-50">
                <p className="text-gray-600 p-4">{faq.answer}</p>
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
