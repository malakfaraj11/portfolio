'use client';

export default function DeleteButton({
  action,
  itemType
}: {
  action: () => Promise<void>;
  itemType: string;
}) {
  return (
    <button
      onClick={async () => {
        if (confirm(`Êtes-vous sûr de vouloir supprimer ce ${itemType} ?`)) {
          await action();
        }
      }}
      className="text-red-600 hover:text-red-900"
    >
      Supprimer
    </button>
  );
}
