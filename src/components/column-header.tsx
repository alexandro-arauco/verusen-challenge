export default function ColumnHeader({ label }: { label: string }) {
  return (
    <th className="px-6 py-3 bg-gray-100 dark:bg-gray-800 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider border-b border-gray-200 dark:border-gray-700 sticky top-0">
      {label}
    </th>
  );
}
