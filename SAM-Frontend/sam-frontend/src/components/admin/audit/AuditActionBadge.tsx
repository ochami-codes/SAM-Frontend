interface AuditActionBadgeProps {
  action: string;
}

const actionStyles: Record<string, string> = {
  LOGIN_SUCCESS: "bg-green-50 text-green-700 border-green-200",
  LOGIN_FAILED: "bg-red-50 text-red-700 border-red-200",
  LOGIN_BLOCKED: "bg-red-100 text-red-800 border-red-300",
  LOGOUT: "bg-gray-100 text-gray-700 border-gray-200",

  PASSWORD_CHANGED: "bg-blue-50 text-blue-700 border-blue-200",
  PASSWORD_RESET: "bg-blue-50 text-blue-700 border-blue-200",

  ADMIN_INVITED: "bg-purple-50 text-purple-700 border-purple-200",
  ADMIN_INVITATION_RESENT: "bg-purple-50 text-purple-700 border-purple-200",
  ADMIN_INVITATION_CANCELLED: "bg-red-50 text-red-700 border-red-200",
  ADMIN_INVITATION_ACCEPTED: "bg-green-50 text-green-700 border-green-200",
  ADMIN_SUSPENDED: "bg-red-50 text-red-700 border-red-200",
  ADMIN_ACTIVATED: "bg-green-50 text-green-700 border-green-200",

  CONTENT_CREATED: "bg-blue-50 text-blue-700 border-blue-200",
  CONTENT_UPDATED: "bg-yellow-50 text-yellow-700 border-yellow-200",
  CONTENT_PUBLISHED: "bg-green-50 text-green-700 border-green-200",
  CONTENT_UNPUBLISHED: "bg-orange-50 text-orange-700 border-orange-200",
  CONTENT_DELETED: "bg-red-50 text-red-700 border-red-200",

  MEDIA_UPLOADED: "bg-green-50 text-green-700 border-green-200",
  MEDIA_DELETED: "bg-red-50 text-red-700 border-red-200",

  SETTINGS_UPDATED: "bg-blue-50 text-blue-700 border-blue-200",

  CONTACT_MESSAGE_READ: "bg-blue-50 text-blue-700 border-blue-200",
  CONTACT_MESSAGE_ARCHIVED: "bg-gray-100 text-gray-700 border-gray-200",
};

function formatAction(action: string): string {
  return action
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function AuditActionBadge({
  action,
}: AuditActionBadgeProps) {
  const styles =
    actionStyles[action] ??
    "bg-gray-100 text-gray-700 border-gray-200";

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${styles}`}
    >
      {formatAction(action)}
    </span>
  );
}