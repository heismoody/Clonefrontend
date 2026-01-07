import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute inset-0 bg-[url('https://assets.nflxext.com/ffe/siteui/pages/errors/bg-lost-in-space.png')] bg-cover bg-center opacity-50" />
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      <div className="relative z-10 text-center px-4 max-w-2xl mx-auto">
        <h1 className="text-7xl md:text-9xl font-bold text-primary mb-8 animate-pulse">
          404
        </h1>
        <h2 className="text-3xl md:text-5xl font-bold mb-6">Lost in Space?</h2>
        <p className="text-xl text-gray-300 mb-12">
          We can't find the page you're looking for. You'll find loads to
          explore on the home page.
        </p>

        <Link href="/">
          <Button size="lg" className="text-lg px-8 py-6 hover-scale">
            Popcorns Home
          </Button>
        </Link>

        <div className="mt-12 text-sm text-muted-foreground">
          Error Code: NSES-404
        </div>
      </div>
    </div>
  );
}
