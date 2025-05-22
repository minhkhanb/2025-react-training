'use client';

import Link from 'next/link';
import Image from 'next/image';
import Logo from '@src/assets/images/logo.svg';
import MainForm from '@src/components/common/MainForm';
import { Button, Form, Input } from '@src/components/ui';

const Footer = () => {
  return (
    <footer>
      <div>
        <div>
          <Link href={'/'}>
            <Image src={Logo} alt="Logo" priority className="w-auto h-auto" />
          </Link>
          <div className="h-32 w-px bg-gray-950/10" />
          <div>
            <p>Virtual Class for Zoom</p>
          </div>
        </div>
      </div>
      <div>
        <div>
          <h3>Subscribe to our newsletter</h3>
        </div>
        <div>
          <MainForm>
            <div>
              <Form.Field component={Input} name="email" placeholder="Your email" />
              <Button.Submit>Subscribe</Button.Submit>
            </div>
          </MainForm>
        </div>
      </div>
      <div>
        <div className="flex items-center gap-2">
          <Link href={'/careers'}>Careers</Link>
          <div className="h-3 w-px bg-gray-950/10" />
          <Link href={'/privacy-policy'}>Privacy Policy</Link>
          <div className="h-3 w-px bg-gray-950/10" />
          <Link href={'/term-conditions'}>Term & Conditions</Link>
        </div>
        <p>© 2025 Class Technologies Inc.</p>
      </div>
    </footer>
  );
};

export default Footer;
