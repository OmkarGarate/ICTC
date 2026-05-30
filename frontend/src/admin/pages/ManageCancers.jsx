// import { useState, useRef } from "react";
// import slugify from "slugify";
// import { useDropzone } from "react-dropzone";

// import { EditorContent, useEditor } from "@tiptap/react";

// import StarterKit from "@tiptap/starter-kit";
// import Image from "@tiptap/extension-image";
// import Placeholder from "@tiptap/extension-placeholder";
// import Underline from "@tiptap/extension-underline";
// import TextAlign from "@tiptap/extension-text-align";
// import Link from "@tiptap/extension-link";
// import Highlight from "@tiptap/extension-highlight";

// import "./ManageServices.css";
// import "./ManageCancers.css";

// const TABS = [
//   "Overview",
//   "Risk Factors",
//   "Symptoms",
//   "Diagnosis",
//   "Treatment",
//   "Do’s & Don’ts",
//   "FAQ's"
// ];

// const emptyCancer = {
//   name: "",
//   slug: "",
//   image: null,
//   altText: "",
//   metaTitle: "",
//   metaDescription: "",
//   faqs: []
// };

// const ManageCancers = () => {

//   const scrollRef = useRef();

//   const [cancers, setCancers] = useState([]);

//   const [activeTab, setActiveTab] =
//     useState("Overview");

//   const [tabContent, setTabContent] =
//     useState({});

//   const [cancer, setCancer] =
//     useState(emptyCancer);

//   const [faq, setFaq] = useState({
//     question: "",
//     answer: ""
//   });

//   const [previewHTML, setPreviewHTML] =
//     useState("");

//   const [previewOpen, setPreviewOpen] =
//     useState(false);

//   const [showModal, setShowModal] =
//     useState(false);

//   const [editId, setEditId] =
//     useState(null);

//   /* ================= IMAGE ================= */

//   const onDrop = (files) => {

//     setCancer({
//       ...cancer,
//       image: files[0]
//     });

//   };

//   const { getRootProps, getInputProps } =
//     useDropzone({
//       accept: { "image/*": [] },
//       onDrop
//     });

//   /* ================= EDITOR ================= */

//   const editor = useEditor({

//     extensions: [
//       StarterKit,
//       Image,
//       Highlight,
//       Underline,
//       Link.configure({
//         openOnClick: false
//       }),
//       TextAlign.configure({
//         types: ["heading", "paragraph"]
//       }),
//       Placeholder.configure({
//         placeholder:
//           "Start writing your cancer content..."
//       })
//     ],

//     content: "",

//     onUpdate({ editor }) {

//       setPreviewHTML(
//         editor.getHTML()
//       );

//     }

//   });

//   const addImage = () => {

//   const input = document.createElement("input");

//   input.type = "file";

//   input.accept = "image/*";

//   input.onchange = () => {

//     const file = input.files[0];

//     if (!file) return;

//     const reader = new FileReader();

//     reader.onload = () => {

//       editor
//         .chain()
//         .focus()
//         .setImage({
//           src: reader.result
//         })
//         .run();

//     };

//     reader.readAsDataURL(file);

//   };

//   input.click();

// };

//   /* ================= TAB SWITCH ================= */

//   const handleTabChange = (tab) => {

//     if (editor) {

//       setTabContent(prev => ({
//         ...prev,
//         [activeTab]: editor.getJSON()
//       }));

//       editor.commands.setContent(
//         tabContent[tab] || ""
//       );

//     }

//     setActiveTab(tab);

//   };

//   /* ================= FAQ ================= */

//   const addFAQ = () => {

//     if (!faq.question || !faq.answer)
//       return;

//     setCancer({
//       ...cancer,
//       faqs: [...cancer.faqs, faq]
//     });

//     setFaq({
//       question: "",
//       answer: ""
//     });

//   };

//   const deleteFAQ = (i) => {

