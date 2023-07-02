import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs
      .send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: "ohdan",
          from_email: form.email,
          to_email: "my_email",
          message: form.message,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setForm({
            name: "",
            email: "",
            message: "",
          });
        },
        (error) => {
          console.error(error);
        }
      );
  };

  return (
    <div className="h-screen ">
    <div id="contactComponent" className='xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden items-center' style={{ paddingTop: '80px' }}>
      
        <div
          className='flex-[0.75] bg-white-100 p-8 rounded-2xl mx-auto' 
        >
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className='mt-4 flex flex-col gap-8'
          >
            <h1 className='text-black md:text-[25px] sm:text-[20px] xs:text-[20px]'>Contact us</h1>
            <label className='flex flex-col'>
              <span className='text-black font-medium mb-4'>Name</span>
              <input
                type='text'
                name='name'
                value={form.name}
                onChange={handleChange}
                className='bg-white py-4 px-6 text-black rounded-lg outline-none border-none font-medium'
              />
            </label>
            <label className='flex flex-col'>
              <span className='text-black font-medium mb-4'>Email</span>
              <input
                type='email'
                name='email'
                value={form.email}
                onChange={handleChange}
                className='bg-white py-4 px-6 text-black rounded-lg outline-none border-none font-medium'
              />
            </label>
            <label className='flex flex-col'>
              <span className='text-black font-medium mb-4'>Message</span>
              <textarea
                rows={3}
                name='message'
                value={form.message}
                onChange={handleChange}
                className='bg-white py-4 px-6 placeholder:text-secondary text-black rounded-lg outline-none border-none font-medium'
              />
            </label>

            <button
              type='submit'
              className='bg-white py-3 px-8 rounded-xl outline-none w-fit text-black font-bold xl:ml-auto xl:mr-0 mx-auto'
            >
              Send
            </button>

          </form>
        </div>
        <style>
          {`
          .contactContainer{
            background-color: #f3f3f3;
            border-radius: 2rem;
            padding: 1rem;
            flex: 0.75;
          }
          @media (max-height: 767px) {
            .contactContainer{
              flex: 0.75;
            }
          }
          `}
        </style>
      </div></div>
  );
};

export default Contact;