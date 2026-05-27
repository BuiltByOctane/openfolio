import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-screen max-w-xl flex-col justify-center px-6 py-16">
      <p className="text-xs tracking-widest text-neutral-500 uppercase">404</p>
      <h1 className="mt-3 text-3xl font-medium tracking-tight">Page not found.</h1>
      <Link
        href="/"
        className="mt-6 inline-block w-fit rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-black"
      >
        Back to home
      </Link>
    </div>
  );
}
