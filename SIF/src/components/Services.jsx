import React from 'react';

const services = [
  { title: 'Interactive Discussion Forums', description: 'Regularly organized sessions where students engage in moderated debates and discussions on current affairs, academic topics, and social issues to promote critical thinking and diverse perspectives.', icon: 'fas fa-lightbulb' },
  { title: 'Skill-Building Workshops', description: 'Hands-on workshops focused on public speaking, logical reasoning, leadership, and effective communication to equip students with tools for impactful engagement.' },
  { title: 'Community Impact Projects', description: 'Student-led initiatives that apply ideas discussed in forums to real-world challenges, encouraging civic responsibility and meaningful contribution to society.', icon: 'fas fa-users' },
];

function Services() {
  return (
    <section id="services" className="py-16 bg-green-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Mission and Vision</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-md shadow-md p-6 text-center">
              <i className={`${service.icon} text-2xl text-green-600 mb-4`}></i> {/* Ensure Font Awesome is included */}
              <h3 className="text-xl font-semibold text-gray-700 mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;