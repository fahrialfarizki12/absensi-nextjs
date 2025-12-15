const LoadingSuspense = () => {
  return (
    <>
      {[1, 2, 3, 4].map((index) => (
        <div key={index} className="flex  w-80 flex-col gap-4">
          <div className="skeleton bg-white h-32 w-full"></div>
          <div className="skeleton bg-white h-4 w-28"></div>
          <div className="skeleton bg-white h-4 w-full"></div>
          <div className="skeleton bg-white h-4 w-full"></div>
        </div>
      ))}
    </>
  );
};

export default LoadingSuspense;
