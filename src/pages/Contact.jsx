import React, { useState } from "react";

const ContactPage = () => {

    const [contstate, setContstate]=useState({
        name: "",
        email: "",
        message: "",
    })

    const handleChange=(e)=>
    {
       setContstate({...contstate, [e.target.name]: e.target.value});
    }

  return (
    <div className="bg-white min-h-screen flex flex-col">

  {/* Main Content */}
  <main className="max-w-7xl mx-auto p-6 grid md:grid-cols-2 gap-12 flex-grow mt-8 ml-10 sm:ml-36 mr-10 sm:mr-32">
    {/* Contact Info */}
    <div>
      <h2 className="text-2xl text-blue-600 font-semibold mb-4">Get in Touch</h2>
      <p className="mb-6">
        We'd love to hear from you. Reach out to us through any of the following ways:
      </p>

      <div className="space-y-4">
        <div>
          <h3 className="font-semibold text-lg">Phone</h3>
          <p>+91 98765 43210</p>
          <p>+91 91234 56789</p>
        </div>

        <div>
          <h3 className="font-semibold text-lg">Email</h3>
          <p>support@flyinn.com</p>
          <p>bookings@flyinn.com</p>
        </div>

        <div>
          <h3 className="font-semibold text-lg">Address</h3>
          <p>FlyInn Pvt. Ltd.,</p>
          <p>3rd Floor, Skyview Towers,</p>
          <p>MG Road, Bangalore - 560001, India</p>
        </div>
      </div>
    </div>

    {/* Contact Form */}
    <div>
      <h2 className="text-2xl text-blue-500 font-semibold mb-4">Contact Form</h2>
      <form
        className="bg-blue-50 p-6 rounded-lg shadow space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          setContstate({
            name: "",
            email: "",
            message: "",
          })
          alert("Message submitted!");
        }}
      >
        <div>
          <label className="block mb-1 font-medium" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            name="name"
            value={contstate.name}
            type="text" onChange={(e)=> handleChange(e)}
            className="w-full px-4 py-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Your Name"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            value={contstate.email}
            type="email" onChange={(e)=> handleChange(e)}
            className="w-full px-4 py-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="you@example.com"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium" htmlFor="message">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={contstate.message}
            rows="4" onChange={(e)=> handleChange(e)}
            className="w-full px-4 py-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Write your message..."
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
        >
          Send Message
        </button>
      </form>
    </div>
  </main>
</div>

  );
};

export default ContactPage;