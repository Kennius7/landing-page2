import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/css";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import { reasonWhySlide } from "../data";


// 🌐 


function BulletPoints() {
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
    arrows: true,
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
      300: { perPage: 1},
      100: { perPage: 1},
    },
  };

  return (
    <>
      <div className="flex flex-col justify-between items-center bg-slate-100 w-full md:h-[400px] sm:h-[400px] 
        xs:h-[350px] h-[330px]">

        <div className="flex justify-center items-center">
          <div className="text-center font-semibold sm:text-[30px] xs:text-[25px] text-[18px] 
            xs:w-full w-[92%] mt-[20px]">
            Why Choose Our Online Coding Classes?
          </div>
        </div>

        <div className="w-full bg-slate-700">
          <Splide options={reasonWhySplideOptions}>
            {reasonWhySlide.map((card) => (
              <SplideSlide key={card.id}>
                <div className="flex flex-col justify-center items-center relative w-full md:h-[300px] 
                  sm:h-[290px] xs:h-[260px] h-[250px]">

                  <div className="flex flex-col justify-center items-center overflow-hidden rounded-[5px]
                    md:w-[96%] md:h-[96%] sm:w-[99%] sm:h-[96%] xs:w-[99%] xs:h-[92%] 
                    xxs:w-[99%] xxs:h-[95%] w-[80%] h-[80%]">
                    <img src={card.img} alt={card.name}
                      className="object-cover opacity-30 w-full h-full"
                    />
                  </div>

                  <div className="flex flex-col justify-center items-center text-white 
                    w-full absolute z-1 sm:top-[25%] xs:top-[20%] top-[25%]">
                    <div className="font-poppins font-semibold text-center md:text-[18px] sm:text-[16px] 
                          xs:text-[15px] xxs:text-[14px] text-[10px] xs:mb-[20px] mb-[15px]">
                      {card.name}
                    </div>
                    <div className="font-mono font-semibold text-center md:text-[14px] 
                      sm:text-[13px] xs:text-[12px] xxs:text-[12px] text-[10px] 
                      text-white md:w-[90%] sm:w-[94%] xs:w-[80%] xxs:w-[82%] w-[98%]">
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


