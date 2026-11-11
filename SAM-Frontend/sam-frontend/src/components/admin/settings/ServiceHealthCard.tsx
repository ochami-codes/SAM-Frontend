import {
  Cloud,
  Database,
  Code2,
  Server,
} from "lucide-react";

import type {
  ServiceHealth,
} from "@/src/lib/api/systemHealth";

type ServiceName =
  | "backend"
  | "database"
  | "cloudinary"
  | "github";

interface ServiceHealthCardProps {
  name: ServiceName;
  health: ServiceHealth;
}

const serviceConfig = {
  backend: {
    label: "Backend API",
    description: "Application server",
    icon: Server,
  },
  database: {
    label: "Database",
    description: "MongoDB connection",
    icon: Database,
  },
  cloudinary: {
    label: "Cloudinary",
    description: "Media storage",
    icon: Cloud,
  },
  github: {
    label: "GitHub",
    description: "Repository integration",
    icon: Code2,
  },
};

export function ServiceHealthCard({
  name,
  health,
}: ServiceHealthCardProps) {
  const config = serviceConfig[name];
  const Icon = config.icon;

  const isOperational =
    health.status === "operational";

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-gray-100 p-2">
            <Icon
              className="h-5 w-5 text-gray-600"
              aria-hidden="true"
            />
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900">
              {config.label}
            </h3>

            <p className="text-xs text-gray-500">
              {config.description}
            </p>
          </div>
        </div>

        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
            isOperational
              ? "bg-green-50 text-green-700"
              : "bg-red-50 text-red-700"
          }`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              isOperational
                ? "bg-green-500"
                : "bg-red-500"
            }`}
          />

          {isOperational ? "Operational" : "Down"}
        </span>
      </div>

      <p className="mt-4 text-sm text-gray-600">
        {health.message}
      </p>

      <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
        <span className="text-xs text-gray-500">
          Response time
        </span>

        <span className="text-sm font-medium text-gray-900">
          {health.responseTime !== null
            ? `${health.responseTime} ms`
            : "Unavailable"}
        </span>
      </div>
    </div>
  );
}