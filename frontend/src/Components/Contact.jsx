import React from 'react';
import { API_BASE_URL } from "../lib/api";
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (data.message.length < 10) {
      toast.error("Message must be at least 10 characters long.");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.text();  // Get the raw response as text first
      if (response.ok) {
        toast.success("Message sent successfully!");
      } else {
        toast.error(result || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="py-12">
      <div className="max-w-md mx-auto">
        <h2 className="text-2xl mt-20 md:text-4xl">Contact Us</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="shadow-md rounded-md dark:bg-slate-800 shadow-lg px-8 pt-6 pb-8 mb-4"
        >
          <div className="mt-4 space-y-2">
            <span>Name</span>
            <br />
            <input
              id="name"
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your fullname"
              {...register('fullname', { required: true })}
            />
            <br />
            {errors.fullname && (
              <span className="text-sm text-red-500">This field is required</span>
            )}
          </div>
          <div className="mt-4 space-y-2">
            <span>Email</span>
            <br />
            <input
              id="email"
              type="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your email"
              {...register('email', { required: true })}
            />
            <br />
            {errors.email && (
              <span className="text-sm text-red-500">This field is required</span>
            )}
          </div>
          <div className="mt-4 space-y-2">
            <span>Message</span>
            <br />
            <textarea
              id="message"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
              placeholder="Enter your message"
              {...register('message', { required: true })}
            ></textarea>
            <br />
            {errors.message && (
              <span className="text-sm text-red-500">This field is required</span>
            )}
          </div>
          <div className="flex justify-around mt-4">
            <button
              type="submit"
              className="bg-pink-500 text-white rounded-md px-3 py-1 hover:bg-pink-700 duration-200"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Contact;
