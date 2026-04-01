import React, { useEffect, useRef } from "react";
import { Not } from "../../assets";
import Button from "../../components/ui/Button";
import { gsap } from "gsap";
import { Link } from "react-router-dom";

const NotFound = () => {
  const imageRef = useRef(null);
  const textRef = useRef(null);
  const paragraphRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    // Create animation timeline
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Set initial state
    gsap.set(
      [
        imageRef.current,
        textRef.current,
        paragraphRef.current,
        buttonRef.current,
      ],
      {
        opacity: 0,
        y: 20,
      }
    );

    // Animate elements in sequence
    tl.to(imageRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.7,
    })
      .to(
        textRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
        },
        "-=0.2"
      )
      .to(
        paragraphRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
        },
        "-=0.2"
      )
      .to(
        buttonRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
        },
        "-=0.2"
      );

    // Simple floating animation for the image
    gsap.to(imageRef.current, {
      y: -10,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, []);

  return (
    <div className='flex flex-col justify-center space-y-8 items-center mx-auto min-h-screen px-4 py-12 mt-[-80px]'>
      <div className='' ref={imageRef}>
        <img
          className='w-full h-full object-cover'
          src={Not}
          alt='Page Not Found'
        />
      </div>
      <div ref={textRef}>
        <span className='font-bold text-3xl'>Oops, page not found </span>
      </div>
      <div ref={paragraphRef}>
        <p className='font-light text-gray-700'>
          The page you're looking for has vanished like a ninja in the
          night. 🌙 <br />
          But don't worry, you can still find your way back to the light.
          🌟
        </p>
      </div>

      <div className='flex justify-center' ref={buttonRef}>
      <Link to={"/dashboard"}>
          <Button
            className={"bg-primary-orange px-4 py-4 rounded-lg"}
            title={"Back to civilization"}
          />
      </Link>
      </div>
    </div>
  );
};

export default NotFound;
