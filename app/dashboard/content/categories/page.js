import SubmitButton from "@/app/_components/SubmitButton";
import {
  categoryCreate,
  categoryDelete,
  categoryEdit,
} from "@/app/_lib/actions";
import { getAllCategory } from "@/app/_lib/data-service";

export const dynamic = "force-dynamic"; // Mark the page as dynamic

export const metadata = {
  title: "Category Management",
};

export async function generateStaticParams() {
  const { categories } = await getAllCategory();

  const ids = categories.map((cat) => ({ id: cat._id }));

  return ids;
}

async function Page() {
  const { categories } = await getAllCategory();

  return (
    <main className="max-w-6xl mx-auto text-gray-900 p-8 h-screen bg-white">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">Manage Categories</h1>
      </header>

      {/* Form to Add New Category */}
      <section aria-labelledby="add-category-section" className="mb-6">
        <h2 id="add-category-section" className="sr-only">
          Add Category
        </h2>
        <form className="flex items-center gap-4" action={categoryCreate}>
          <label htmlFor="categoryName" className="sr-only">
            Category Name
          </label>
          <input
            type="text"
            name="name"
            className="border border-gray-300 p-2 rounded-lg w-64 text-gray-800"
            placeholder="Enter category name"
            required
          />
          <label htmlFor="categoryName" className="sr-only">
            Category Description
          </label>
          <input
            type="text"
            name="description"
            className="border border-gray-300 p-2 rounded-lg w-64 text-gray-800 flex-1"
            placeholder="Enter category description"
          />
          {/* <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Add Category
          </button> */}
          <SubmitButton pendingLabel="creating category...">
            Add Category
          </SubmitButton>
        </form>
      </section>

      {/* List of Categories */}
      <section aria-labelledby="category-list-section">
        <h2 id="category-list-section" className="sr-only">
          Category List
        </h2>
        <ul className="space-y-4">
          {categories?.map((category) => (
            <li
              key={category._id}
              className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow-md space-x-4"
            >
              {/* Edit Form */}
              <form
                className="flex-1 flex items-center space-x-4 w-full"
                action={categoryEdit}
              >
                <label htmlFor={`category-${category._id}`} className="sr-only">
                  Category Name
                </label>
                <input
                  id={`category-${category._id}`}
                  className="text-lg font-semibold text-gray-900 bg-transparent border border-gray-400 rounded-lg p-2"
                  defaultValue={category.name}
                  name="name"
                />
                <input
                  id={`category-${category._id}`}
                  className="text-lg font-semibold text-gray-900 bg-transparent border border-gray-400 rounded-lg p-2 flex-1"
                  defaultValue={category.description}
                  name="description"
                />
                <input
                  type="hidden"
                  name="categoryId"
                  value={category._id}
                  className="hidden"
                />
                <SubmitButton
                  pendingLabel={"Updating..."}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
                >
                  Edit
                </SubmitButton>
              </form>

              {/* Delete Form */}
              <form action={categoryDelete}>
                <input
                  type="hidden"
                  name="id"
                  value={category._id}
                  className="hidden"
                />
                <SubmitButton
                  pendingLabel={"Deleting..."}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200"
                >
                  Delete
                </SubmitButton>
              </form>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Page;
