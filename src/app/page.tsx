import Image from 'next/image';
import Link from 'next/link';
import Logo from '@src/assets/images/logo.svg';
import HeaderBackground from '@src/assets/images/header-bg.svg';
import WatchNow from '@src/assets/images/watch-now.svg';
import Calendar from '@src/assets/images/calendar.svg';
import Email from '@src/assets/images/email.svg';
import Vector from '@src/assets/images/vector.svg';
import Student from '@src/assets/images/student.png';
import { Button } from '@src/components/ui';
import UserAvatar from '@src/components/common/Avatar/UserAvatar';

export default function Home() {
  return (
    <>
      <div className="isolate">
        <div className="relative">
          <header className="line-b !fixed inset-x-0 top-0 z-20 h-32 flex items-center justify-between px-4 after:-bottom-px sm:px-6 lg:px-24 py-6 bg-[#49bbbd]">
            <Link className="shrink-0" href={'/'}>
              <Image src={Logo} alt="Logo" />
            </Link>

            <div className="flex items-center gap-5 max-md:hidden lg:gap-6">
              <Link href={'/'} className="text-sm/6 text-white">
                Home
              </Link>
              <Link href={'/courses'} className="text-sm/6 text-white">
                Courses
              </Link>
              <Link href={'/careers'} className="text-sm/6 text-white">
                Careers
              </Link>
              <Link href={'/blog'} className="text-sm/6 text-white">
                Blog
              </Link>
              <Link href={'/about-us'} className="text-sm/6 text-white">
                About Us
              </Link>
              <Button className="px-6 rounded-[80px] w-28 justify-center text-sm/6 font-normal bg-white hover:bg-white/90 text-[#5B5B5B]">
                Login
              </Button>
              <Button className="px-6 rounded-[80px] w-28 justify-center text-sm/6 font-normal bg-white/30 hover:bg-white/20 text-[#FFFFFF]">
                Sign Up
              </Button>
            </div>
          </header>
        </div>

        <main className="flex min-h-dvh flex-col pt-24">
          <section className="relative min-h-[690px]">
            <Image
              src={HeaderBackground}
              alt="Header Background"
              className="absolute inset-0 -z-10 h-full w-full object-cover"
              width={1330}
              height={750}
            />
            <div className="max-w-lg pl-24 pt-32 mb-12">
              <h1 className="mb-6 text-4xl font-bold text-white">
                <span className="text-[#F48C06]">Studying</span> Online is now much easier
              </h1>
              <p className="text-lg/6 text-white mb-6">
                TOTC is an interesting platform that will teach you in more an interactive way
              </p>
              <div className="flex items-center gap-5">
                <Button className="px-8 py-3 rounded-[80px] justify-center text-sm/6 font-normal bg-white/30 hover:bg-white/20 text-[#FFFFFF]">
                  Join for free
                </Button>
                <div className="flex items-center gap-5">
                  <Link href={'/watch-now'} className="flex items-center gap-2">
                    <div className="flex items-center gap-0 justify-center bg-white w-12 h-12 rounded-full">
                      <Image src={WatchNow} className="w-6 h-6 relative left-0.5" alt="Watch Now" />
                    </div>
                    <span className="text-gray-950/90">Watch how it works</span>
                  </Link>
                </div>
              </div>
            </div>

            <div className="absolute flex items-center gap-5 bottom-12 right-2 bg-white/80 rounded-lg px-6 py-3">
              <div className="bg-[#23BDEE] w-fit p-1.5 rounded-md">
                <Image src={Calendar} alt="" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-[#595959]">250k</h3>
                <p className="font-medium text-base/6 text-[#545567]">Assisted Student</p>
              </div>
            </div>

            <div className="absolute flex items-center gap-5 bottom-[100px] right-[550px] bg-white/80 rounded-lg px-6 py-3">
              <div>
                <UserAvatar photo={Student} />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-[#595959]">User Experience Class</h3>
                <p className="font-medium text-base/6 text-[#545567] mb-4">Today at 12.00 PM</p>
                <Button className="bg-[#D8587E] rounded-[80px]">Join Now</Button>
              </div>
            </div>

            <div className="absolute bottom-[210px] right-2 bg-[#F25471] rounded-lg p-1.5">
              <div className="bg-white px-2 py-1.5 rounded-md">
                <Image src={Vector} alt="" />
              </div>
            </div>

            <div className="absolute flex items-center gap-5 bottom-[400px] right-2 bg-white/80 rounded-lg px-6 py-3">
              <div className="bg-[#F88C3D] w-fit p-1.5 rounded-md">
                <Image src={Email} alt="" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-[#595959]">Congratulations</h3>
                <p className="font-medium text-base/6 text-[#545567]">Your admission completed</p>
              </div>
            </div>

            <div className="absolute bottom-1 right-40 -rotate-[1.5deg]">
              <Image src={Student} alt="" className="max-w-md" />
            </div>
          </section>

          <section>
            <div>
              <h3>Our Success</h3>
              <p>
                Ornare id fames interdum porttitor nulla turpis etima. Diam vitae sollicitudin at
                nec nam et pharetra gravida. Adipiscing a quis ultrices eu omare tristique vel nisl
                orci.
              </p>
            </div>
          </section>
        </main>
      </div>
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
          <Image
            className="dark:invert"
            src="/next.svg"
            alt="Next.js logo"
            width={180}
            height={38}
            priority
          />
          <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
            <li className="mb-2 tracking-[-.01em]">
              Get started by editing{' '}
              <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-[family-name:var(--font-geist-mono)] font-semibold">
                src/app/page.tsx
              </code>
              .
            </li>
            <li className="tracking-[-.01em]">Save and see your changes instantly.</li>
          </ol>

          <div className="flex gap-4 items-center flex-col sm:flex-row">
            <a
              className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
              href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                className="dark:invert"
                src="/vercel.svg"
                alt="Vercel logomark"
                width={20}
                height={20}
              />
              Deploy now
            </a>
            <a
              className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
              href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read our docs
            </a>
          </div>
        </main>
        <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image aria-hidden src="/file.svg" alt="File icon" width={16} height={16} />
            Learn
          </a>
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image aria-hidden src="/window.svg" alt="Window icon" width={16} height={16} />
            Examples
          </a>
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image aria-hidden src="/globe.svg" alt="Globe icon" width={16} height={16} />
            Go to nextjs.org →
          </a>
        </footer>
      </div>
    </>
  );
}
