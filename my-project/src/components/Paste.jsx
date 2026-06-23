import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"             
import { removeFromPastes } from "../redux/pasteSlice"
import toast from "react-hot-toast"

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes)
  const [searchTerm, setSearchTerm] = useState("")
  const dispatch = useDispatch()

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId))
    toast.success("Paste deleted!")
  }

  
  function handleShare(paste) {
    if (navigator.share) {
      navigator.share({
        title: paste.title,
        text: paste.content,
        url: `${window.location.origin}/pastes/${paste._id}`,
      }).catch(() => {}) // user cancelled share — not an error
    } else {
      // Fallback: copy share link to clipboard
      navigator.clipboard.writeText(
        `${window.location.origin}/pastes/${paste._id}`
      )
      toast.success("Share link copied!")
    }
  }

  
  function formatDate(isoString) {
    return new Date(isoString).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    })
  }

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-10">
      <div className="mx-auto max-w-2xl">

       
        <div className="mb-8">
          <h1
            className="mb-4 text-3xl font-bold text-white"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            My Pastes
          </h1>
          <input
            type="text"
            placeholder="Search by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
          />
        </div>

       
        {pastes.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-700 p-12 text-center">
            <p className="text-2xl mb-2">📋</p>
            <p className="font-semibold text-white">No pastes yet</p>
            <p className="mt-1 text-sm text-slate-400">
              Create your first paste to see it here.
            </p>
            <Link
              to="/"
              className="mt-4 inline-block rounded-xl bg-violet-600 px-5 py-2 text-sm font-semibold text-white hover:bg-violet-500 transition"
            >
              Create Paste
            </Link>
          </div>
        )}

     
        {pastes.length > 0 && filteredData.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-700 p-10 text-center">
            <p className="font-semibold text-white">No results for "{searchTerm}"</p>
            <p className="mt-1 text-sm text-slate-400">Try a different title.</p>
          </div>
        )}

        {/* Paste cards */}
        <div className="flex flex-col gap-4">
          {filteredData.map((paste) => (  
            <div
              key={paste._id}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-md transition hover:border-slate-700"
            >
              {/* Title + date */}
              <div className="mb-1 flex items-start justify-between gap-2">
                <h3 className="text-base font-semibold text-white">{paste.title}</h3>
                
                <span className="shrink-0 text-xs text-slate-500">{formatDate(paste.createdAt)}</span>
              </div>

             
              <p className="mb-4 line-clamp-3 font-mono text-sm text-slate-400">
                {paste.content}
              </p>

             
              <div className="flex flex-wrap gap-2">

                
                <Link
                  to={`/?PasteId=${paste._id}`}
                  className="rounded-lg border border-slate-700 px-3 py-1.5 text-xs font-medium text-slate-300 transition hover:border-violet-500 hover:text-violet-400"
                >
                  Edit
                </Link>

                <Link
                  to={`/pastes/${paste._id}`}
                  className="rounded-lg border border-slate-700 px-3 py-1.5 text-xs font-medium text-slate-300 transition hover:border-violet-500 hover:text-violet-400"
                >
                  View
                </Link>

                <button
                  onClick={() => handleDelete(paste._id)}
                  className="rounded-lg border border-slate-700 px-3 py-1.5 text-xs font-medium text-slate-300 transition hover:border-red-500 hover:text-red-400"
                >
                  Delete
                </button>

                <button
                  onClick={() => {
                    navigator.clipboard.writeText(paste.content)
                    toast.success("Copied to clipboard!")   
                  }}
                  className="rounded-lg border border-slate-700 px-3 py-1.5 text-xs font-medium text-slate-300 transition hover:border-violet-500 hover:text-violet-400"
                >
                  Copy
                </button>

               
                <button
                  onClick={() => handleShare(paste)}
                  className="rounded-lg border border-slate-700 px-3 py-1.5 text-xs font-medium text-slate-300 transition hover:border-violet-500 hover:text-violet-400"
                >
                  Share
                </button>

              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default Paste