//     setCancer({
//       ...cancer,
//       faqs: cancer.faqs.filter(
//         (_, index) => index !== i
//       )
//     });

//   };

//   /* ================= SAVE ================= */

//   const saveCancer = () => {

//     setTabContent(prev => ({
//       ...prev,
//       [activeTab]: editor.getJSON()
//     }));

//     const payload = {
//       id: editId || Date.now(),
//       ...cancer,
//       slug:
//         cancer.slug ||
//         slugify(cancer.name, {
//           lower: true
//         }),
//       content: {
//         ...tabContent,
//         [activeTab]:
//           editor.getJSON()
//       }
//     };

//     if (editId) {

//       setCancers(
//         cancers.map(c =>
//           c.id === editId
//             ? payload
//             : c
//         )
//       );

//     } else {

//       setCancers([
//         ...cancers,
//         payload
//       ]);

//     }

//     setCancer(emptyCancer);

//     setEditId(null);

//     setTabContent({});

//     editor.commands.clearContent();

//     setShowModal(false);

//   };

//   /* ================= EDIT ================= */

//   const handleEdit = (item) => {

//     setEditId(item.id);

//     setCancer(item);

//     setTabContent(item.content || {});

//     setShowModal(true);

//     const firstTabContent =
//       item.content?.Overview || "";

//     editor.commands.setContent(
//       firstTabContent
//     );

//     setActiveTab("Overview");

//   };

//   /* ================= DELETE ================= */

//   const handleDelete = (id) => {

//     if (!window.confirm(
//       "Delete cancer type?"
//     )) return;

//     setCancers(
//       cancers.filter(
//         c => c.id !== id
//       )
//     );

//   };

//   if (!editor) return null;

//   return (
//     <>
//       <div className="admin-centers-page">

//         {/* HEADER */}

//         <div className="admin-centers-header">

//           <h2>Manage Cancer Types</h2>

//           <button
//             className="admin-add-btn"
//             onClick={() => {

//               setCancer(emptyCancer);

//               setEditId(null);

//               setTabContent({});

//               setActiveTab("Overview");

//               editor.commands.clearContent();

//               setShowModal(true);

//             }}
//           >
//             + Add Cancer
//           </button>

//         </div>

//         {/* TABLE */}

//         <div className="admin-centers-table-wrapper">

//           <table className="admin-centers-table">

//             <thead>

//               <tr>
//                 <th>Image</th>
//                 <th>Name</th>
//                 <th>Slug</th>
//                 <th>Meta Title</th>
//                 <th>Actions</th>
//               </tr>

//             </thead>

//             <tbody>

//               {cancers.map(item => (

//                 <tr key={item.id}>

//                   <td>

//                     {item.image && (

//                       <img
//                         src={
//                           typeof item.image ===
//                           "string"
//                             ? item.image
//                             : URL.createObjectURL(
//                                 item.image
//                               )
//                         }
//                         className="admin-table-img"
//                         alt=""
//                       />

//                     )}

//                   </td>

//                   <td>{item.name}</td>

//                   <td>{item.slug}</td>

//                   <td>
//                     {item.metaTitle}
//                   </td>

//                   <td className="admin-actions">

//                     <button
//                       className="admin-edit-btn"
//                       onClick={() =>
//                         handleEdit(item)
//                       }
//                     >
//                       Edit
//                     </button>

//                     <button
//                       className="admin-delete-btn"
//                       onClick={() =>
//                         handleDelete(item.id)
//                       }
//                     >
//                       Delete
//                     </button>

//                   </td>

//                 </tr>

//               ))}

//             </tbody>

//           </table>

//         </div>

//       </div>

//       {/* MODAL */}

//       {showModal && (

//         <div className="admin-modal-overlay">

//           <div className="admin-modal">

//             <h3>
//               {editId
//                 ? "Edit Cancer"
//                 : "Add Cancer"}
//             </h3>

//             {/* TITLE */}

//             <label>
//               Cancer Name
//             </label>

