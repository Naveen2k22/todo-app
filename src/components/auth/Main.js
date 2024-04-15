export const Main = ({ children }) => {
  return (
    <main
      className={`w-full 
            flex flex-col items-center justify-center mt-32
            `}
    >
      {children}
    </main>
  );
};
