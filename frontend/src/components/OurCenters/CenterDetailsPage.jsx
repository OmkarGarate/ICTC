import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCenterById,
  clearSelectedCenter,
} from "../../redux/centers/centersSlice";

import CenterBreadcrumb from "./CenterBreadcrumb/CenterBreadcrumb";
import OurCenterHero from "./OurCenterHero/OurCenterHero";
import CenterDescription from "./CenterAbout/CenterDescription";
import ExpertsAtICTC from "./ExpertsAtICTC/ExpertsAtICTC";
import CenterGallery from "./CenterGallery/CenterGallery";
import PatientTestimonials from "./PatientTestimonials/PatientTestimonials";
import BookAppointmentCenter from "./BookAppointmentCenter/BookAppointmentCenter";

import BookAppointment from "../Home/BookAppointment/BookAppointment";
import OurNetworkOfCare from "../Home/OurNetworkOfCare/OurNetworkOfCare";
import RequestCallback from "../Home/RequestCallback/RequestCallback";
import ServicesatICTC from "../Home/ServicesatICTC/ServicesatICTC";

const CenterDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { selected: center, loading, error } = useSelector(
    (state) => state.centers
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchCenterById(id));
    }
    return () => {
      dispatch(clearSelectedCenter());
    };
  }, [dispatch, id]);

  if (loading) return <div style={{ padding: "80px", textAlign: "center" }}>Loading...</div>;
  if (error) return <div style={{ padding: "80px", textAlign: "center" }}>Error: {error}</div>;
  if (!center) return null;

  return (
    <>
      <CenterBreadcrumb center={center} />
      <OurCenterHero center={center} />
      <CenterDescription center={center} />
      <ExpertsAtICTC center={center} />
      <ServicesatICTC />
      <PatientTestimonials />
      <BookAppointment />
      <CenterGallery center={center} />
      <OurNetworkOfCare />
      <RequestCallback />
    </>
  );
};

export default CenterDetailPage;