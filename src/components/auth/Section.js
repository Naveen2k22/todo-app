const Section = ({ children }) => {
  return (
    <section className="flex w-full flex-col items-center justify-between">
      {children}
    </section>
  );
};

export default Section;
