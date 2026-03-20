export default function GlobalProtectedLoading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] w-full gap-4">
      {/* A nice, elegant spinner */}
      <div className="h-10 w-10 border-4 border-zinc-200 border-t-blue-600 rounded-full animate-spin" />
      <p className="text-zinc-500 font-medium animate-pulse tracking-tight">
        Loading...
      </p>
    </div>
  );
}