//             <input
//               className="blog-title"
//               placeholder="Add cancer name here"
//               value={cancer.name}
//               onChange={(e) =>
//                 setCancer({
//                   ...cancer,
//                   name:
//                     e.target.value
//                 })
//               }
//             />

//             {/* IMAGE */}

//             <label>
//               Cover Image
//             </label>

//             <div
//               {...getRootProps()}
//               className="hero-upload"
//             >
//               <input
//                 {...getInputProps()}
//               />

//               Upload Image

//             </div>

//             {cancer.image && (

//               <img
//                 src={
//                   typeof cancer.image ===
//                   "string"
//                     ? cancer.image
//                     : URL.createObjectURL(
//                         cancer.image
//                       )
//                 }
//                 className="hero-preview"
//                 alt=""
//               />

//             )}

//             {/* SEO */}

//             <div className="seo-grid">

//               <div>

//                 <label>
//                   Alt Text
//                 </label>

//                 <input
//                   placeholder="Alt text"
//                   value={
//                     cancer.altText
//                   }
//                   onChange={(e) =>
//                     setCancer({
//                       ...cancer,
//                       altText:
//                         e.target
//                           .value
//                     })
//                   }
//                 />

//               </div>

//               <div>

//                 <label>
//                   SEO Title
//                 </label>

//                 <input
//                   placeholder="SEO title"
//                   value={
//                     cancer.metaTitle
//                   }
//                   onChange={(e) =>
//                     setCancer({
//                       ...cancer,
//                       metaTitle:
//                         e.target
//                           .value
//                     })
//                   }
//                 />

//               </div>

//             </div>

//             <label>
//               Meta Description
//             </label>

//             <textarea
//               placeholder="Meta description"
//               value={
//                 cancer.metaDescription
//               }
//               onChange={(e) =>
//                 setCancer({
//                   ...cancer,
//                   metaDescription:
//                     e.target.value
//                 })
//               }
//             />

//             <label>Slug</label>

//             <input
//               placeholder="slug"
//               value={cancer.slug}
//               onChange={(e) =>
//                 setCancer({
//                   ...cancer,
//                   slug:
//                     e.target.value
//                 })
//               }
//             />

//             {/* TABS */}

//             <div className="tabs-wrapper">

//               <button
//                 className="tab-arrow"
//                 onClick={() =>
//                   scrollRef.current.scrollBy({
//                     left: -200
//                   })
//                 }
//               >
//                 ‹
//               </button>

//               <div
//                 className="cancer-tabs-admin"
//                 ref={scrollRef}
//               >

//                 {TABS.map(tab => (

//                   <button
//                     key={tab}
//                     className={
//                       activeTab === tab
//                         ? "active"
//                         : ""
//                     }
//                     onClick={() =>
//                       handleTabChange(
//                         tab
//                       )
//                     }
//                   >
//                     {tab}
//                   </button>

//                 ))}

//               </div>

//               <button
//                 className="tab-arrow"
//                 onClick={() =>
//                   scrollRef.current.scrollBy({
//                     left: 200
//                   })
//                 }
//               >
//                 ›
//               </button>

//             </div>

//             {/* TOOLBAR */}

//             <div className="editor-toolbar">

//               <button onClick={() => editor.chain().focus().toggleBold().run()}>
//                 <b>B</b>
//               </button>

//               <button onClick={() => editor.chain().focus().toggleItalic().run()}>
//                 <i>I</i>
//               </button>

//               <button onClick={() => editor.chain().focus().toggleUnderline().run()}>
//                 <u>U</u>
//               </button>

//               <button onClick={() => editor.chain().focus().toggleStrike().run()}>
//                 S
//               </button>

//               <button onClick={() => editor.chain().focus().toggleHighlight().run()}>
//                 Highlight
//               </button>

//               <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>
//                 H1
//               </button>

//               <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
//                 H2
//               </button>

//               <button onClick={() => editor.chain().focus().setParagraph().run()}>
//                 P
//               </button>

