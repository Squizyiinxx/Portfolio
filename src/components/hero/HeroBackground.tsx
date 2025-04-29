"use client";

import Image from "next/image";

const blurhashPlaceholder =
  "data:image/heif;base64,AAAAHGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZgAAAOptZXRhAAAAAAAAACFoZGxyAAAAAAAAAABwaWN0AAAAAAAAAAAAAAAAAAAAAA5waXRtAAAAAAABAAAAImlsb2MAAAAAREAAAQABAAAAAAEOAAEAAAAAAAACugAAACNpaW5mAAAAAAABAAAAFWluZmUCAAAAAAEAAGF2MDEAAAAAamlwcnAAAABLaXBjbwAAABNjb2xybmNseAABAA0ABoAAAAAMYXYxQ4EgAgAAAAAUaXNwZQAAAAAAAABAAAAAHwAAABBwaXhpAAAAAAMICAgAAAAXaXBtYQAAAAAAAAABAAEEAYIDBAAAAsJtZGF0EgAKCTgVP/MICGg0gDKqBRgAAgiiBQDxzx0WAd+m93+GcLG5JnT5BhvFHb53yHzPk0xygTBJbfKPXjtGI2vN+0hEIzOKffLSZuJgxIfsyJTCBQzDttxn1uuWdmNAKLGiu0RI1KFqcAK/NzKda4+TJKZy3pZR0ajwT34yOPdK30PQFdFgSIv3qPlfjCOFF0c9fmDuVkBtlAn9Uq+177ClDMwpqFCFNaT7vol4z5oYH0XWTpd6XjH8lfd+j8qQKkADRDzmKQuCOU8MAyKT8O1ex0ytOuKZx8fKEZFP23oJpmzKviD0DajjGPjbHwG7AHMEyE6KJYpaGkydqUkTHNdpM2TxkGEIW6s75cjNHKSaVba9O8P6U1VR/PL5n7lMpVE/fotz7JP1F20g9f8d2ckIlQxm32+PSj5VO4qRQyxs/MIBqqiowgE5OJy8fK2RYWm1mjXL/Ag5dRRGLZ+s7uxA/TmW/3pF2R/Jz/TSoDVFuomioX6W8cDEKG3rEXiZiH3tW8Q6f6Z5rIcJrVzyJMQ/e4ADfAAhggo7yF1+1053t6f/QelowZ1eWY8HMf21iEghDlPjL30YpsxOD8CLrjiZyQJCqTK7MuWZht3yTQtr+P0J4a5B38c4+WGLlJ1hiIoNphG4XuokIWIQkdh8nCUFe1DayEz+1dHIt+r8q0MSbnzFWZD11+aVn5pkOV7zwlHfwrm+5Dbttd7J1W4FCDhUSxpioxuI91v/uk22PJHspaY0YZOnQH3NngEf42TQfrqVEU9JUUoHnsJrngN+HqfRYNI1E2jsqdM0Ezg+ZE9miKv0lrL/8ffB7M5sqCYx561Dwe26WwKALMkVOr1ckmtM36yUz11R2FGeyfUoGYGky2l6X/rlQhY10tjgyU9Z0Eb5tYqCKYA/zEws3IaPSjVJ2GLp7znUVueeOuA=";

export default function HeroBackground() {
  return (
    <>
      <div
        aria-hidden="true"
        className="absolute inset-0 backdrop-blur-[20px] scale-[1.1] transform-gpu"
      />

      <Image
        src="/bg-hero.webp"
        alt="Hero Background"
        fill
        className="object-cover"
        sizes="100vw"
        quality={85}
        placeholder="blur"
        blurDataURL={blurhashPlaceholder}
        style={{
          objectFit: "cover",
          objectPosition: "center",
        }}
        onLoad={(e) => {
          const target = e.target as HTMLImageElement;
          if (target && target.complete) {
            target.style.opacity = "1";
            if (window.performance && window.performance.mark) {
              window.performance.mark("hero-image-loaded");
            }
          }
        }}
      />

      <div className="absolute inset-0 bg-black/50 pointer-events-none z-0" />
    </>
  );
}
