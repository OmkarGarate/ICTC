// import { useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchDoctorBySlug,
//   clearSelectedDoctor,
// } from "../../redux/doctors/doctorsSlice";
// import { fetchCenters } from "../../redux/centers/centersSlice";

// import DoctorBreadcrumb from "./DoctorBreadcrumb/DoctorBreadcrumb";
// import DoctorProfile from "./DoctorProfile/DoctorProfile";
// import PatientStoriesEmbed from "./PatientStoriesEmbed/PatientStoriesEmbed";
// import PatientTestimonials from "../OurCenters/PatientTestimonials/PatientTestimonials";
// import OurNetworkOfCare from "../Home/OurNetworkOfCare/OurNetworkOfCare";
// import RequestCallback from "../Home/RequestCallback/RequestCallback";

// const DoctorDetailPage = () => {
//   const { slug } = useParams();
//   const dispatch = useDispatch();

//   const { selected: doctor, loading, error } = useSelector(
//     (state) => state.doctors
//   );
//   const { list: centers } = useSelector((state) => state.centers);

//   useEffect(() => {
//     if (slug) dispatch(fetchDoctorBySlug(slug));
//     return () => dispatch(clearSelectedDoctor());
//   }, [dispatch, slug]);

//   // Fetch centers list if not already loaded (needed to resolve centreIds → name/phone)
//   useEffect(() => {
//     if (!centers.length) dispatch(fetchCenters());
//   }, [dispatch]);

//   if (loading) return <div style={{ padding: "80px", textAlign: "center" }}>Loading...</div>;
//   if (error) return <div style={{ padding: "80px", textAlign: "center" }}>Error: {error}</div>;
//   if (!doctor) return null;

//   return (
//     <>
//       <DoctorBreadcrumb doctor={doctor} />
//       <DoctorProfile doctor={doctor} centers={centers} />
//       <PatientStoriesEmbed doctor={doctor} />
//       <PatientTestimonials />
//       <OurNetworkOfCare />
//       <RequestCallback />
//     </>
//   );
// };

// export default DoctorDetailPage;



import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDoctorById,
  clearSelectedDoctor,
} from "../../redux/doctors/doctorsSlice";
import { fetchCenters } from "../../redux/centers/centersSlice";

import DoctorBreadcrumb from "./DoctorBreadcrumb/DoctorBreadcrumb";
import DoctorProfile from "./DoctorProfile/DoctorProfile";
import PatientStoriesEmbed from "./PatientStoriesEmbed/PatientStoriesEmbed";
import PatientTestimonials from "../OurCenters/PatientTestimonials/PatientTestimonials";
import OurNetworkOfCare from "../Home/OurNetworkOfCare/OurNetworkOfCare";
import RequestCallback from "../Home/RequestCallback/RequestCallback";

const DoctorDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { selected: doctor, loading, error } = useSelector(
    (state) => state.doctors
  );
  const { list: centers } = useSelector((state) => state.centers);

  useEffect(() => {
    if (id) dispatch(fetchDoctorById(id));
    return () => dispatch(clearSelectedDoctor());
  }, [dispatch, id]);

  // Fetch centers list if not already loaded (needed to resolve centreIds → name/phone)
  useEffect(() => {
    if (!centers.length) dispatch(fetchCenters());
  }, [dispatch]);

  if (loading) return <div style={{ padding: "80px", textAlign: "center" }}>Loading...</div>;
  if (error) return <div style={{ padding: "80px", textAlign: "center" }}>Error: {error}</div>;
  if (!doctor) return null;

  return (
    <>
      <DoctorBreadcrumb doctor={doctor} />
      <DoctorProfile doctor={doctor} centers={centers} />
      <PatientStoriesEmbed doctor={doctor} />
      <PatientTestimonials />
      <OurNetworkOfCare />
      <RequestCallback />
    </>
  );
};

export default DoctorDetailPage;