//               <button onClick={() => editor.chain().focus().toggleBulletList().run()}>
//                 • List
//               </button>

//               <button onClick={() => editor.chain().focus().toggleOrderedList().run()}>
//                 1. List
//               </button>

//               <button onClick={() => editor.chain().focus().setTextAlign("left").run()}>
//                 Left
//               </button>

//               <button onClick={() => editor.chain().focus().setTextAlign("center").run()}>
//                 Center
//               </button>

//               <button onClick={() => editor.chain().focus().setTextAlign("right").run()}>
//                 Right
//               </button>

//               <button
//                 onClick={() => {

//                   const url = prompt("Enter URL");

//                   if (url) {

//                     editor
//                       .chain()
//                       .focus()
//                       .setLink({ href: url })
//                       .run();

//                   }

//                 }}
//               >
//                 Link
//               </button>

//               <button onClick={addImage}>
//                 Image
//               </button>

//             </div>

//             {/* EDITOR */}

//             <EditorContent
//               editor={editor}
//               className="notion-editor"
//             />

//             {/* FAQ */}

//             <h3
//               style={{
//                 marginTop: "40px"
//               }}
//             >
//               FAQS
//             </h3>

//             <input
//               placeholder="Question"
//               value={faq.question}
//               onChange={(e) =>
//                 setFaq({
//                   ...faq,
//                   question:
//                     e.target.value
//                 })
//               }
//             />

//             <textarea
//               placeholder="Answer"
//               value={faq.answer}
//               onChange={(e) =>
//                 setFaq({
//                   ...faq,
//                   answer:
//                     e.target.value
//                 })
//               }
//             />

//             <button
//               className="publish-btn"
//               onClick={addFAQ}
//             >
//               Add +
//             </button>

//             {cancer.faqs.map(
//               (f, i) => (

//                 <div
//                   key={i}
//                   className="faq-item"
//                 >

//                   <div>
//                     <strong>
//                       {f.question}
//                     </strong>

//                     <p>
//                       {f.answer}
//                     </p>
//                   </div>

//                   <button
//                     onClick={() =>
//                       deleteFAQ(i)
//                     }
//                   >
//                     ✕
//                   </button>

//                 </div>

//               )
//             )}

//             {/* ACTIONS */}

//             <div className="admin-modal-actions">

//               <button
//                 className="admin-submit-btn"
//                 onClick={saveCancer}
//               >
//                 {editId
//                   ? "Update Cancer"
//                   : "Create Cancer"}
//               </button>

//               <button
//                 className="admin-cancel-btn"
//                 onClick={() =>
//                   setShowModal(false)
//                 }
//               >
//                 Cancel
//               </button>

//               <button
//                 className="publish-btn"
//                 onClick={() =>
//                   setPreviewOpen(true)
//                 }
//               >
//                 Preview
//               </button>

//             </div>

//           </div>

//         </div>

//       )}

//       {/* PREVIEW */}

//       {previewOpen && (

//         <div className="blog-preview-modal">

//           <div className="blog-preview-container">

//             <button
//               className="preview-close"
//               onClick={() =>
//                 setPreviewOpen(false)
//               }
//             >
//               Close Preview
//             </button>

//             <h1 className="preview-title">
//               {cancer.name}
//             </h1>

//             <div
//               className="preview-body"
//               dangerouslySetInnerHTML={{
//                 __html: previewHTML
//               }}
//             />

//           </div>

//         </div>

//       )}

//     </>
//   );

// };

// export default ManageCancers;










import { useState, useRef, useEffect } from "react";

import slugify from "slugify";

import { useDropzone } from "react-dropzone";

import { useDispatch, useSelector } from "react-redux";

import { EditorContent, useEditor } from "@tiptap/react";

import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import Highlight from "@tiptap/extension-highlight";

import {
  fetchCancers,
  createCancer,
  updateCancer,
  deleteCancer,
} from "../../redux/cancers/cancersSlice";

