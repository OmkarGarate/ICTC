import "./Footer.css";
import logo from "../../../assets/ICTC_Logo(long).png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { fetchServices } from "../../../redux/services/servicesSlice";
import { fetchServiceCategories } from "../../../redux/serviceCategories/serviceCategoriesSlice";
import { fetchCenters } from "../../../redux/centers/centersSlice";
import { fetchCancers } from "../../../redux/cancers/cancersSlice";
import { encryptId } from "../../Common/Idcrypto";

/* ICONS */
import {
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
  FaYoutube,
  FaXTwitter,
} from "react-icons/fa6";

const Footer = () => {
  const dispatch = useDispatch();

  const { list: servicesData = [], loading: servicesLoading } = useSelector((s) => s.services);
  const { list: categoriesData = [], loading: categoriesLoading } = useSelector((s) => s.serviceCategories);
  const { list: centersData = [], loading: centersLoading } = useSelector((s) => s.centers);
  const { list: cancersData = [], loading: cancersLoading } = useSelector((s) => s.cancers);

  /* Fetch only if not already loaded */
  useEffect(() => {
    if (!servicesData.length) dispatch(fetchServices());
  }, [dispatch, servicesData.length]);

  useEffect(() => {
    if (!categoriesData.length) dispatch(fetchServiceCategories());
  }, [dispatch, categoriesData.length]);

  useEffect(() => {
    if (!centersData.length) dispatch(fetchCenters());
  }, [dispatch, centersData.length]);

  useEffect(() => {
    if (!cancersData.length) dispatch(fetchCancers());
  }, [dispatch, cancersData.length]);

  /*
   * Group services by category.
   * Returns: [{ name: "Treatment Modalities", items: [{ id, slug, label }] }, ...]
   */
  const groupedServices = (() => {
    const catMap = {};
    categoriesData.forEach((cat) => {
      catMap[cat.id] = { ...cat, services: [] };
    });
    const uncategorised = [];

    servicesData.forEach((svc) => {
      if (svc.categoryId && catMap[svc.categoryId]) {
        catMap[svc.categoryId].services.push({
          id: svc.id,
          slug: svc.slug,
          label: svc.title,
        });
      } else {
        uncategorised.push({ id: svc.id, slug: svc.slug, label: svc.title });
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

  const isServicesLoading = servicesLoading || categoriesLoading;

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* LOGO */}
        <div className="footer-logo">
          <Link to="/">
            <img src={logo} alt="Indian Cancer Treatment Centre" />
          </Link>

          {/* SOCIAL MEDIA */}
          <div className="footer-social">
            <a href="https://www.instagram.com/ictcfightscancer/" target="_blank" rel="noreferrer">
              <FaInstagram />
            </a>
            <a href="https://www.facebook.com/ictcfightscancer" target="_blank" rel="noreferrer">
              <FaFacebookF />
            </a>
            <a href="https://www.linkedin.com/company/ictcfightscancer/" target="_blank" rel="noreferrer">
              <FaLinkedinIn />
            </a>
            <a href="https://www.youtube.com/@ictcfightscancer" target="_blank" rel="noreferrer">
              <FaYoutube />
            </a>
            <a href="https://x.com/ictcfightcancer" target="_blank" rel="noreferrer">
              <FaXTwitter />
            </a>
          </div>
        </div>

        {/* COLUMNS */}
        <div className="footer-columns">

          {/* COL 1 — About + Services (grouped by category) */}
          <div className="footer-col">
            <h4>About Us</h4>
            <ul>
              <li><Link to="/aboutUs">About ICTC</Link></li>
              <li><Link to="/ourDoctors">Our Team</Link></li>
            </ul>

            {/* Services section */}
            {isServicesLoading ? (
              /* Still loading — show placeholder, never "Loading..." text */
              <div>
                <h4 className="mt">Services</h4>
                <ul>
                  <li style={{ color: "#aaa", fontSize: "13px" }}>—</li>
                </ul>
              </div>
            ) : groupedServices.length > 0 ? (
              /* Render one sub-section per category */
              groupedServices.map(({ name, items }) => (
                <div key={name}>
                  <h4 className="mt">{name}</h4>
                  <ul>
                    {items.map((item) => (
                      <li key={item.slug}>
                        <Link to={`/Services/${item.slug}/${encryptId(item.id)}`}>
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            ) : (
              /* No services available after loading */
              <div>
                <h4 className="mt">Services</h4>
                <ul>
                  <li style={{ color: "#aaa" }}>No services available.</li>
                </ul>
              </div>
            )}
          </div>

          {/* COL 2 — Centres */}
          <div className="footer-col">
            <h4>Centres</h4>
            <ul className="centres-list-footer">
              {centersLoading ? (
                <li style={{ color: "#aaa", fontSize: "13px" }}>—</li>
              ) : centersData.length > 0 ? (
                centersData.map((centre) => (
                  <li key={centre.id || centre.slug}>
                    <Link to={`/centre/${encryptId(centre.id)}`}>
                      <span className="sp">{centre.name}</span>
                    </Link>
                    {centre.phone && <span>{centre.phone}</span>}
                  </li>
                ))
              ) : (
                <li style={{ color: "#aaa" }}>No centres available.</li>
              )}
            </ul>
          </div>

          {/* COL 3 — Cancers */}
          <div className="footer-col">
            <h4>Cancers We Treat</h4>
            <ul>
              {cancersLoading ? (
                <li style={{ color: "#aaa", fontSize: "13px" }}>—</li>
              ) : cancersData.length > 0 ? (
                cancersData.map((cancer) => (
                  <li key={cancer.id || cancer.slug}>
                    <Link to={`/cancer/${cancer.slug}/${encryptId(cancer.id)}`}>
                      {cancer.name || cancer.Name}
                    </Link>
                  </li>
                ))
              ) : (
                <li style={{ color: "#aaa" }}>No cancer types available.</li>
              )}
            </ul>
          </div>

          {/* COL 4 — Useful Links */}
          <div className="footer-col">
            <h4>Useful Link</h4>
            <ul>
              <li><Link to="/blog">ICTC Blogs</Link></li>
              <li><Link to="/newsletter">ICTC Newsletter</Link></li>
              <li><Link to="/privacy-policy">Privacy Policy</Link></li>
            </ul>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
