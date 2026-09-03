"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  BookOpen,
  HeartPulse,
  Home,
  Info,
  LogIn,
  Mail,
  Menu,
  Newspaper,
  Users,
  X,
} from "lucide-react";

const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "About", href: "/public/about", icon: Info },
  { name: "Bible Study", href: "/public/bible-study", icon: BookOpen },
  { name: "Health Corner", href: "/public/health", icon: HeartPulse },
  { name: "Family Life Corner", href: "/public/family", icon: Users },
  { name: "Articles", href: "/public/articles", icon: Newspaper },
  { name: "Contacts", href: "/public/contacts", icon: Mail },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile menu button */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Open navigation"
        className="
          fixed left-4 top-4 z-50
          rounded-xl bg-sam-deep-blue p-2.5
          text-white shadow-lg
          transition-all duration-200
          hover:bg-sam-blue-dark hover:shadow-xl
          lg:hidden
        "
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Mobile overlay */}
      {isOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={() => setIsOpen(false)}
          className="
            fixed inset-0 z-40
            bg-sam-deep-blue/40
            backdrop-blur-sm
            lg:hidden
          "
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 flex w-72
          -translate-x-full flex-col
          overflow-y-auto
          bg-sam-surface shadow-2xl
          transition-transform duration-300 ease-in-out

          lg:sticky lg:top-0 lg:z-0
          lg:h-screen lg:translate-x-0
          lg:border-r lg:border-sam-border
          lg:shadow-none

          ${isOpen ? "translate-x-0" : ""}
        `}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-sam-deep-blue px-5 py-4 text-white shadow-md">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2"
            >
              <Image
                src="/images/brand/secondadvent2.png"
                alt="Second Advent Ministries Logo"
                width={40}
                height={40}
                className="h-10 w-10 rounded-full object-cover"
                priority
              />

              <div>
                <h2 className="text-lg font-bold text-sam-yellow">
                  Second Advent
                </h2>

                <p className="text-sm text-sam-blue">
                  Ministries
                </p>
              </div>
            </Link>

            {/* Mobile close button */}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close navigation"
              className="
                rounded-lg p-2
                text-white/80
                transition
                hover:bg-white/10 hover:text-white
                lg:hidden
              "
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-5">
          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-sam-muted">
            Navigation
          </p>

          <ul className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="
                      group flex items-center gap-3
                      rounded-xl px-3 py-3
                      text-sm font-medium text-sam-text
                      transition-all duration-200
                      hover:bg-sam-blue/10
                      hover:text-sam-deep-blue
                    "
                  >
                    <span
                      className="
                        flex h-9 w-9 shrink-0 items-center justify-center
                        rounded-lg bg-slate-100 text-sam-muted
                        transition-all duration-200
                        group-hover:bg-sam-blue
                        group-hover:text-white
                      "
                    >
                      <Icon className="h-5 w-5" />
                    </span>

                    <span>{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Sidebar footer */}
        <div className="space-y-3 px-4 pb-5">
          {/* Scripture */}
          <div className="rounded-2xl bg-sam-deep-blue p-4 text-center">
            <p className="text-sm font-medium leading-6 text-white">
              &quot;Fear God, and give glory to Him...&quot;
            </p>

            <p className="mt-2 text-xs font-semibold text-sam-yellow">
              Revelation 14:7
            </p>
          </div>

          {/* Admin Login */}
          <Link
            href="/admin/auth/login"
            onClick={() => setIsOpen(false)}
            className="
              group flex items-center justify-center gap-2
              rounded-xl border border-sam-border
              px-4 py-2.5
              text-sm font-medium text-sam-muted
              transition-all duration-200
              hover:border-sam-blue
              hover:bg-sam-blue/10
              hover:text-sam-deep-blue
            "
          >
            <LogIn
              className="
                h-4 w-4
                transition-transform duration-200
                group-hover:translate-x-0.5
              "
            />

            <span>Admin Login</span>
          </Link>
        </div>
      </aside>
    </>
  );
}
