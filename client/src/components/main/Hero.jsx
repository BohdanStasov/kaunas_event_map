import React, {useEffect, useState } from "react";
import { Tilt } from "react-tilt"; 
import { cards } from "../../constants";
import { fadeIn } from "../../utils/motion";
import partyImage from "../../assets/2.jpg";
import sportImage from "../../assets/3.jpg";
import foodImage from "../../assets/4.jpg";
import meetupImage from "../../assets/5.jpg";

const getImageByTitle = (title) => {
  switch (title) {
    case "Parties":
      return partyImage;
    case "Sports":
      return sportImage;
    case "Food & Drinks": 
      return foodImage;
    case "Meetups":
      return meetupImage;
    default:
      return null;
  }
};

const Card = ({ index, title }) => {
  const backgroundImage = getImageByTitle(title);
  const handleButtonClick = () => {
    const mapComponent = document.getElementById('mapComponent');
    mapComponent.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <Tilt className="xs:w-[250px] w-full">
      <div
        variants={fadeIn("right", "spring", index * 0.5, 0.75)}
        className="w-full white  p-[1px] rounded-[20px] shadow-none border border-black"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          options={{
            max: 45,
            scale: 1,
            speed: 450,
          }}
          className="rounded-[20px] py-5 px-12 min-h-[240px] flex justify-evenly items-center flex-col"
        >
          <button className="text-white text-[25px] font-bold text-center cursor-pointer custom-stroke"
            onClick={() => handleButtonClick()}
          >
            {title}
          </button>
        </div>
      </div>
    </Tilt>
  );
};

const Hero = () => {

  return (
    <div id="heroComponent" className="relative w-full mx-auto justify-center items-center flex">
      <div className={`sm:px-16 px-6 sm:py-16 py-10 max-w-7xl mx-auto relative z-0`} style={{ scrollSnapType: 'y mandatory' }}>
        <div >
          <h2 className='text-black mt-8 font-black md:text-[30px] sm:text-[20px] xs:text-[20px] text-center'>Things to do in Kaunas</h2>
        </div>

        <div className="mt-8 flex flex-wrap gap-10">
          {cards.map((card, index) => (
            <Card key={card.title} index={index} {...card} 
            />
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-10">
          <h1 className='text-black mt-4 font-200 md:text-[20px] sm:text-[20px] xs:text-[20px] text-center'>
            The combination of amazing architecture, culture, restaurants with modern universities and sports grounds makes Kaunas a unique place where you can have a good time and relax with friends and like-minded people.
            <br/> <br/>
            The aim of the project is to create conditions for finding an event in Kaunas that is created just for you and meets your needs and expectations.
            <br/> <br/>
            On our website, you can choose the event you are interested in by section. See on the map where it will be held, reserve a place.
            <br/> <br/>
            Moreover, we have created the conditions for you to create your own events and invite everyone who shares your interests. If you like to play basketball and want to put together two teams, no problem - let everyone know about it using our website.  An interesting performance is planned at the theater and you want to gather a company to attend it together - we will be happy to help you. 
            <br/> <br/>
            Register on the website and subscribe to the events that have already been created or create your own.  
            <br/><br/>
            It's more fun to spend time together!
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Hero;
