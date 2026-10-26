import type { CloudinaryMediaReference } from "@/src/lib/api/media";

interface MediaContentReferencesProps {
  usedBy: CloudinaryMediaReference[];
}

export function MediaContentReferences({
  usedBy,
}: MediaContentReferencesProps) {
  const isInUse = usedBy.length > 0;

  return (
    <div className="border-t border-gray-100 pt-3">
      <p className="text-xs font-semibold text-gray-700">
        Managed content
      </p>

      {isInUse ? (
        <ul className="mt-2 space-y-2">
          {usedBy.map((content) => (
            <li
              key={content.id}
              className="text-xs text-gray-600"
            >
              <p className="font-medium text-gray-800">
                {content.title}
              </p>

              <p className="mt-0.5">
                {content.section}

                {content.category
                  ? ` · ${content.category}`
                  : ""}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-1 text-xs text-gray-500">
          Not used by managed content
        </p>
      )}
    </div>
  );
}