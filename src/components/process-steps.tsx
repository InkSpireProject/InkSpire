"use client";

export function ProcessSteps() {
  const steps = [
    {
      title: "Rent",
      description:
        "Browse our extensive collection of books and rent your favorites with just a few clicks.",
    },
    {
      title: "Read",
      description:
        "Enjoy the book at your own pace. Dive into stories, explore new topics, and learn from the comfort of your home.",
    },
    {
      title: "Return",
      description:
        "We offer easy and flexible return options to make the process hassle-free.",
    },
    {
      title: "Repeat",
      description:
        "Repeat the cycle! Rent new books and continue building your personal library of knowledge and entertainment.",
    },
  ];

  return (
    <section className="bg-[#001233] py-16 md:py-24">
      <div className="container px-4 mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-white text-center mb-16 max-w-3xl mx-auto">
          Our Four Step
          <br />
          Hassle-free Process
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="mb-6">
                <img
                  src={`process/step-${index + 1}.svg`}
                  alt={`${step.title} icon`}
                  className="h-12 bg-green"
                />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">
                {step.title}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
