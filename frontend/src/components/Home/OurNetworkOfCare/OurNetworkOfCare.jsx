import { useEffect, useState } from "react";
import "./OurNetworkOfCare.css";
import callIcon from "../../../assets/fluent_call-16-filled.png";
import centerData from "../../../data/centerData";

const centres = Object.values(centerData);

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

/* ---------- CITY FALLBACK ---------- */
const isMumbaiRegion = (address = "") =>
  /mumbai|navi mumbai|thane/i.test(address);

const OurNetworkOfCare = () => {
  const [activeCentre, setActiveCentre] = useState(null);
  const [sortedCentres, setSortedCentres] = useState(centres);

  /* ---------- SORTERS ---------- */
  const sortByDistance = (lat, lng) =>
    [...centres]
      .map((centre) => ({
        ...centre,
        distance: getDistanceInKm(
          lat,
          lng,
          centre.lat,
          centre.lng
        ),
      }))
      .sort((a, b) => a.distance - b.distance);

  const fallbackSort = () => {
    const sorted = [...centres].sort(
      (a, b) => {
        const aLocal = isMumbaiRegion(a.address);
        const bLocal = isMumbaiRegion(b.address);

        if (aLocal && !bLocal) return -1;
        if (!aLocal && bLocal) return 1;
        return 0;
      }
    );

    setSortedCentres(sorted);
    setActiveCentre(sorted[0]);
  };

  useEffect(() => {
    const cachedLocation =
      localStorage.getItem("userLocation");

    /* 1️⃣ Use cached location */
    if (cachedLocation) {
      const { latitude, longitude } =
        JSON.parse(cachedLocation);

      // Use a microtask to avoid synchronous setState in effect
      Promise.resolve().then(() => {
        const sorted = sortByDistance(
          latitude,
          longitude
        );
        setSortedCentres(sorted);
        setActiveCentre(sorted[0]);
      });
      return;
    }

    /* 2️⃣ Ask for location */
    if (!navigator.geolocation) {
      Promise.resolve().then(() => {
        fallbackSort();
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } =
          position.coords;

        localStorage.setItem(
          "userLocation",
          JSON.stringify({ latitude, longitude })
        );

        const sorted = sortByDistance(
          latitude,
          longitude
        );
        setSortedCentres(sorted);
        setActiveCentre(sorted[0]);
      },
      () => {
        Promise.resolve().then(() => {
          fallbackSort();
        });
      }
    );
  }, []);

  if (!activeCentre) return null;

  return (
    <section className="network-wrapper">
      <div className="network-container">
        {/* LEFT SIDE */}
        <div className="network-left">
          <h2>Our Network of Care</h2>

          <div className="location-grid">
            {sortedCentres.map((centre) => (
              <button
                key={centre.slug}
                className={`location-pill ${
                  activeCentre.slug === centre.slug
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  setActiveCentre(centre)
                }
              >
                {centre.name.replace("ICTC ", "")}
                {centre.distance !== undefined &&
                  centre.slug ===
                    sortedCentres[0].slug && (
                    <span className="nearest-text">
                      {" "}
                      *
                    </span>
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
          {/* PHONE BADGE */}
          <a
            href={`tel:${activeCentre.phone.replace(
              /\s/g,
              ""
            )}`}
            className="map-phone-badge"
          >
            <img
              src={callIcon}
              alt="Call"
              className="call-icon"
            />
            <span>
              {activeCentre.name}:{" "}
              {activeCentre.phone}
            </span>
          </a>

          {/* MAP */}
          <iframe
            title={`${activeCentre.name} Map`}
            src={activeCentre.mapEmbed}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
};

export default OurNetworkOfCare;
