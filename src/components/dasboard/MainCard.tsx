import { ReactNode } from 'react';

type MainCardProps = {
  id: string | number
  icon: ReactNode;
  name: string;
};

function MainCard(props: MainCardProps) {
  return (
    <div className="col-span-full sm:col-span-6 xl:col-span-3 bg-white shadow-lg rounded-sm border border-slate-200">
      <div className="flex flex-col h-full text-center p-5">
        <div className="grow mb-1">
          <div className="inline-flex justify-center items-center w-12 h-12 bg-slate-100 rounded-full mb-2">
            {props.icon}
          </div>
          <h3 className="text-lg text-slate-800 font-semibold mb-1">{props.name}</h3>
        </div>
        <div>
          {/* <a className="text-sm font-medium text-indigo-500 hover:text-indigo-600" href="#0">Explore -&gt;</a> */}
        </div>
      </div>
    </div>
  );
}

export default MainCard;
