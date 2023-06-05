export default function Comment({ onPost }) {
    const handleSubmit = (e) => {
        e.preventDefault()
        const { name, comment } = e.target.elements
        onPost(comment.value, name.value)
    }
    return (
        <form action="#" onSubmit={(e) => handleSubmit(e)} className="relative">
            <div className="overflow-hidden rounded-lg border border-gray-300 shadow-sm focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
                <label htmlFor="name" className="sr-only">
                    Name
                </label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    className="block w-full border-0 pt-2.5 text-lg font-medium placeholder:text-gray-400 focus:ring-0"
                    placeholder="Name (Leave blank to post as Anonymous)"
                />
                <label htmlFor="comment" className="sr-only">
                    Description
                </label>
                <textarea
                    rows={2}
                    name="comment"
                    id="comment"
                    className="block w-full resize-none border-0 py-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Write a comment..."
                    defaultValue={''}
                />

                {/* Spacer element to match the height of the toolbar */}
                <div aria-hidden="true">
                    <div className="py-2">
                        <div className="h-9" />
                    </div>
                    <div className="h-px" />
                    <div className="py-2">
                        <div className="py-px">
                            <div className="h-9" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="absolute inset-x-px bottom-0">
                <div className="flex items-center justify-end space-x-3 border-t border-gray-200 px-2 py-2 sm:px-3">
                    <div className="flex-shrink-0">
                        <button
                            type="submit"
                            className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Post
                        </button>
                    </div>
                </div>
            </div>
        </form>
    )
}
