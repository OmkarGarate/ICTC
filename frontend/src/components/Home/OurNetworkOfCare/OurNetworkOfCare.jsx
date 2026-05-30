import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCenters } from "../../../redux/centers/centersSlice";
import "./OurNetworkOfCare.css";
import callIcon from "../../../assets/fluent_call-16-filled.png";

/* ---------- DISTANCE HELPER ---------- */
const getDistanceInKm = (lat1, lon1, lat2, lon2) => {
  const toRad = (value) => (value * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

const isMumbaiRegion = (address = "") =>
  /mumbai|navi mumbai|thane/i.test(address);

const OurNetworkOfCare = () => {
  const dispatch = useDispatch();
  const { list: allCenters } = useSelector((state) => state.centers);

  const [activeCentre, setActiveCentre] = useState(null);
  const [sortedCentres, setSortedCentres] = useState([]);
  const hasSorted = useRef(false);
  const hasFetched = useRef(false);

  const centres = allCenters.filter((c) => !c.isDeleted);

  /* Fetch ONCE on mount — only if not already loaded */
  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    if (!allCenters.length) {
      dispatch(fetchCenters());
    }
  }, []); // empty deps — truly runs once

  /* Sort once when centres are available */
  useEffect(() => {
    if (!centres.length || hasSorted.current) return;
    hasSorted.current = true;

    const sortByDistance = (lat, lng) =>
      [...centres]
        .map((c) => ({
          ...c,
          distance: getDistanceInKm(lat, lng, parseFloat(c.lat), parseFloat(c.lng)),
        }))
        .sort((a, b) => a.distance - b.distance);

    const fallbackSort = () => {
      const sorted = [...centres].sort((a, b) => {
        const aLocal = isMumbaiRegion(a.address);
        const bLocal = isMumbaiRegion(b.address);
        if (aLocal && !bLocal) return -1;
        if (!aLocal && bLocal) return 1;
        return 0;
      });
      setSortedCentres(sorted);
      setActiveCentre(sorted[0]);
    };

    const cachedLocation = localStorage.getItem("userLocation");

    if (cachedLocation) {
      const { latitude, longitude } = JSON.parse(cachedLocation);
      const sorted = sortByDistance(latitude, longitude);
      setSortedCentres(sorted);
      setActiveCentre(sorted[0]);
      return;
    }

    if (!navigator.geolocation) {
      fallbackSort();
      return;
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        localStorage.setItem("userLocation", JSON.stringify({ latitude, longitude }));
        const sorted = sortByDistance(latitude, longitude);
        setSortedCentres(sorted);
        setActiveCentre(sorted[0]);
      },
      () => fallbackSort()
    );
  }, [centres.length]);

  if (!activeCentre || !sortedCentres.length) return null;

  return (
    <section className="network-wrapper">
      <div className="network-container">
        {/* LEFT SIDE */}
        <div className="network-left">
          <h2>Our Network of Care</h2>

          <div className="location-grid">
            {sortedCentres.map((centre, idx) => (
              <button
                key={centre.id}
                className={`location-pill ${activeCentre.id === centre.id ? "active" : ""}`}
                onClick={() => setActiveCentre(centre)}
              >
                {centre.name.replace(/ICTC\s*/i, "")}
                {centre.distance !== undefined && idx === 0 && (
                  <span className="nearest-text"> *</span>
                )}
              </button>
            ))}
          </div>

          <div className="network-stats">
            <h1>{centres.length}</h1>
            <p>
              Centres throughout
              <br />
              Mumbai & Growing
            </p>
          </div>
        </div>

        {/* RIGHT SIDE MAP */}
        <div className="network-map">
          <a
            href={`tel:${activeCentre.phone?.replace(/\s/g, "")}`}
            className="map-phone-badge"
          >
            <img src={callIcon} alt="Call" className="call-icon" />
            <span>
              {activeCentre.name}: {activeCentre.phone}
            </span>
          </a>

          {activeCentre.mapEmbed ? (
            <iframe
              key={activeCentre.id}
              title={`${activeCentre.name} Map`}
              src={activeCentre.mapEmbed}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          ) : activeCentre.lat && activeCentre.lng ? (
            <iframe
              key={activeCentre.id}
              title={`${activeCentre.name} Map`}
              src={`https://maps.google.com/maps?q=${activeCentre.lat},${activeCentre.lng}&z=15&output=embed`}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default OurNetworkOfCare;