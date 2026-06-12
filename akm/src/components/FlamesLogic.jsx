export default function FlamesLogic({ onClose }) {
  return (
    <div className="fixed inset-0 bg-white/90 z-50 flex flex-col items-center justify-center">
      <h2 className="text-3xl font-bold text-red-600 mb-8">FLAMES</h2>
      {/* Flames logic here as discussed before */}
      <button onClick={onClose} className="mt-6 px-6 py-2 bg-black text-white rounded">Close</button>
    </div>
  );
}