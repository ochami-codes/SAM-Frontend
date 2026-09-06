"use client";

import {
  QueryClientProvider,
} from "@tanstack/react-query";

import { queryClient } from "@/src/lib/query/queryClient";

interface QueryProviderProps {
  children: React.ReactNode;
}

export default function QueryProvider({
  children,
}: QueryProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}