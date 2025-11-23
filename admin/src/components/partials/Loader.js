// components/Loader.js
export default function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
      <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-white"></div>
    </div>
  );
}
