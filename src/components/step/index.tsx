
import React from "react";

interface StepComponentsProps {
  currentStep: number; // ขั้นตอนปัจจุบัน
  arrayTitle: string[]; // ชื่อของแต่ละขั้นตอน
}

const StepComponents: React.FC<StepComponentsProps> = ({ currentStep, arrayTitle }) => {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-between mb-6">
        {arrayTitle.map((title, index) => (
          <div
            key={index}
            className={`flex-1 text-center pb-2 border-b-4 ${
              currentStep === index + 1
                ? "border-green-700 text-green-700"
                : "border-gray-300 text-gray-600"
            }`}
          >
            {title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepComponents;