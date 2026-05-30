import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import "./Navbar.css";
import logo from "../../../assets/ICTC_Logo.png";
import arrow from "../../../assets/dropDownIcon.png";

import { fetchCancers } from "../../../redux/cancers/cancersSlice";
import { fetchServices } from "../../../redux/services/servicesSlice";
import { fetchServiceCategories } from "../../../redux/serviceCategories/serviceCategoriesSlice";
import { fetchCancerCategories } from "../../../redux/cancerCategories/cancerCategoriesSlice";

import { useDispatch, useSelector } from "react-redux";
import { fetchCenters } from "../../../redux/centers/centersSlice";

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sticky, setSticky] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const navRef = useRef(null);

  const { list: centersData } = useSelector((state) => state.centers);
  const { list: cancersData } = useSelector((state) => state.cancers);
  const { list: servicesData } = useSelector((state) => state.services);
  const { list: categoriesData } = useSelector((state) => state.serviceCategories);
  const { list: cancerCategoriesData } = useSelector((state) => state.cancerCategories);

  const toggleMenu = (menu) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  /* SINGLE PLACE NAVIGATION HANDLER */
  const handleNavigate = (path) => {
    navigate(path);
    setActiveMenu(null);
    setMobileOpen(false);
  };

  /* CLOSE ON OUTSIDE CLICK */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setActiveMenu(null);
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* DYNAMIC ARRAYS */
  const centres = centersData || [];
  const cancers = cancersData || [];

  /* STICKY NAVBAR */
  useEffect(() => {
    const onScroll = () => setSticky(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!centersData.length) dispatch(fetchCenters());
  }, [dispatch, centersData.length]);

  useEffect(() => {
    if (!cancersData.length) dispatch(fetchCancers());
  }, [dispatch, cancersData.length]);

  useEffect(() => {
    if (!servicesData.length) dispatch(fetchServices());
  }, [dispatch, servicesData.length]);

  useEffect(() => {
    if (!categoriesData.length) dispatch(fetchServiceCategories());
  }, [dispatch, categoriesData.length]);

  useEffect(() => {
    if (!cancerCategoriesData.length) dispatch(fetchCancerCategories());
  }, [dispatch, cancerCategoriesData.length]);

  /*
   * Build grouped services from real category data (ordered by category.sequence).
   */
  const groupedServices = (() => {
    const catMap = {};
    categoriesData.forEach((cat) => {
      catMap[cat.id] = { ...cat, services: [] };
    });

    const uncategorised = [];

    servicesData.forEach((svc) => {
      if (svc.categoryId && catMap[svc.categoryId]) {
        catMap[svc.categoryId].services.push({ slug: svc.slug, name: svc.title, id: svc.id });
      } else {
        uncategorised.push({ slug: svc.slug, name: svc.title, id: svc.id });
      }
    });

    const groups = Object.values(catMap)
      .sort((a, b) => a.sequence - b.sequence)
      .filter((cat) => cat.services.length > 0)
      .map((cat) => ({ name: cat.name, items: cat.services }));

    if (uncategorised.length > 0) {
      groups.push({ name: "Other Services", items: uncategorised });
    }

    return groups;
  })();

  /*
   * Build grouped cancers from cancerCategories (same pattern as services).
   */
  const groupedCancers = (() => {
    const catMap = {};
    cancerCategoriesData.forEach((cat) => {
      catMap[cat.id] = { ...cat, cancers: [] };
    });

    const uncategorised = [];

    cancers.forEach((cancer) => {
      if (cancer.categoryId && catMap[cancer.categoryId]) {
        catMap[cancer.categoryId].cancers.push({ slug: cancer.slug, name: cancer.name, id: cancer.id });
      } else {
        uncategorised.push({ slug: cancer.slug, name: cancer.name, id: cancer.id });
      }
    });

    const groups = Object.values(catMap)
      .sort((a, b) => a.sequence - b.sequence)
      .filter((cat) => cat.cancers.length > 0)
      .map((cat) => ({ name: cat.name, items: cat.cancers }));

    if (uncategorised.length > 0) {
      groups.push({ name: "Other Cancer Types", items: uncategorised });
    }

    // Fallback: if no categories configured, split into two columns
    if (groups.length === 0 && cancers.length > 0) {
      const mid = Math.ceil(cancers.length / 2);
      return [
        { name: null, items: cancers.slice(0, mid).map((c) => ({ slug: c.slug, name: c.name, id: c.id })) },
        { name: null, items: cancers.slice(mid).map((c) => ({ slug: c.slug, name: c.name, id: c.id })) },
      ];
    }

    return groups;
  })();

  return (
    <>
      {(activeMenu || mobileOpen) && <div className="nav-overlay"></div>}

      {/* TOP BAR */}
      <div className="top-bar">
        <span>
          Mail Us at: <a href="mailto:info@ictconco.org">info@ictconco.org</a>
        </span>

        <span>
          ICTC Helpline:{" "}
          <a href="tel:+918858855200" className="diffColor">
            885 885 5200
          </a>
        </span>
      </div>

      {/* NAVBAR */}
      <div className={`navbar-wrapper ${sticky ? "sticky" : ""}`} ref={navRef}>
        <nav className="navbar">
          {/* LOGO */}
          <div
            className="logo"
            onClick={() => handleNavigate("/")}
            style={{ cursor: "pointer" }}
          >
            <img src={logo} alt="ICTC Logo" />
          </div>

          {/* DESKTOP MENU */}
          <ul className="menu">
            <li onClick={() => handleNavigate("/aboutUs")}>ABOUT US</li>

            <li onClick={() => toggleMenu("services")}>
              SERVICES <img src={arrow} />
            </li>

            <li onClick={() => toggleMenu("centres")}>
              OUR CENTRE <img src={arrow} />
            </li>

            <li onClick={() => toggleMenu("cancer")}>
              CANCER TYPES <img src={arrow} />
            </li>

            <li onClick={() => handleNavigate("/ourDoctors")}>OUR DOCTORS</li>

            <li onClick={() => handleNavigate("/blog")}>BLOGS</li>
          </ul>

          {/* DESKTOP BUTTON */}
          <button
            className="appointment-btn"
            onClick={() => handleNavigate("/BookAppoinment")}
          >
            Book an Appointment
          </button>

          {/* HAMBURGER */}
          <div
            className="hamburger"
            onClick={() => {
              setMobileOpen(!mobileOpen);
              setActiveMenu(null);
            }}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </nav>

        {/* MOBILE MENU */}
        <div className={`mobile-menu ${mobileOpen ? "open" : ""}`}>
          <ul>
            <li onClick={() => handleNavigate("/")}>Home</li>
            <li onClick={() => handleNavigate("/aboutUs")}>About Us</li>
            <li onClick={() => toggleMenu("services")}>Services</li>
            <li onClick={() => toggleMenu("centres")}>Our Centre</li>
            <li onClick={() => toggleMenu("cancer")}>Cancer Types</li>
            <li onClick={() => handleNavigate("/ourDoctors")}>Our Doctors</li>
            <li onClick={() => handleNavigate("/blog")}>Blogs</li>

            <button
              className="appointment-btn mobile-btn"
              onClick={() => handleNavigate("/BookAppoinment")}
            >
              Book an Appointment
            </button>
          </ul>
        </div>

        {/* SERVICES DROPDOWN — grouped by real categories */}
        {activeMenu === "services" && (
          <MegaDropdown
            heading="SERVICES"
            headingRoute="/AllService"
            onNavigate={handleNavigate}
          >
            {groupedServices.map(({ name, items }) => (
              <div className="column" key={name}>
                <h4 className="dropdown-section-title">{name}</h4>
                {items.map((item) => (
                  <p
                    key={item.slug}
                    onClick={() => handleNavigate(`/Services/${item.slug}/${item.id}`)}
                  >
                    {item.name}
                  </p>
                ))}
              </div>
            ))}
          </MegaDropdown>
        )}

        {/* CENTRES DROPDOWN */}
        {activeMenu === "centres" && (
          <MegaDropdown
            heading="OUR CENTRES"
            headingRoute="/allCenters"
            onNavigate={handleNavigate}
          >
            {(() => {
              const mid = Math.ceil(centres.length / 2);
              return (
                <>
                  <div className="column">
                    {centres.slice(0, mid).map((center) => (
                      <p
                        key={center.id || center.slug}
                        onClick={() => handleNavigate(`/centre/${center.id}`)}
                      >
                        {center.name}
                      </p>
                    ))}
                  </div>

                  <div className="column">
                    {centres.slice(mid).map((center) => (
                      <p
                        key={center.id || center.slug}
                        onClick={() => handleNavigate(`/centre/${center.id}`)}
                      >
                        {center.name}
                      </p>
                    ))}
                  </div>
                </>
              );
            })()}
          </MegaDropdown>
        )}

        {/* CANCER DROPDOWN — grouped by real categories */}
        {activeMenu === "cancer" && (
          <MegaDropdown
            heading="CANCER TYPES"
            headingRoute="/AllCancer"
            onNavigate={handleNavigate}
          >
            {groupedCancers.map(({ name, items }, idx) => (
              <div className="column" key={name || idx}>
                {name && <h4 className="dropdown-section-title">{name}</h4>}
                {items.map((item) => (
                  <p
                    key={item.id}
                    onClick={() => handleNavigate(`/cancer/${item.slug}/${item.id}`)}
                  >
                    {item.name}
                  </p>
                ))}
              </div>
            ))}
          </MegaDropdown>
        )}
      </div>
    </>
  );
};

/* MEGA DROPDOWN */
const MegaDropdown = ({ heading, headingRoute, children, onNavigate }) => (
  <div className="mega-dropdown slide-down">
    <div className="dropdown-grid">
      <div className="dropdown-left">
        <div
          className="dropdown-heading clickable"
          onClick={() => onNavigate(headingRoute)}
        >
          {heading}
        </div>

        <div className="dropdown-content">{children}</div>
      </div>

      <QuickLinks onNavigate={onNavigate} />
    </div>
  </div>
);

/* QUICK LINKS */
const QuickLinks = ({ onNavigate }) => (
  <div className="quick-links">
    <h4>Quick Links</h4>

    <a href="tel:+918858855200" className="helpline-box">
      <span>ICTC Helpline</span>
      <strong>+91 885 885 5200</strong>
    </a>

    <button
      className="quick-btn purple"
      onClick={() => onNavigate("/BookAppoinment")}
    >
      Book an Appointment
    </button>

    <button
      className="quick-btn dark"
      onClick={() => onNavigate("/allCenters")}
    >
      Our Centres <span>→</span>
    </button>
  </div>
);

export default Navbar;