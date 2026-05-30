import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchServices } from "../../redux/services/servicesSlice";
import { fetchServiceCategories } from "../../redux/serviceCategories/serviceCategoriesSlice";
import imgSrc from "../Common/ImgSrc";
import "./AllServicePage.css";

function AllServicePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { list: services, loading } = useSelector((state) => state.services);
  const { list: categoriesData } = useSelector((state) => state.serviceCategories);

  useEffect(() => {
    dispatch(fetchServices());
    dispatch(fetchServiceCategories());
  }, [dispatch]);

  // Build a map: categoryId → category name
  const categoryMap = {};
  categoriesData.forEach((cat) => {
    categoryMap[cat.id] = cat;
  });

  // Group services by category name (using categoryId lookup), sorted by category sequence
  const grouped = {};
  const groupOrder = [];

  // First add categories in sequence order
  [...categoriesData]
    .sort((a, b) => a.sequence - b.sequence)
    .forEach((cat) => {
      grouped[cat.name] = [];
      groupOrder.push(cat.name);
    });

  // Place each service into its category group
  services.forEach((service) => {
    const cat = categoryMap[service.categoryId];
    const key = cat ? cat.name : "Our Services";
    if (!grouped[key]) {
      grouped[key] = [];
      groupOrder.push(key);
    }
    grouped[key].push(service);
  });

  // Remove empty categories
  const servicesByCategory = groupOrder
    .filter((name) => grouped[name] && grouped[name].length > 0)
    .map((name) => [name, grouped[name]]);

  if (loading) {
    return (
      <section className="all-services-page">
        <p style={{ padding: "40px" }}>Loading...</p>
      </section>
    );
  }

  return (
    <section className="all-services-page">
      {servicesByCategory.map(([category, items]) => (
        <div key={category} style={{ marginBottom: "50px" }}>

          {/* CATEGORY TITLE */}
          <h2
            style={{
              fontSize: "26px",
              fontWeight: "700",
              marginBottom: "25px",
              color: "rgba(105, 60, 121, 1)",
              borderLeft: "6px solid rgba(105, 60, 121, 1)",
              paddingLeft: "12px",
            }}
          >
            {category}
          </h2>

          {/* SERVICES GRID */}
          <div className="services-grid">
            {items.map((service) => (
              <div
                key={service.slug}
                className="service-card"
                onClick={() => navigate(`/service/${service.slug}/${service.id}`)}
              >
                <div className="service-icon">
                  <img src={imgSrc(service.coverImage)} alt={service.title} />
                </div>

                <div className="service-content">
                  <h3>{service.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

export default AllServicePage;