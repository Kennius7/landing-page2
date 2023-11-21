import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/css";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import { features01, features02, features03, features04, features05, features06 } from "../assets";



// 🌐 


function BulletPoints() {
  const reasonWhySlide = [
    {
      id: 0,
      name: "Expert Tutoring",
      title: "Learn from professionals with years of hands-on experience. Our instructors are passionate about guiding you through the ins and outs of programming, ensuring you gain real-world insights",
      img: features01,
    },
    {
      id: 1,
      name: "Comprehensive Curriculum",
      title: "Stay ahead of the curve with a curriculum designed to cover the latest programming languages, frameworks, and industry trends. From Python to JavaScript, we've got you covered",
      img: features02,
    },
    {
      id: 2,
      name: "Flexible Learning",
      title: "Life is busy, and we get it! Our online classes are structured to fit your schedule. Learn at your own pace, from the comfort of your home, and access course materials 24/7",
      img: features03,
    },
    {
      id: 3,
      name: "Hands-On Projects",
      title: "Put theory into practice with engaging, hands-on projects that reinforce your learning. Build a portfolio of impressive projects to showcase your skills to future employers",
      img: features04,
    },
    {
      id: 4,
      name: "Community Support",
      title: "Join a vibrant community of learners, exchange ideas, and get help when you need it. Our dedicated support team and forums ensure you're never alone on your coding journey",
      img: features05,
    },
    {
      id: 5,
      name: "Career Guidance",
      title: "Looking to land that dream job in tech? Our courses come with valuable career guidance, including resume reviews, interview tips, and networking opportunities",
      img: features06,
    },
  ];

  const reasonWhySplideOptions = {
    // width: "90%",
    perPage: 4,
    perMove: 1,
    type: 'loop',
    speed: 1000,
    keyboard: 'global',
    autoplay: true,
    autoplaySpeed: 3000,
    rewind: true,
    rewindSpeed: 2000,
    isNavigation: false,
    arrows: false,
    focus: 0,
    start: 0,
    interval: 4000,
    easing: "linear",
    gap: '0.5rem',
    pagination: false,
    extensions: { AutoScroll },
    autoScroll: {
        speed: 1,
        pauseOnHover: false,
        pauseOnFocus: false,
    },
    padding: '1rem',
    mediaQuery: "min",
    breakpoints: {
      1000: { perPage: 4},
      580: { perPage: 3},
      300: { perPage: 2},
      100: { perPage: 1},
    },
  };


  return (
    <>
      <div>
        <div className="flex justify-center items-center bg-slate-50">
          <div className="font-poppins font-semibold text-center md:text-[35px] sm:text-[27px] xs:text-[20px] 
            text-[17px] xs:w-full w-[92%] md:my-4 sm:my-6 my-4">
            WHY CHOOSE OUR ONLINE PROGRAMMING CLASSES?
          </div>
        </div>
        <div className="w-full bg-slate-700">
          <Splide options={reasonWhySplideOptions}>
            {reasonWhySlide.map((card) => (
              <SplideSlide key={card.id}>
                <div className="flex flex-col justify-center items-center relative w-full h-[300px]">

                  <div className="flex flex-col justify-center items-center overflow-hidden rounded-[5px]
                    md:w-[96%] md:h-[96%] sm:w-[86%] sm:h-[86%] xs:w-[80%] xs:h-[80%] 
                    xxs:w-[95%] xxs:h-[95%] w-[80%] h-[80%]">
                    <img src={card.img} alt={card.name}
                      className="object-cover opacity-30 w-full h-full"
                    />
                  </div>

                  <div className="flex flex-col justify-center items-center text-white 
                    w-full absolute z-1 top-[25%]">
                    <div className="font-poppins font-semibold text-center md:text-[18px] sm:text-[22px] 
                          xs:text-[18px] xxs:text-[16px] text-[17px] mb-[20px]">
                      {card.name}
                    </div>
                    <div className="font-mono font-semibold text-center md:text-[14px] 
                      sm:text-[16px] xs:text-[14px] xxs:text-[13px] text-[12px] 
                      text-white md:w-[90%] sm:w-full xxs:w-[70%] w-[98%]">
                      {card.title}
                    </div>
                  </div>

                </div>
              </SplideSlide>
            ))}
          </Splide>
        </div>
      </div>
    </>
  )
}

export default BulletPoints


