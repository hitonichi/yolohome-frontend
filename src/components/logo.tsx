import Image from 'next/image';
import BlackLogo from '@/../../public/Logo_black.png';
import WhiteLogo from '@/../../public/Logo_white.png';
import { Home } from 'lucide-react';

const Logo = ({ type = 'black', size = 36, className }: { type?: string; size?: number; className?: string }) => {
  let src = BlackLogo;
  if (type == 'white') src = WhiteLogo;

  // return <Image src={src} width={size} height={size} alt="Logo" className={className} />;
  return <Home size={size} className={className} />;
};

export default Logo;
