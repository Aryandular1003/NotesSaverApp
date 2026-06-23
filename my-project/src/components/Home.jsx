import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useSearchParams } from "react-router-dom"       
import { addToPastes, updateToPastes } from "../redux/pasteSlice"
import toast from "react-hot-toast"                     

const Home = () => {
  const [title, setTitle] = useState("")
  const [value, setValue] = useState("")                

  
  const [searchParams, setSearchParams] = useSearchParams()
  const pasteId = searchParams.get("PasteId")

  const allPastes = useSelector((state) => state.paste.pastes)
  const dispatch = useDispatch()

 
  useEffect(() => {
    if (pasteId) {
      const paste = allPastes.find((p) => p._id === pasteId)

     
      if (!paste) {
        toast.error("Paste not found!")
        setSearchParams({})
        return
      }

      setTitle(paste.title)
      setValue(paste.content)
    }
  }, [pasteId, allPastes])

  function createPaste() {
    
    if (!title.trim()) {
      toast.error("Title cannot be empty!")
      return
    }
    if (!value.trim()) {
      toast.error("Content cannot be empty!")
      return
    }

    const paste = {
      title: title.trim(),
      content: value.trim(),
      _id: pasteId || crypto.randomUUID(),             
      createdAt: new Date().toISOString(),
    }

    if (pasteId) {
      dispatch(updateToPastes(paste))
      toast.success("Paste updated!")                    
    } else {
      dispatch(addToPastes(paste))
      toast.success("Paste created!")                    
    }

    setTitle("")
    setValue("")
    setSearchParams({})                                  
  }

  return (
    <div className=" h-max bg-slate-950 px-4 py-10">
      <div className="mx-auto max-w-3xl">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            {pasteId ? "Edit Paste" : "New Paste"}
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            {pasteId ? "Update your paste below." : "Write something worth saving."}
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl">

          {/* Title row */}
          <div className="mb-5">
            <label
              htmlFor="title"
              className="mb-1.5 block text-sm font-medium text-slate-300"
            >
              Title
            </label>
            <div className="flex gap-3">
              
              <input
                id="title"
                type="text"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Give your paste a title..."
                className="flex-1 rounded-xl border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
              />
              <button
                onClick={createPaste}
                className="rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:bg-violet-500 active:scale-95"
              >
                {pasteId ? "Update" : "Save Paste"}
              </button>
            </div>
          </div>

          {/* Content */}
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
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Paste your text, code, or notes here..."
              rows={20}
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 font-mono text-sm text-slate-200 placeholder-slate-500 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 resize-none"
            />
          </div>
        
          {/* Footer info */}
          {pasteId && (
            <p className="mt-3 text-xs text-slate-500">
              Editing paste ID: <span className="font-mono text-violet-400">{pasteId}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Home