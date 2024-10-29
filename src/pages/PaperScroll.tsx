import React from "react";

const PaperScroll: React.FC = () => {
  return (
    <div className="relative flex items-center justify-center min-h-screen bg-fixed bg-center bg-cover bg-no-repeat bg-[#f8f0d9] overflow-hidden">
      <div
        className="relative w-full max-w-4xl p-8 md:p-12 bg-center bg-contain border border-yellow-900 rounded-lg bg-no-repeat shadow-lg shadow-[#6b4226]"
        style={{
          backgroundImage: "url('/bg-paper.png')",
        }}
      >
        <div className="text-brown-900 font-serif text-lg md:text-xl leading-relaxed">
          {/* {children} */}
          ssss
        </div>
      </div>
    </div>
  );
};

export default PaperScroll;
