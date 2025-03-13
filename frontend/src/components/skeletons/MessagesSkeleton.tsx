const MessagesSkeleton = () => {
  return (
    <div className="space-y-4 p-4">
      {Array(3)
        .fill(0)
        .map((_, index) => (
          <div key={index} className="mb-5 flex animate-pulse flex-col gap-5">
            <div className="flex h-12 w-full justify-start gap-3">
              <div className="h-12 w-12 rounded-full bg-zinc-800" />
              <div className="flex flex-col items-start justify-center">
                <div className="mb-2 h-4 w-32 rounded bg-zinc-800" />
                <div className="h-3 w-24 rounded bg-zinc-800" />
              </div>
            </div>
            <div className="flex h-12 w-full justify-end gap-3">
              <div className="flex flex-col items-end justify-center">
                <div className="mb-2 h-4 w-32 rounded bg-zinc-800" />
                <div className="h-3 w-24 rounded bg-zinc-800" />
              </div>
              <div className="h-12 w-12 rounded-full bg-zinc-800" />
            </div>
          </div>
        ))}
    </div>
  );
};

export default MessagesSkeleton;
