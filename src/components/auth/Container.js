const Container = ({ children }) => {
  return (
    <div
      className="box-content w-4/5 max-w-md rounded-md bg-white text-neutral-800 xs:w-4/5
        sm:w-3/5 md:w-1/2 lg:w-2/5 xl:w-1/3"
    >
      {children}
    </div>
  );
};

export default Container;
