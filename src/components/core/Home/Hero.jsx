import { Link } from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux";

const Hero = () => {
  const { token } = useSelector((state) => state.auth);
  return (
    <section className="bg-gray-50">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen ">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-extrabold sm:text-5xl">
            Create your form.
            <strong className="font-extrabold text-primary sm:block">
              {" "}
              In Seconds Not in Hours.{" "}
            </strong>
          </h1>

          <p className="mt-4 sm:text-xl/relaxed text-gray-500">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt
            illo tenetur fuga ducimus numquam ea!
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              className="block w-full rounded bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-purple-600 hover:text-white focus:outline-none focus:ring active:bg-purple-500 sm:w-auto"
              to={token ? "/dashboard/forms" : "/auth"}
            >
              <span className="text-2xl">+</span> Create Form
            </Link>

            <Link
              className="block w-full rounded px-12 py-3 text-sm font-medium text-pribg-primary text-primary shadow hover:text-purple-600 focus:outline-none focus:ring active:bg-purple-500 sm:w-auto"
              to="#"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
