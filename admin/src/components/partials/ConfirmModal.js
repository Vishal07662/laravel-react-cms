import { useState } from "react";

export default function ConfirmModal({ onConfirm, children }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)} className="bg-red-500 px-2 py-1 rounded text-white">
        {children}
      </button>

      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-lg font-bold mb-4">Are you sure?</h2>
            <div className="flex justify-end space-x-2">
              <button onClick={() => setOpen(false)} className="px-3 py-1 bg-gray-300 rounded">
                Cancel
              </button>
              <button
                onClick={() => { onConfirm(); setOpen(false); }}
                className="px-3 py-1 bg-red-600 text-white rounded"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
