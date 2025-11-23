export default function PageNotFound() {
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div
          className="bg-white p-8 rounded-lg shadow-md w-96 text-center"
        >
          <h1 className="text-[32px]">404</h1>
          <p>Page not found</p>
          <a href="/">Go Home</a>
        </div>
      </div>
    </>
  );
}
