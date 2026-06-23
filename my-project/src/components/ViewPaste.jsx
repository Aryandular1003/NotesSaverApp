import { useSelector } from "react-redux"
import { useParams, useNavigate, Link } from "react-router-dom"
import toast from "react-hot-toast"

const ViewPaste = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const allPastes = useSelector((state) => state.paste.pastes)

 
  const paste = allPastes.find((p) => p?._id === id)

 
  if (!paste) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center gap-4">
        <p className="text-2xl font-bold text-white">Paste not found</p>
        <p className="text-sm text-slate-400">
          The ID <span className="font-mono text-violet-400">{id}</span> doesn't match any saved paste.
        </p>
        <button
          onClick={() => navigate("/")}
          className="rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-violet-500 transition"
        >
          Go Home
        </button>
      </div>
    )
  }

  
  const formattedDate = new Date(paste.createdAt).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  })

  function handleCopy() {
    navigator.clipboard.writeText(paste.content)
    toast.success("Copied to clipboard!")
  }

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-10">
      <div className="mx-auto max-w-3xl">

        {/* Header */}
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <p className="mb-1 text-xs font-medium uppercase tracking-widest text-violet-400">
              Viewing Paste
            </p>
            
            <p className="text-xs text-slate-500">Saved on {formattedDate}</p>
          </div>
          <div className="flex gap-2">
            {/* Copy button */}
            <button
              onClick={handleCopy}
              className="rounded-xl border border-slate-700 px-4 py-2 text-sm font-medium text-slate-300 transition hover:border-slate-500 hover:text-white"
            >
              Copy
            </button>
            {/* Edit button — navigates back to Home with PasteId in URL */}
            <Link
              to={`/?PasteId=${paste._id}`}
              className="rounded-xl bg-violet-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-violet-500"
            >
              Edit
            </Link>
          </div>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl">

          {/* Title  */}
          <div className="mb-5">
            <label
              htmlFor="title"
              className="mb-1.5 block text-sm font-medium text-slate-300"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              name="title"
              value={paste.title}        
              readOnly                   
              className="w-full rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-2.5 text-sm text-white outline-none cursor-default select-all"
              
            />
          </div>

          
          <div>
            <label
              htmlFor="content"
              className="mb-1.5 block text-sm font-medium text-slate-300"
            >
              Content
            </label>
            <textarea
              id="content"
              name="content"
              value={paste.content}       
              readOnly                    
              rows={20}
              className="w-full rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-3 font-mono text-sm text-slate-200 outline-none resize-none cursor-default"
              
            />
          </div>

          {/* Paste ID footer */}
          <p className="mt-3 text-xs text-slate-600">
            ID: <span className="font-mono text-slate-500">{paste._id}</span>
          </p>

        </div>
      </div>
    </div>
  
  )
}

export default ViewPaste
