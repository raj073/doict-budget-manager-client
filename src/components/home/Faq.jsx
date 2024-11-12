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
    <div className="py-12 bg-white w-full max-w-4xl mx-auto mt-10">
      {/* Title */}
      <h2 className="text-3xl font-bold text-center mb-4 text-black">Frequently Asked Questions</h2>
      <h3 className="text-lg text-center text-gray-600 mb-8">How Budget Manager works for ICT Officials</h3>

      {/* FAQ List */}
      <div className="space-y-4">
        {faqs.length > 0 ? (
          faqs.map((faq, index) => (
            <div key={index} tabIndex="0" className="border border-gray-300 rounded-lg">
              <div className="p-4 text-lg font-medium flex items-center gap-2 text-black bg-white">
                <FaQuestionCircle className="text-black w-4 h-4" />
                {faq.question}
              </div>
              <div className="p-4 bg-white">
                <p className="text-gray-800 text-md">{faq.answer}</p>
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
