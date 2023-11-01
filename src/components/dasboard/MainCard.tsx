import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';

type MainCardProps = {
  id: string | number
  link: string;
  image: HTMLImageElement | StaticImageData;
  name: string;
};

function MainCard(props: MainCardProps) {
  return (
    <div className="col-span-full sm:col-span-6 xl:col-span-3 bg-white shadow-lg rounded-sm border border-slate-200">
      <div className="flex flex-col h-full">
        {/* Card top */}
        <div className="grow p-5">

          {/* Image + name */}
          <header>
            <div className="flex justify-center mb-2">
              <Link className="relative inline-flex items-start" href={props.link}>
                <div className="absolute top-0 right-0 -mr-2 bg-white rounded-full shadow" aria-hidden="true">
                  <svg className="w-8 h-8 fill-current text-amber-500" viewBox="0 0 32 32">
                    <path
                      d="M21 14.077a.75.75 0 01-.75-.75 1.5 1.5 0 00-1.5-1.5.75.75 0 110-1.5 1.5 1.5 0 001.5-1.5.75.75 0 111.5 0 1.5 1.5 0 001.5 1.5.75.75 0 010 1.5 1.5 1.5 0 00-1.5 1.5.75.75 0 01-.75.75zM14 24.077a1 1 0 01-1-1 4 4 0 00-4-4 1 1 0 110-2 4 4 0 004-4 1 1 0 012 0 4 4 0 004 4 1 1 0 010 2 4 4 0 00-4 4 1 1 0 01-1 1z"
                    />
                  </svg>
                </div>
                <Image className="rounded-full" src={props.image} width="64" height="64" alt={props.name} />
              </Link>
            </div>
            <div className="text-center">
              <Link className="inline-flex text-slate-800 hover:text-slate-900" href={props.link}>
                <h2 className="text-xl leading-snug justify-center font-semibold">{props.name}</h2>
              </Link>
            </div>

          </header>
          {/* Bio */}

        </div>
      </div>
    </div >
  );
}

export default MainCard;
