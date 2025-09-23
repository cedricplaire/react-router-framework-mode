import { GlobeAltIcon } from '@heroicons/react/24/outline';

export default function AcmeLogo({ open }: { open: boolean }) {
  return (
    <div
      className={`flex flex-row items-center leading-none text-white`}
    >
      <GlobeAltIcon strokeWidth={0.8}  className="h-12 w-12 rotate-[16deg] stroke-purple-500" />
      <p className={`${open ? 'block' : 'hidden'} text-[44px]`}>Acme</p>
    </div>
  );
}
