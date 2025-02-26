import EditDetail from "@/components/detail/edit-detail";
import { title } from "@/components/primitives";
import { useDataContext } from "@/context/DataContext";
import { Material } from "@/interfaces/materials";
import DefaultLayout from "@/layouts/default";
import { Card, CardBody, CardHeader, Chip, Link } from "@heroui/react";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function DetailPage() {
  const { id } = useParams();
  const { data } = useDataContext();

  const [isOpen, setIsOpen] = useState(false);
  const item = data.find((item) => item.id === Number(id)) as Material;

  const onClose = () => setIsOpen(false);

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1
            className={`${title()} bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent`}
          >
            Item Details
          </h1>
        </div>
      </section>

      <Card className="max-w-[100%] mx-auto shadow-xl hover:shadow-2xl transition-all duration-300 mb-8">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-8">
          <div className="flex flex-row items-center gap-4">
            <h1 className="text-center font-bold text-4xl">{item.name}</h1>
            <Chip className="bg-white/20 backdrop-blur-md text-white border-none">
              {item.category}
            </Chip>
          </div>
        </CardHeader>
        <CardBody className="p-8 space-y-8">
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <svg
                className="w-5 h-5 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Description
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
              {item.long_description || "No description available."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 transform hover:scale-105 transition-transform">
              <h2 className="text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
                Manufacturer
              </h2>
              <p className="text-xl font-medium mt-2">
                {item.manufacturer_name}
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 transform hover:scale-105 transition-transform">
              <h2 className="text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Unit Price
              </h2>
              <p className="text-xl font-medium mt-2 text-blue-600 dark:text-blue-400">
                ${Number(item.requested_unit_price).toLocaleString()}
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              className="px-6 py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
              onClick={() => setIsOpen(true)}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
              Edit Item
            </button>
            <Link
              href="/"
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Back to List
            </Link>
          </div>
        </CardBody>
      </Card>

      {isOpen && item && (
        <EditDetail isOpen={isOpen} onClose={onClose} data={item} />
      )}
    </DefaultLayout>
  );
}
