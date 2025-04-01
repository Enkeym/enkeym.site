import Image from "next/image"
import Link from "next/link"
import "./hero.css"

const Hero = () => {
  return (
    <div className="hero">
      <div className="hSection left">
        <h1 className="hTitle">Hey, There, <br /> <span>I,m Enkeym</span></h1>
        <div className="awards"><h2>Top Rated Designer</h2><p>By <span>Upwork</span></p> <div className="adwardList"><Image src="/award1.png" alt="" width={100} height={100} /><Image src="/award2.png" width={100} height={100} alt="" /><Image src="/award3.png" width={100} height={100} alt="" /> </div> </div>
        <a href="#services">
          <svg
            width="50px"
            height="50px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 9C5 5.13401 8.13401 2 12 2C15.866 2 19 5.13401 19 9V15C19 18.866 15.866 22 12 22C8.13401 22 5 18.866 5 15V9Z"
              stroke="white"
              strokeWidth="1"
            />

          </svg>
        </a>
      </div>
      <div className="hSection right">
        <div className="follow">
          <Link href="/" >
            <Image src="/instagram.png" alt={""} width={100} height={100} />
          </Link>
        </div>
      </div>
    </div >
  )
}

export default Hero