"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";

export function MobileNav() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="md:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <div className="flex flex-col gap-6 py-6">
          <Link
            href="/"
            className="text-2xl font-bold text-gradient w-fit"
            onClick={() => setOpen(false)}
          >
            Watchflicks
          </Link>

          <nav className="flex flex-col gap-4">
            <Link
              href="/"
              className="text-lg font-medium hover:text-primary transition-colors"
              onClick={() => setOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/tv"
              className="text-lg font-medium hover:text-primary transition-colors"
              onClick={() => setOpen(false)}
            >
              TV Shows
            </Link>
            {session && (
              <Link
                href="/dashboard"
                className="text-lg font-medium hover:text-primary transition-colors"
                onClick={() => setOpen(false)}
              >
                My List
              </Link>
            )}
          </nav>

          <div className="border-t border-border pt-6 flex flex-col gap-4">
            {session ? (
              <>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                    {session.user?.name?.[0]?.toUpperCase() || "U"}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium">{session.user?.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {session.user?.email}
                    </span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  onClick={() => {
                    signOut();
                    setOpen(false);
                  }}
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setOpen(false)}>
                  <Button variant="outline" className="w-full">
                    Sign In
                  </Button>
                </Link>
                <Link href="/register" onClick={() => setOpen(false)}>
                  <Button className="w-full">Get Started</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
