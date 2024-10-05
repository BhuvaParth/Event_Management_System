import React from 'react'

export default function EditEvent() {
  return (
    <>
      <div className="container mx-auto max-w-4xl p-6 bg-white shadow-lg mt-10 rounded-lg mb-16">
        <h1 className="text-2xl font-bold mb-6">Add Recipe</h1>

        <form>
          <div className="mb-4">
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700"
            >
              Image URL
            </label>
            <input
              type="url"
              id="image"
              name="image"
              placeholder="Enter image URL"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            <p className="text-red-500 text-sm"></p>
          </div>

          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Recipe title"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            <p className="text-red-500 text-sm"></p>
          </div>

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows="4"
              placeholder="Enter recipe description"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            ></textarea>
              <p className="text-red-500 text-sm"></p>
          </div>

          <div className="mb-4">
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Price (USD)
            </label>
            <input
              type="number"
              id="price"
              name="price"
              placeholder="e.g., 15"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
              <p className="text-red-500 text-sm"></p>
          </div>

          <div className="mb-6">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
            >
              Submit Recipe
            </button>
          </div>
        </form>
      </div>
    </>
  )
}
