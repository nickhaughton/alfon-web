export const Wrapper = ({ step, description, contents }) => {
  return (
    <div className="bg-white rounded-xl w-full flex-col flex-1 py-4 px-4 space-y-4 ">
      <div className="flex justify-end">
        <span className="bg-counter-bg font-semibold rounded-full w-8 h-8 flex justify-center items-center text-sm text-pnpl">
          {step}/2
        </span>
      </div>
      <div className="text-left">{description}</div>
      <div>{contents}</div>
    </div>
  );
};
