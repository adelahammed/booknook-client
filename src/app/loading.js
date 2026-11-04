export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[65vh] space-y-4">
      <div className="relative h-16 w-16">
        <div className="absolute inset-0 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
        <div className="absolute inset-2 rounded-full border-4 border-amber-500/20 border-b-amber-500 animate-spin animate-reverse" />
      </div>
      <p className="text-sm font-semibold tracking-wide text-muted-foreground animate-pulse">
        Loading BookNook...
      </p>
    </div>
  );
}
