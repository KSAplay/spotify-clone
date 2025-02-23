const UsersListSkeleton = () => {
  return Array.from({ length: 4 }).map((_, i) => (
    <div
      key={i}
      className="flex animate-pulse items-center justify-center gap-3 rounded-lg p-3 lg:justify-start"
    >
      <div className="h-12 w-12 rounded-full bg-zinc-800" />
      <div className="hidden flex-1 lg:block">
        <div className="mb-2 h-4 w-24 rounded bg-zinc-800" />
        <div className="h-3 w-32 rounded bg-zinc-800" />
      </div>
    </div>
  ));
};
export default UsersListSkeleton;
