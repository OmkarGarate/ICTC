// import { NavLink } from "react-router-dom";
// import { useState, useEffect } from "react";
// import "./AdminSidebar.css";

// import homeIcon from "../assets/lucide_home.png";
// import centerIcon from "../assets/carbon_network-4.png";
// import serviceIcon from "../assets/carbon_category.png";
// import cancerIcon from "../assets/iconamoon_category-light.png";
// import doctorIcon from "../assets/hugeicons_doctor-03.png";
// import blogIcon from "../assets/majesticons_article-line.png";
// import galleryIcon from "../assets/streamline-flex_gallery.png";
// import instaIcon from "../assets/lets-icons_insta.png";
// import testimonialIcon from "../assets/material-symbols_patient-list-rounded.png";
// import collapseIcon from "../assets/system-uicons_window-collapse-left.png";

// const menu = [
//   { name: "Home", path: "/ctrl", icon: homeIcon },
//   { name: "Centres", path: "/ctrl/centers", icon: centerIcon },
//   { name: "Services", path: "/ctrl/services", icon: serviceIcon },
//   { name: "Cancer Types", path: "/ctrl/cancers", icon: cancerIcon },
//   { name: "Doctors", path: "/ctrl/doctors", icon: doctorIcon },
//   { name: "Blogs", path: "/ctrl/blogs", icon: blogIcon },
//   // { name: "Gallery", path: "/ctrl/gallery", icon: galleryIcon },
//   // { name: "Instagram Reviews", path: "/ctrl/instagram", icon: instaIcon },
//   // { name: "Patient Testimonials", path: "/ctrl/testimonials", icon: testimonialIcon },
// ];

// const AdminSidebar = () => {

//   const [collapsed, setCollapsed] = useState(false);

//   // auto collapse on mobile
//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth < 768) {
//         setCollapsed(true);
//       }
//     };

//     handleResize();
//     window.addEventListener("resize", handleResize);

//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   return (
//     <div className={`admin-sidebar ${collapsed ? "collapsed" : ""}`}>

//       {/* HEADER */}
//       <div className="sidebar-header" onClick={() => setCollapsed(!collapsed)}>
//         {!collapsed && <span>Collapse</span>}
//         <img src={collapseIcon} alt="" />
//       </div>

//       {/* MENU */}
//       <div className="sidebar-menu">
//         {menu.map((item) => (
//           <NavLink key={item.name} to={item.path} end={item.path === "/ctrl"}>
//             {({ isActive }) => (
//               <div className={`sidebar-item ${isActive ? "active" : ""}`}>
//                 {!collapsed && <span>{item.name}</span>}
//                 <img src={item.icon} alt="" />
//               </div>
//             )}
//           </NavLink>
//         ))}
//       </div>

//     </div>
//   );
// };

// export default AdminSidebar;




import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import "./AdminSidebar.css";

import homeIcon from "../assets/lucide_home.png";
import centerIcon from "../assets/carbon_network-4.png";
import serviceIcon from "../assets/carbon_category.png";
import cancerIcon from "../assets/iconamoon_category-light.png";
import doctorIcon from "../assets/hugeicons_doctor-03.png";
import blogIcon from "../assets/majesticons_article-line.png";
import testimonialIcon from "../assets/material-symbols_patient-list-rounded.png";
import collapseIcon from "../assets/system-uicons_window-collapse-left.png";

const menu = [
  { name: "Home", path: "/ctrl", icon: homeIcon },
  { name: "Centres", path: "/ctrl/centers", icon: centerIcon },
  { name: "Services", path: "/ctrl/services", icon: serviceIcon },
  { name: "Service Categories", path: "/ctrl/service-categories", icon: cancerIcon },
  { name: "Cancer Types", path: "/ctrl/cancers", icon: cancerIcon },
  { name: "Cancer Categories", path: "/ctrl/cancer-categories", icon: cancerIcon },
  { name: "Doctors", path: "/ctrl/doctors", icon: doctorIcon },
  { name: "Blogs", path: "/ctrl/blogs", icon: blogIcon },
];

const AdminSidebar = () => {

  const [collapsed, setCollapsed] = useState(false);

  // auto collapse on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCollapsed(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={`admin-sidebar ${collapsed ? "collapsed" : ""}`}>

      {/* HEADER */}
      <div className="sidebar-header" onClick={() => setCollapsed(!collapsed)}>
        {!collapsed && <span>Collapse</span>}
        <img src={collapseIcon} alt="" />
      </div>

      {/* MENU */}
      <div className="sidebar-menu">
        {menu.map((item) => (
          <NavLink key={item.name} to={item.path} end={item.path === "/ctrl"}>
            {({ isActive }) => (
              <div className={`sidebar-item ${isActive ? "active" : ""}`}>
                {!collapsed && <span>{item.name}</span>}
                <img src={item.icon} alt="" />
              </div>
            )}
          </NavLink>
        ))}
      </div>

    </div>
  );
};

export default AdminSidebar;