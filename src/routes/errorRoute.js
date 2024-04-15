import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  return (
    <section className="h-screen w-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold">Oops!</h1>
      <p className="mt-4 text-xl font-medium">
        Sorry, an unexpected error has occurred.
      </p>
      <p className="mt-2 text-ellipsis">
        <i>{error.statusText || error.message}</i>
      </p>
    </section>
  );
};

export default ErrorPage;
