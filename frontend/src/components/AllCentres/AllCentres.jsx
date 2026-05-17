import "./AllCentres.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCenters } from "../../redux/centers/centersSlice";
import imgSrc from "../Common/ImgSrc";

/* ICONS */
import callIcon from "../../assets/fluent_call-12-filled.png";
import starIcon from "../../assets/RatingFill.png";

/* ---------- DISTANCE HELPER ---------- */
const getDistanceInKm = (lat1, lon1, lat2, lon2) => {
  const toRad = (value) => (value * Math.PI) / 180;
  const R = 6371;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) ** 2;

  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

const AllCentres = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { list: centersData } = useSelector((state) => state.centers);
  const [centres, setCentres] = useState([]);

  useEffect(() => {
    if (!centersData || !centersData.length) dispatch(fetchCenters());
  }, [dispatch, centersData]);

  useEffect(() => {
    const allCentres = centersData || [];

    if (!navigator.geolocation) {
      setCentres(allCentres);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        const sorted = allCentres
          .map((centre) => ({
            ...centre,
            distance:
              centre.lat && centre.lng
                ? getDistanceInKm(latitude, longitude, centre.lat, centre.lng)
                : null,
          }))
          .sort((a, b) => {
            if (!a.distance) return 1;
            if (!b.distance) return -1;
            return a.distance - b.distance;
          });

        setCentres(sorted);
      },
      () => {
        setCentres(allCentres);
      }
    );
  }, [centersData]);

  return (
    <section className="ictc-centres-page">
      <h2 className="ictc-centres-title">ICTC Cancer Care Centres</h2>

      <div className="ictc-centres-list">
        {centres.map((centre) => (
          <article
            className="ictc-centre-card"
            key={centre.id || centre.slug}
            onClick={() => navigate(`/centre/${centre.id}`)}
            style={{ cursor: "pointer" }}
          >
            {/* MAP */}
            <div className="ictc-centre-map">
              <iframe
                title={`${centre.name} map`}
                src={centre.mapEmbed}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* INFO */}
            <div className="ictc-centre-info">
              <div className="ictc-centre-header">
                <h3>{centre.name}</h3>

                <button
                  className="appointment-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate("/BookAppoinment");
                  }}
                >
                  BOOK APPOINTMENT
                </button>
              </div>

              {/* RATING */}
              <div className="ictc-centre-rating">
                <img src={starIcon} alt="rating" />
                <img src={starIcon} alt="rating" />
                <img src={starIcon} alt="rating" />
                <img src={starIcon} alt="rating" />
                <img src={starIcon} alt="rating" />

                <span className="rating-score">{centre.rating}</span>
                <span className="rating-sep">|</span>
                <span className="rating-count">{centre.reviews}</span>

                {centre.distance && (
                  <span className="centre-distance">
                    • {centre.distance.toFixed(1)} km away
                  </span>
                )}
              </div>

              {/* ADDRESS */}
              <p className="ictc-centre-address">{centre.address}</p>

              {/* FOOTER */}
              <div className="ictc-centre-footer">
                <div className="ictc-centre-phone">
                  <img src={callIcon} alt="Call" />
                  <a
                    href={`tel:${centre.phone?.replace(/\s/g, "")}`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {centre.phone}
                  </a>
                </div>

                <span className="ictc-centre-time">{centre.timing}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default AllCentres;