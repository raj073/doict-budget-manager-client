import DoICTLogo from "/resources/doict.png";
const TitleLogo = () => {
  return (
    <div className="flex justify-start items-center gap-1">
      <a href="https://doict.gov.bd/" target="_blank" rel="noopener noreferrer">
        <img
          src={DoICTLogo}
          alt="DoICT Logo"
          className="w-16 h-16 rounded-full border"
        />
      </a>

      <div className="text-xl font-black flex justify-start items-left gap-1">
        <span className="text-black text-xl font-black">Budget</span>
        <span className="text-cyan-600 text-xl font-black">Management</span>
      </div>
    </div>
  );
};
export default TitleLogo;
