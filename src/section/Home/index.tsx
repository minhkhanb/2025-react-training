import Image from 'next/image';
import HeaderBackground from '@src/assets/images/header-bg.svg';
import { Button } from '@src/components/ui';
import Link from 'next/link';
import WatchNow from '@src/assets/images/watch-now.svg';
import Calendar from '@src/assets/images/calendar.svg';
import { Avatar, AvatarImage } from '@src/components/shadcn/ui/avatar';
import Vector from '@src/assets/images/vector.svg';
import Email from '@src/assets/images/email.svg';
import Student from '@src/assets/images/student.png';
import Billing from '@src/assets/images/billing.svg';
import User from '@src/assets/images/user.svg';

const Home = () => {
  return (
    <>
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
            <Avatar>
              <AvatarImage src="https://dhseedharvestco.com/cdn/shop/products/bee_3_2eb275c2-0079-4484-8325-3973376e88b8_1400x.jpg?v=1681981193" />
            </Avatar>
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
          <h2>Our Success</h2>
          <p>
            Ornare id fames interdum porttitor nulla turpis etima. Diam vitae sollicitudin at nec
            nam et pharetra gravida. Adipiscing a quis ultrices eu omare tristique vel nisl orci.
          </p>
        </div>
        <div>
          <div>
            <h3>15K+</h3>
            <p>Students</p>
          </div>
          <div>
            <h3>75%</h3>
            <p>Total success</p>
          </div>
          <div>
            <h3>35</h3>
            <p>Main questions</p>
          </div>
          <div>
            <h3>26</h3>
            <p>Chief experts</p>
          </div>
          <div>
            <h3>16</h3>
            <p>Years of experience</p>
          </div>
        </div>
      </section>

      <section>
        <div>
          <h2>All-In-One Cloud Software</h2>
          <p>
            TOTC is one powerful online software suite that combines all the tools needed to run a
            successful school or office.
          </p>
        </div>

        <div>
          <div>
            <div>
              <Image src={Billing} alt="" />
            </div>
            <div>
              <h3>Online Billing, Invoicing, & Contracts</h3>
              <p>
                Simple and secure control of your organization’s financial and legal transactions.
                Send customized invoices and contracts
              </p>
            </div>
          </div>

          <div>
            <div>
              <Image src={Calendar} alt="" />
            </div>
            <div>
              <h3>Easy Scheduling & Attendance Tracking</h3>
              <p>
                Schedule and reserve classrooms at one campus or multiple campuses. Keep detailed
                records of student attendance
              </p>
            </div>
          </div>

          <div>
            <div>
              <Image src={User} alt="" />
            </div>
            <div>
              <h3>Customer Tracking</h3>
              <p>
                Automate and track emails to individuals or groups. Skilline’s built-in system helps
                organize your organization
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