import { fetchCancerCategories } from "../../redux/cancerCategories/cancerCategoriesSlice";

import { uploadCancerContentImageApi } from "../../redux/cancers/cancersApi";

import "./ManageServices.css";
import "./ManageCancers.css";

const IMAGE_BASE_URL =
  import.meta.env.VITE_IMAGE_BASE_URL || "";

const TABS = [
  "Overview",
  "Risk Factors",
  "Symptoms",
  "Diagnosis",
  "Treatment",
  "Do’s & Don’ts",
  // "FAQ's"
];

const emptyCancer = {
  name: "",
  slug: "",
  image: null,
  altText: "",
  metaTitle: "",
  metaDescription: "",
  faqs: [],
  categoryId: "",
};

const ManageCancers = () => {

  const dispatch = useDispatch();

  const {
    list: cancers,
    loading,
  } = useSelector((state) => state.cancers);

  const { list: categories = [] } = useSelector((state) => state.cancerCategories);

  const scrollRef = useRef();

  const [activeTab, setActiveTab] =
    useState("Overview");

  const [tabContent, setTabContent] =
    useState({});

  const [cancer, setCancer] =
    useState(emptyCancer);

  const [faq, setFaq] = useState({
    question: "",
    answer: ""
  });

  const [previewHTML, setPreviewHTML] =
    useState("");

  const [previewOpen, setPreviewOpen] =
    useState(false);

  const [showModal, setShowModal] =
    useState(false);

  const [editId, setEditId] =
    useState(null);

  useEffect(() => {

    dispatch(fetchCancers());
    dispatch(fetchCancerCategories());

  }, [dispatch]);

  /* ================= IMAGE ================= */

  const onDrop = (files) => {

    setCancer({
      ...cancer,
      image: files[0]
    });

  };

  const { getRootProps, getInputProps } =
    useDropzone({
      accept: { "image/*": [] },
      onDrop
    });

  /* ================= EDITOR ================= */

  const editor = useEditor({

    extensions: [
      StarterKit,
      Image,
      Highlight,
      Underline,
      Link.configure({
        openOnClick: false
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"]
      }),
      Placeholder.configure({
        placeholder:
          "Start writing your cancer content..."
      })
    ],

    content: "",

    onUpdate({ editor }) {

      setPreviewHTML(
        editor.getHTML()
      );

    }

  });

  const addImage = () => {

    const input = document.createElement("input");

    input.type = "file";

    input.accept = "image/*";

    input.onchange = async () => {

      const file = input.files[0];

      if (!file) return;

      try {

        const formData = new FormData();

        formData.append("file", file);

        const res =
          await uploadCancerContentImageApi(formData);

        const imageUrl =
          res.data.data.url;

        editor
          .chain()
          .focus()
          .setImage({
            src: imageUrl
          })
          .run();

      } catch (err) {

        console.error(err);

      }

    };

    input.click();

  };

  /* ================= TAB SWITCH ================= */

  const handleTabChange = (tab) => {

  if (!editor) return;

  const currentContent =
    editor.getHTML();

  const updatedContent = {
    ...tabContent,
    [activeTab]: currentContent,
  };

  setTabContent(updatedContent);

  editor.commands.setContent(
    updatedContent[tab] || ""
  );

  setActiveTab(tab);

};

  /* ================= FAQ ================= */

  const addFAQ = () => {

    if (!faq.question || !faq.answer)
      return;

    setCancer({
      ...cancer,
      faqs: [...cancer.faqs, faq]
    });

    setFaq({
      question: "",
      answer: ""
    });

  };

  const deleteFAQ = (i) => {

    setCancer({
      ...cancer,
      faqs: cancer.faqs.filter(
        (_, index) => index !== i
      )
    });

  };

  /* ================= SAVE ================= */

  const saveCancer = async () => {

    try {

      const updatedContent = {
        ...tabContent,
        [activeTab]: editor.getHTML()
      };

      setTabContent(updatedContent);

      const formData = new FormData();

      formData.append(
        "name",
        cancer.name
      );

      formData.append(
        "slug",
        cancer.slug ||
        slugify(cancer.name, {
          lower: true
        })
      );

      formData.append(
        "altText",
        cancer.altText
      );

      formData.append(
        "seoTitle",
        cancer.metaTitle
      );

      formData.append(
        "metaDescription",
        cancer.metaDescription
      );

      if (cancer.categoryId) {
        formData.append("categoryId", String(cancer.categoryId));
      }
      // If no category selected, don't append — backend will treat missing field as null

      formData.append(
        "overview",
        updatedContent["Overview"] || ""
      );

      formData.append(
        "riskFactors",
        updatedContent["Risk Factors"] || ""
      );

      formData.append(
        "symptoms",
        updatedContent["Symptoms"] || ""
      );

      formData.append(
        "diagnosis",
        updatedContent["Diagnosis"] || ""
      );

      formData.append(
        "treatment",
        updatedContent["Treatment"] || ""
      );

      formData.append(
        "dosAndDonts",
        updatedContent["Do’s & Don’ts"] || ""
      );

      formData.append(
        "faqs",
        JSON.stringify(cancer.faqs)
      );

      if (
        cancer.image &&
        typeof cancer.image !== "string"
      ) {

        formData.append(
          "coverImage",
          cancer.image
        );

      }

      if (editId) {

        await dispatch(
          updateCancer({
            id: editId,
            formData
          })
        );

      } else {

        await dispatch(
          createCancer(formData)
        );

      }

      dispatch(fetchCancers());

      setCancer(emptyCancer);

      setEditId(null);

      setTabContent({});

      editor.commands.clearContent();

      setShowModal(false);

    } catch (err) {

      console.error(err);

    }

  };

  /* ================= EDIT ================= */

  const handleEdit = (item) => {

    setEditId(item.id);

    setCancer({
  ...item,
  image: item.coverImage,
  metaTitle: item.seoTitle,
  categoryId: item.categoryId ?? "",
});

    const contentData = {
      Overview: item.overview || "",
      "Risk Factors": item.riskFactors || "",
      Symptoms: item.symptoms || "",
      Diagnosis: item.diagnosis || "",
      Treatment: item.treatment || "",
      "Do’s & Don’ts": item.dosAndDonts || "",
    };

    setTabContent(contentData);

    setShowModal(true);

    const firstTabContent =
      contentData.Overview || "";

    editor.commands.setContent(
      firstTabContent
    );

    setActiveTab("Overview");

  };

  /* ================= DELETE ================= */

  const handleDelete = async (id) => {

    if (!window.confirm(
      "Delete cancer type?"
    )) return;

    await dispatch(deleteCancer(id));

    dispatch(fetchCancers());

  };

  const getCategoryName = (categoryId) => {
    if (!categoryId) return "—";
    const cat = categories.find((c) => c.id === categoryId);
    return cat ? cat.name : "—";
  };

  const imgSrc = (path) => {

  if (!path) return null;

  if (path instanceof File) {
    return URL.createObjectURL(path);
  }

  if (path.startsWith("http")) {
    return path;
  }

  return `${IMAGE_BASE_URL}${path}`;

};

  if (!editor) return null;

  return (
    <>
      <div className="admin-centers-page">

        <div className="admin-centers-header">

          <h2>Manage Cancer Types</h2>

          <button
            className="admin-add-btn"
            onClick={() => {

              setCancer(emptyCancer);

              setEditId(null);

              setTabContent({});

              setActiveTab("Overview");

              editor.commands.clearContent();

              setShowModal(true);

            }}
          >
            + Add Cancer
          </button>

        </div>

        <div className="admin-centers-table-wrapper">

          <table className="admin-centers-table">

            <thead>

              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Slug</th>
                <th>Meta Title</th>
                <th>Actions</th>
              </tr>

            </thead>

            <tbody>

              {cancers.map(item => (

                <tr key={item.id}>

                  <td>

                    {item.coverImage && (

                      <img
src={imgSrc(item.coverImage)}                        className="admin-table-img"

                        alt=""
                      />

                    )}

                  </td>

                  <td>{item.name}</td>

                  <td>
                    <span className="category-badge">
                      {getCategoryName(item.categoryId)}
                    </span>
                  </td>

                  <td>{item.slug}</td>

                  <td>
                    {item.seoTitle}
                  </td>

                  <td className="admin-actions">

                    <button
                      className="admin-edit-btn"
                      onClick={() =>
                        handleEdit(item)
                      }
                    >
                      Edit
                    </button>

                    <button
                      className="admin-delete-btn"
                      onClick={() =>
                        handleDelete(item.id)
                      }
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

      {showModal && (

        <div className="admin-modal-overlay">

          <div className="admin-modal">

            <h3>
              {editId
                ? "Edit Cancer"
                : "Add Cancer"}
            </h3>

            <label>
              Cancer Name
            </label>

            <input
              className="blog-title"
              placeholder="Add cancer name here"
              value={cancer.name}
              onChange={(e) =>
                setCancer({
                  ...cancer,
                  name:
                    e.target.value
                })
              }
            />

            {/* ── CATEGORY DROPDOWN ── */}
            <label>Category</label>
            <select
              className="service-category-select"
              value={cancer.categoryId ?? ""}
              onChange={(e) =>
                setCancer((p) => ({
                  ...p,
                  categoryId: e.target.value ? Number(e.target.value) : "",
                }))
              }
            >
              <option value="">— No Category —</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            {categories.length === 0 && (
              <p className="category-hint">
                No categories yet. Go to <strong>Cancer Categories</strong> in the sidebar to create some.
              </p>
            )}

            <label>
              Cover Image
            </label>

            <div
              {...getRootProps()}
              className="hero-upload"
            >
              <input
                {...getInputProps()}
              />

              Upload Image

            </div>

            {cancer.image && (

              <img
                src={
                  typeof cancer.image ===
                  "string"
                    ? imgSrc(cancer.image)
                    : URL.createObjectURL(
                        cancer.image
                      )
                }
                className="hero-preview"
                alt=""
              />

            )}

            <div className="seo-grid">

              <div>

                <label>
                  Alt Text
                </label>

                <input
                  placeholder="Alt text"
                  value={
                    cancer.altText
                  }
                  onChange={(e) =>
                    setCancer({
                      ...cancer,
                      altText:
                        e.target
                          .value
                    })
                  }
                />

              </div>

              <div>

                <label>
                  SEO Title
                </label>

                <input
                  placeholder="SEO title"
                  value={
                    cancer.metaTitle
                  }
                  onChange={(e) =>
                    setCancer({
                      ...cancer,
                      metaTitle:
                        e.target
                          .value
                    })
                  }
                />

              </div>

            </div>

            <label>
              Meta Description
            </label>

            <textarea
              placeholder="Meta description"
              value={
                cancer.metaDescription
              }
              onChange={(e) =>
                setCancer({
                  ...cancer,
                  metaDescription:
                    e.target.value
                })
              }
            />

            <label>Slug</label>

            <input
              placeholder="slug"
              value={cancer.slug}
              onChange={(e) =>
                setCancer({
                  ...cancer,
                  slug:
                    e.target.value
                })
              }
            />

            <div className="tabs-wrapper">

              <button
                className="tab-arrow"
                onClick={() =>
                  scrollRef.current.scrollBy({
                    left: -200
                  })
                }
              >
                ‹
              </button>

              <div
                className="cancer-tabs-admin"
                ref={scrollRef}
              >

                {TABS.map(tab => (

                  <button
                    key={tab}
                    className={
                      activeTab === tab
                        ? "active"
                        : ""
                    }
                    onClick={() =>
                      handleTabChange(
                        tab
                      )
                    }
                  >
                    {tab}
                  </button>

                ))}

              </div>

              <button
                className="tab-arrow"
                onClick={() =>
                  scrollRef.current.scrollBy({
                    left: 200
                  })
                }
              >
                ›
              </button>

            </div>

            <div className="editor-toolbar">

              <button onClick={() => editor.chain().focus().toggleBold().run()}>
                <b>B</b>
              </button>

              <button onClick={() => editor.chain().focus().toggleItalic().run()}>
                <i>I</i>
              </button>

              <button onClick={() => editor.chain().focus().toggleUnderline().run()}>
                <u>U</u>
              </button>

              <button onClick={() => editor.chain().focus().toggleStrike().run()}>
                S
              </button>

              <button onClick={() => editor.chain().focus().toggleHighlight().run()}>
                Highlight
              </button>

              <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>
                H1
              </button>

              <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
                H2
              </button>

              <button onClick={() => editor.chain().focus().setParagraph().run()}>
                P
              </button>

              <button onClick={() => editor.chain().focus().toggleBulletList().run()}>
                • List
              </button>

              <button onClick={() => editor.chain().focus().toggleOrderedList().run()}>
                1. List
              </button>

              <button onClick={() => editor.chain().focus().setTextAlign("left").run()}>
                Left
              </button>

              <button onClick={() => editor.chain().focus().setTextAlign("center").run()}>
                Center
              </button>

              <button onClick={() => editor.chain().focus().setTextAlign("right").run()}>
                Right
              </button>

              <button
                onClick={() => {

                  const url = prompt("Enter URL");

                  if (url) {

                    editor
                      .chain()
                      .focus()
                      .setLink({ href: url })
                      .run();

                  }

                }}
              >
                Link
              </button>

              <button onClick={addImage}>
                Image
              </button>

            </div>

            <EditorContent
              editor={editor}
              className="notion-editor"
            />

            <h3
              style={{
                marginTop: "40px"
              }}
            >
              FAQS
            </h3>

            <input
              placeholder="Question"
              value={faq.question}
              onChange={(e) =>
                setFaq({
                  ...faq,
                  question:
                    e.target.value
                })
              }
            />

            <textarea
              placeholder="Answer"
              value={faq.answer}
              onChange={(e) =>
                setFaq({
                  ...faq,
                  answer:
                    e.target.value
                })
              }
            />

            <button
              className="publish-btn"
              onClick={addFAQ}
            >
              Add +
            </button>

            {cancer.faqs.map(
              (f, i) => (

                <div
                  key={i}
                  className="faq-item"
                >

                  <div>
                    <strong>
                      {f.question}
                    </strong>

                    <p>
                      {f.answer}
                    </p>
                  </div>

                  <button
                    onClick={() =>
                      deleteFAQ(i)
                    }
                  >
                    ✕
                  </button>

                </div>

              )
            )}

            <div className="admin-modal-actions">

              <button
                className="admin-submit-btn"
                onClick={saveCancer}
              >
                {editId
                  ? "Update Cancer"
                  : "Create Cancer"}
              </button>

              <button
                className="admin-cancel-btn"
                onClick={() =>
                  setShowModal(false)
                }
              >
                Cancel
              </button>

              <button
                className="publish-btn"
                onClick={() =>
                  setPreviewOpen(true)
                }
              >
                Preview
              </button>

            </div>

          </div>

        </div>

      )}

      {previewOpen && (

        <div className="blog-preview-modal">

          <div className="blog-preview-container">

            <button
              className="preview-close"
              onClick={() =>
                setPreviewOpen(false)
              }
            >
              Close Preview
            </button>

            <h1 className="preview-title">
              {cancer.name}
            </h1>

            <div
              className="preview-body"
              dangerouslySetInnerHTML={{
                __html: previewHTML
              }}
            />

          </div>

        </div>

      )}

    </>
  );

};

export default ManageCancers;