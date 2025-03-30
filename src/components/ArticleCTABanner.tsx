import Image from "next/image"
import Link from "next/link"

export default function ArticleCTABanner() {
  return (
    <div className="w-full max-w-4xl mx-auto py-6">
      <div className="relative bg-[#31D0AD] rounded-xl p-8 overflow-hidden">
        {/* Content container */}
        <div className="relative z-10 flex flex-col items-center text-center">
          {/* Heading */}
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Make your move!</h2>

          {/* Subheading */}
          <p className="text-white text-lg md:text-xl max-w-md mb-8">
            Your resume is an extension of yourself.
            <br />
            Make one that&apos;s truly you.
          </p>

          {/* CTA Button */}
          <Link
            href="/create-resume"
            className="bg-white text-[#31D0AD] hover:bg-emerald-50 transition-colors px-8 py-3 rounded-md font-medium text-lg"
          >
            Create Your Resume
          </Link>
        </div>

        {/* Left character */}
        <div className="absolute left-2 md:left-4 bottom-8 ">
          <div className="relative w-16 h-16 md:w-24 md:h-24 bg-yellow-200 rounded-full overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Character illustration"
              width={96}
              height={96}
              className="object-cover"
            />
          </div>
         
        </div>

        {/* Right character */}
        <div className="absolute right-1 md:right-3 bottom-5">
          <div className="relative w-16 h-16 md:w-24 md:h-24 bg-indigo-300 rounded-full overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Character illustration"
              width={96}
              height={96}
              className="object-cover"
            />
          </div>
         
        </div>
      </div>
    </div>
  )
}

