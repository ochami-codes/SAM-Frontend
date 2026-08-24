"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  Home,
  Info,
  Mail,
  BookOpen,
  HeartPulse,
  Users,
  Newspaper,
} from "lucide-react";

const navigation = [
  {
    name: "Home",
    href: "/",
    icon: Home,
  },
  {
    name: "About",
    href: "/about",
    icon: Info,
  },
  {
    name: "Bible Study",
    href: "/bible-study",
    icon: BookOpen,
  },
  {
    name: "Health Corner",
    href: "/health",
    icon: HeartPulse,
  },
  {
    name: "Family Life Corner",
    href: "/family-life",
    icon: Users,
  },
  {
    name: "Articles",
    href: "/articles",
    icon: Newspaper,
  },
  {
    name: "Contacts",
    href: "/contacts",
    icon: Mail,
  },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* =====================================
          MOBILE MENU BUTTON
      ===================================== */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Open navigation"
        className="
          fixed left-4 top-4 z-50
          rounded-xl
          bg-sam-deep-blue
          p-2.5
          text-white
          shadow-lg
          transition-all duration-200
          hover:bg-sam-blue-dark
          hover:shadow-xl
          lg:hidden
        "
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* =====================================
          MOBILE OVERLAY
      ===================================== */}
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

      {/* =====================================
          SIDEBAR
      ===================================== */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-72
          transform
          overflow-y-auto
          bg-sam-surface
          shadow-2xl
          transition-transform duration-300 ease-in-out

          lg:sticky
          lg:top-0
          lg:z-0
          lg:h-screen
          lg:translate-x-0
          lg:shadow-none
          lg:border-r
          lg:border-sam-border

          ${
            isOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        {/* =====================================
            SIDEBAR BRAND
        ===================================== */}
        <div className="bg-sam-deep-blue px-5 py-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-sam-yellow">
                Second Advent
              </h2>

              <p className="mt-1 text-sm text-sam-blue">
                Ministries
              </p>
            </div>

            {/* Mobile close button */}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close navigation"
              className="
                rounded-lg
                p-2
                text-white/80
                transition
                hover:bg-white/10
                hover:text-white
                lg:hidden
              "
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-5 h-1 w-12 rounded-full bg-sam-yellow" />
        </div>

        {/* =====================================
            NAVIGATION
        ===================================== */}
        <nav className="px-3 py-5">
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
                      group
                      flex
                      items-center
                      gap-3
                      rounded-xl
                      px-3
                      py-3
                      text-sm
                      font-medium
                      text-sam-text
                      transition-all
                      duration-200

                      hover:bg-sam-blue/10
                      hover:text-sam-deep-blue
                    "
                  >
                    <span
                      className="
                        flex
                        h-9
                        w-9
                        shrink-0
                        items-center
                        justify-center
                        rounded-lg
                        bg-slate-100
                        text-sam-muted
                        transition-all
                        duration-200

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

        {/* =====================================
            SIDEBAR FOOTER / VERSE
        ===================================== */}
        <div className="mt-auto px-4 pb-5">
          <div className="rounded-2xl bg-sam-deep-blue p-4 text-center">
            <p className="text-sm font-medium leading-6 text-white">
              "Fear God, and give glory to Him..."
            </p>

            <p className="mt-2 text-xs font-semibold text-sam-yellow">
              Revelation 14:7
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}