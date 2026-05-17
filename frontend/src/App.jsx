// import { Routes, Route, useLocation } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { useEffect } from "react";
// import "./index.css";

// /* ================= COMMON COMPONENTS ================= */
// import Navbar from "./components/Home/Navbar/Navbar";
// import Footer from "./components/Home/Footer/Footer";
// import ScrollToTop from "./components/Common/ScrollToTop";
// import NotFound from "./components/Common/NotFound";
// import WhatsAppFloat from "./components/WhatsAppFloat/WhatsAppFloat";
// import Chatbot from "./components/Chatbot/Chatbot";

// /* ================= HOME ================= */
// import HeroCarousel from "./components/Home/HeroCarousel/HeroCarousel";
// import AboutImageSection from "./components/Home/AboutImageSection/AboutImageSection";
// import WhyChooseICTCImage from "./components/Home/WhyChooseICTC/WhyChooseICTC";
// import CancersWeTreat from "./components/Home/CancersWeTreat/CancersWeTreat";
// import MeetOurExperts from "./components/Home/MeetOurExperts/MeetOurExperts";
// import ServicesatICTC from "./components/Home/ServicesatICTC/ServicesatICTC";
// import NewsFromExperts from "./components/Home/NewsFromExperts/NewsFromExperts";
// import BookAppointment from "./components/Home/BookAppointment/BookAppointment";
// import RequestCallback from "./components/Home/RequestCallback/RequestCallback";
// import OurNetworkOfCare from "./components/Home/OurNetworkOfCare/OurNetworkOfCare";

// /* ================= CENTERS ================= */
// import CenterDetailPage from "./components/OurCenters/CenterDetailsPage";
// import AllCentres from "./components/AllCentres/AllCentres";
// import AllCentersBreadcrumb from "./components/AllCentres/AllCentersBreadcrumb";

// /* ================= DOCTORS ================= */
// import DoctorProfile from "./components/DoctorProfiles/DoctorProfile/DoctorProfile";
// import DoctorBreadcrumb from "./components/DoctorProfiles/DoctorBreadcrumb/DoctorBreadcrumb";
// import PatientStoriesEmbed from "./components/DoctorProfiles/PatientStoriesEmbed/PatientStoriesEmbed";
// import OurDoctorTeam from "./components/OurDoctorTeam/OurDoctorTeam";
// import AllDoctorsBreadcrumb from "./components/OurDoctorTeam/AllDoctorsBreadcrumb";
// import DoctorDetailPage from "./components/DoctorProfiles/DoctorDetailPage";

// /* ================= BLOG ================= */
// import BlogsSection from "./components/BlogsSection/BlogsSection";
// import BlogBreadcrumb from "./components/BlogsSection/BlogBreadcrumb";
// import BlogPost from "./components/BlogsSection/BlogPost";
// import BlogPostBreadcrumb from "./components/BlogsSection/BlogPostBreadcrumb";

// /* ================= CANCER ================= */
// import CancerDetails from "./components/CancerDetails/CancerDetails";
// import CancerDetBreadcrumb from "./components/CancerDetails/CancerDetBreadcrumb";
// import AllCancerTypePage from "./components/CancerDetails/AllCancerTypePage";
// import AllCancerDetBreadcrumb from "./components/CancerDetails/AllCancerDetBreadcrumb";

// /* ================= SERVICES ================= */
// import ServicePage from "./components/ServicePage/ServicePage";
// import AllServicePage from "./components/ServicePage/AllServicePage";
// import ServiceBreadcrumb from "./components/ServicePage/ServiceBreadcrumb";
// import AllServiceBreadcrumb from "./components/ServicePage/AllServiceBreadcrumb";

// /* ================= OTHER ================= */
// import AboutUs from "./components/AboutUs/AboutUs";
// import AboutUsBreadcrumb from "./components/AboutUs/AboutUsBreadcrumb";
// import BookAppoinmentFull from "./components/BookAppoinmentSecond/BookAppoinmentFull";
// import BookSecondOp from "./components/BookAppoinmentSecond/BookSecondOp";
// import BookAppoinmentBreadcrumb from "./components/BookAppoinmentSecond/BookAppoinmentBreadcrumb";
// import BookSecondAppoinmentBreadcrumb from "./components/BookAppoinmentSecond/BookSecondAppoinmentBreadcrumb";
// import PrivacyPolicy from "./components/PrivacyPolicy/PrivacyPolicy";
// import PatientTestimonials from "./components/OurCenters/PatientTestimonials/PatientTestimonials";

// /* ================= ADMIN ================= */
// import AdminLogin from "./admin/auth/AdminLogin";
// import ProtectedRoute from "./admin/auth/ProtectedRoute";
// import AdminLayout from "./admin/AdminLayout";

// /* ================= TOAST ================= */
// import ToastContainer from "./components/Toasts/ToastContainer";

// /* ================= REDUX ================= */
// import { fetchCurrentUser } from "./redux/auth/authSlice";

// function App() {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(fetchCurrentUser());
//   }, [dispatch]);

//   const location = useLocation();
//   const isAdminRoute = location.pathname.startsWith("/ctrl");

//   return (
//     <>
//       <ScrollToTop />

//       {/* Toast notifications — mounted once at the root so they appear everywhere */}
//       <ToastContainer />

//       {!isAdminRoute && <Navbar />}

//       <main>
//         <Routes>
//           {/* HOME */}
//           <Route
//             path="/"
//             element={
//               <>
//                 <HeroCarousel />
//                 <AboutImageSection />
//                 <WhyChooseICTCImage />
//                 <CancersWeTreat />
//                 <MeetOurExperts />
//                 <ServicesatICTC />
//                 <NewsFromExperts />
//                 <BookAppointment />
//                 <OurNetworkOfCare />
//                 <RequestCallback />
//               </>
//             }
//           >
//             <Route path="success" element={null} />
//           </Route>

//           {/* CENTERS */}
//           <Route
//             path="/OurCentres"
//             element={
//               <>
//                 <AllCentersBreadcrumb />
//                 <AllCentres />
//                 <BookAppointment />
//                 <OurNetworkOfCare />
//                 <RequestCallback />
//               </>
//             }
//           />
//           <Route path="/OurCentres/:slug" element={<CenterDetailPage />} />

//           {/* Legacy center routes — kept so old links don't break */}
//           <Route
//             path="/allCenters"
//             element={
//               <>
//                 <AllCentersBreadcrumb />
//                 <AllCentres />
//                 <OurNetworkOfCare />
//                 <RequestCallback />
//               </>
//             }
//           />
//           <Route path="/centre/:id" element={<CenterDetailPage />} />

//           {/* DOCTORS */}
//           <Route
//             path="/OurDoctors"
//             element={
//               <>
//                 <AllDoctorsBreadcrumb />
//                 <OurDoctorTeam />
//                 <BookAppointment />
//                 <OurNetworkOfCare />
//                 <RequestCallback />
//               </>
//             }
//           />
//           <Route
//             path="/OurDoctors/:slug"
//             element={
//               <>
//                 <DoctorBreadcrumb />
//                 <DoctorProfile />
//                 <PatientStoriesEmbed />
//                 <BookAppointment />
//                 <OurNetworkOfCare />
//                 <RequestCallback />
//               </>
//             }
//           />

//           {/* Legacy doctor routes — kept so old links don't break */}
//           <Route
//             path="/ourDoctors"
//             element={
//               <>
//                 <AllDoctorsBreadcrumb />
//                 <OurDoctorTeam />
//                 <BookAppointment />
//                 <OurNetworkOfCare />
//                 <RequestCallback />
//               </>
//             }
//           />
//           <Route path="/doctor/:slug" element={<DoctorDetailPage />} />

//           {/* BLOG */}
//           <Route
//             path="/Blogs"
//             element={
//               <>
//                 <BlogBreadcrumb />
//                 <BlogsSection />
//                 <BookAppointment />
//                 <OurNetworkOfCare />
//                 <RequestCallback />
//               </>
//             }
//           />
//           <Route
//             path="/Blogs/:slug"
//             element={
//               <>
//                 <BlogPostBreadcrumb />
//                 <BlogPost />
//                 <BookAppointment />
//                 <OurNetworkOfCare />
//                 <RequestCallback />
//               </>
//             }
//           />

//           {/* Legacy blog routes — kept so old links don't break */}
//           <Route
//             path="/blog"
//             element={
//               <>
//                 <BlogBreadcrumb />
//                 <BlogsSection />
//                 <OurNetworkOfCare />
//                 <RequestCallback />
//               </>
//             }
//           />
//           <Route
//             path="/blog/:id/:slug"
//             element={
//               <>
//                 <BlogPostBreadcrumb />
//                 <BlogPost />
//                 <OurNetworkOfCare />
//                 <RequestCallback />
//               </>
//             }
//           />

//           {/* CANCER */}
//           <Route
//             path="/CancerTypes"
//             element={
//               <>
//                 <AllCancerDetBreadcrumb />
//                 <AllCancerTypePage />
//                 <BookAppointment />
//                 <OurNetworkOfCare />
//                 <RequestCallback />
//               </>
//             }
//           />
//           <Route
//             path="/CancerTypes/:slug"
//             element={
//               <>
//                 <CancerDetBreadcrumb />
//                 <CancerDetails />
//                 <BookAppointment />
//                 <OurNetworkOfCare />
//                 <RequestCallback />
//               </>
//             }
//           />

//           {/* Legacy cancer routes — kept so old links don't break */}
//           <Route
//             path="/AllCancer"
//             element={
//               <>
//                 <AllCancerDetBreadcrumb />
//                 <AllCancerTypePage />
//                 <BookAppointment />
//                 <OurNetworkOfCare />
//                 <RequestCallback />
//               </>
//             }
//           />
//           <Route
//             path="/cancer/:slug"
//             element={
//               <>
//                 <CancerDetBreadcrumb />
//                 <CancerDetails />
//                 <OurNetworkOfCare />
//                 <RequestCallback />
//               </>
//             }
//           />

//           {/* SERVICES */}
//           <Route
//             path="/Services/:slug"
//             element={
//               <>
//                 <ServiceBreadcrumb />
//                 <ServicePage />
//                 <BookAppointment />
//                 <OurNetworkOfCare />
//                 <RequestCallback />
//               </>
//             }
//           />
//           <Route
//             path="/AllService"
//             element={
//               <>
//                 <AllServiceBreadcrumb />
//                 <AllServicePage />
//                 <BookAppointment />
//                 <OurNetworkOfCare />
//                 <RequestCallback />
//               </>
//             }
//           />

//           {/* Legacy service routes — kept so old links don't break */}
//           <Route
//             path="/service/:slug"
//             element={
//               <>
//                 <ServiceBreadcrumb />
//                 <ServicePage />
//                 <ServicesatICTC />
//                 <BookAppointment />
//                 <OurNetworkOfCare />
//                 <RequestCallback />
//               </>
//             }
//           />

//           {/* ABOUT */}
//           <Route
//             path="/aboutUs"
//             element={
//               <>
//                 <AboutUsBreadcrumb />
//                 <AboutUs />
//                 <OurNetworkOfCare />
//                 <RequestCallback />
//               </>
//             }
//           />

//           {/* BOOK APPOINTMENT */}
//           <Route
//             path="/BookAppoinment"
//             element={
//               <>
//                 <BookAppoinmentBreadcrumb />
//                 <BookAppoinmentFull />
//                 <OurNetworkOfCare />
//                 <RequestCallback />
//               </>
//             }
//           >
//             <Route path="success" element={null} />
//           </Route>

//           {/* SECOND OPINION */}
//           <Route
//             path="/BookSecondOpinion"
//             element={
//               <>
//                 <BookSecondAppoinmentBreadcrumb />
//                 <BookSecondOp />
//                 <OurNetworkOfCare />
//                 <RequestCallback />
//               </>
//             }
//           >
//             <Route path="success" element={null} />
//           </Route>

//           {/* PRIVACY POLICY */}
//           <Route path="/privacy-policy" element={<PrivacyPolicy />} />

//           {/* ================= ADMIN ROUTES ================= */}

//           <Route path="/ctrl/login" element={<AdminLogin />} />

//           <Route
//             path="/ctrl/*"
//             element={
//               <ProtectedRoute>
//                 <AdminLayout />
//               </ProtectedRoute>
//             }
//           />

//           {/* ================= 404 ================= */}
//           <Route path="*" element={<NotFound />} />
//         </Routes>
//       </main>

//       {/* Hide website extras in admin and on /success popup */}
//       {(() => {
//         const isSuccessPopup = location.pathname.endsWith("/success");
//         return (
//           <>
//             {!isAdminRoute && !isSuccessPopup && <WhatsAppFloat />}
//             {!isAdminRoute && !isSuccessPopup && <Chatbot />}
//             {!isAdminRoute && <Footer />}
//           </>
//         );
//       })()}
//     </>
//   );
// }

// export default App;



import { Routes, Route, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import "./index.css";

/* ================= COMMON COMPONENTS ================= */
import Navbar from "./components/Home/Navbar/Navbar";
import Footer from "./components/Home/Footer/Footer";
import ScrollToTop from "./components/Common/ScrollToTop";
import NotFound from "./components/Common/NotFound";
import WhatsAppFloat from "./components/WhatsAppFloat/WhatsAppFloat";
import Chatbot from "./components/Chatbot/Chatbot";

/* ================= HOME ================= */
import HeroCarousel from "./components/Home/HeroCarousel/HeroCarousel";
import AboutImageSection from "./components/Home/AboutImageSection/AboutImageSection";
import WhyChooseICTCImage from "./components/Home/WhyChooseICTC/WhyChooseICTC";
import CancersWeTreat from "./components/Home/CancersWeTreat/CancersWeTreat";
import MeetOurExperts from "./components/Home/MeetOurExperts/MeetOurExperts";
import ServicesatICTC from "./components/Home/ServicesatICTC/ServicesatICTC";
import NewsFromExperts from "./components/Home/NewsFromExperts/NewsFromExperts";
import BookAppointment from "./components/Home/BookAppointment/BookAppointment";
import RequestCallback from "./components/Home/RequestCallback/RequestCallback";
import OurNetworkOfCare from "./components/Home/OurNetworkOfCare/OurNetworkOfCare";

/* ================= CENTERS ================= */
import CenterDetailPage from "./components/OurCenters/CenterDetailsPage";
import AllCentres from "./components/AllCentres/AllCentres";
import AllCentersBreadcrumb from "./components/AllCentres/AllCentersBreadcrumb";

/* ================= DOCTORS ================= */
import DoctorProfile from "./components/DoctorProfiles/DoctorProfile/DoctorProfile";
import DoctorBreadcrumb from "./components/DoctorProfiles/DoctorBreadcrumb/DoctorBreadcrumb";
import PatientStoriesEmbed from "./components/DoctorProfiles/PatientStoriesEmbed/PatientStoriesEmbed";
import OurDoctorTeam from "./components/OurDoctorTeam/OurDoctorTeam";
import AllDoctorsBreadcrumb from "./components/OurDoctorTeam/AllDoctorsBreadcrumb";
import DoctorDetailPage from "./components/DoctorProfiles/DoctorDetailPage";

/* ================= BLOG ================= */
import BlogsSection from "./components/BlogsSection/BlogsSection";
import BlogBreadcrumb from "./components/BlogsSection/BlogBreadcrumb";
import BlogPost from "./components/BlogsSection/BlogPost";
import BlogPostBreadcrumb from "./components/BlogsSection/BlogPostBreadcrumb";

/* ================= CANCER ================= */
import CancerDetails from "./components/CancerDetails/CancerDetails";
import CancerDetBreadcrumb from "./components/CancerDetails/CancerDetBreadcrumb";
import AllCancerTypePage from "./components/CancerDetails/AllCancerTypePage";
import AllCancerDetBreadcrumb from "./components/CancerDetails/AllCancerDetBreadcrumb";

/* ================= SERVICES ================= */
import ServicePage from "./components/ServicePage/ServicePage";
import AllServicePage from "./components/ServicePage/AllServicePage";
import ServiceBreadcrumb from "./components/ServicePage/ServiceBreadcrumb";
import AllServiceBreadcrumb from "./components/ServicePage/AllServiceBreadcrumb";

/* ================= OTHER ================= */
import AboutUs from "./components/AboutUs/AboutUs";
import AboutUsBreadcrumb from "./components/AboutUs/AboutUsBreadcrumb";
import BookAppoinmentFull from "./components/BookAppoinmentSecond/BookAppoinmentFull";
import BookSecondOp from "./components/BookAppoinmentSecond/BookSecondOp";
import BookAppoinmentBreadcrumb from "./components/BookAppoinmentSecond/BookAppoinmentBreadcrumb";
import BookSecondAppoinmentBreadcrumb from "./components/BookAppoinmentSecond/BookSecondAppoinmentBreadcrumb";
import PrivacyPolicy from "./components/PrivacyPolicy/PrivacyPolicy";
import PatientTestimonials from "./components/OurCenters/PatientTestimonials/PatientTestimonials";

/* ================= ADMIN ================= */
import AdminLogin from "./admin/auth/AdminLogin";
import ProtectedRoute from "./admin/auth/ProtectedRoute";
import AdminLayout from "./admin/AdminLayout";

/* ================= TOAST ================= */
import ToastContainer from "./components/Toasts/ToastContainer";

/* ================= REDUX ================= */
import { fetchCurrentUser } from "./redux/auth/authSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/ctrl");

  return (
    <>
      <ScrollToTop />

      {/* Toast notifications — mounted once at the root so they appear everywhere */}
      <ToastContainer />

      {!isAdminRoute && <Navbar />}

      <main>
        <Routes>
          {/* HOME */}
          <Route
            path="/"
            element={
              <>
                <HeroCarousel />
                <AboutImageSection />
                <WhyChooseICTCImage />
                <CancersWeTreat />
                <MeetOurExperts />
                <ServicesatICTC />
                <NewsFromExperts />
                <BookAppointment />
                <OurNetworkOfCare />
                <RequestCallback />
              </>
            }
          >
            <Route path="success" element={null} />
          </Route>

          {/* CENTERS */}
          <Route
            path="/OurCentres"
            element={
              <>
                <AllCentersBreadcrumb />
                <AllCentres />
                <BookAppointment />
                <OurNetworkOfCare />
                <RequestCallback />
              </>
            }
          />
          <Route path="/OurCentres/:slug/:id" element={<CenterDetailPage />} />

          {/* Legacy center routes — kept so old links don't break */}
          <Route
            path="/allCenters"
            element={
              <>
                <AllCentersBreadcrumb />
                <AllCentres />
                <OurNetworkOfCare />
                <RequestCallback />
              </>
            }
          />
          <Route path="/centre/:id" element={<CenterDetailPage />} />

          {/* DOCTORS */}
          <Route
            path="/OurDoctors"
            element={
              <>
                <AllDoctorsBreadcrumb />
                <OurDoctorTeam />
                <BookAppointment />
                <OurNetworkOfCare />
                <RequestCallback />
              </>
            }
          />
          <Route
            path="/OurDoctors/:slug/:id"
            element={
              <>
                <DoctorBreadcrumb />
                <DoctorProfile />
                <PatientStoriesEmbed />
                <BookAppointment />
                <OurNetworkOfCare />
                <RequestCallback />
              </>
            }
          />

          {/* Legacy doctor routes — kept so old links don't break */}
          <Route
            path="/ourDoctors"
            element={
              <>
                <AllDoctorsBreadcrumb />
                <OurDoctorTeam />
                <BookAppointment />
                <OurNetworkOfCare />
                <RequestCallback />
              </>
            }
          />
          <Route path="/doctor/:slug/:id" element={<DoctorDetailPage />} />

          {/* BLOG */}
          <Route
            path="/Blogs"
            element={
              <>
                <BlogBreadcrumb />
                <BlogsSection />
                <BookAppointment />
                <OurNetworkOfCare />
                <RequestCallback />
              </>
            }
          />
          <Route
            path="/Blogs/:slug"
            element={
              <>
                <BlogPostBreadcrumb />
                <BlogPost />
                <BookAppointment />
                <OurNetworkOfCare />
                <RequestCallback />
              </>
            }
          />

          {/* Legacy blog routes — kept so old links don't break */}
          <Route
            path="/blog"
            element={
              <>
                <BlogBreadcrumb />
                <BlogsSection />
                <OurNetworkOfCare />
                <RequestCallback />
              </>
            }
          />
          <Route
            path="/blog/:id/:slug"
            element={
              <>
                <BlogPostBreadcrumb />
                <BlogPost />
                <OurNetworkOfCare />
                <RequestCallback />
              </>
            }
          />

          {/* CANCER */}
          <Route
            path="/CancerTypes"
            element={
              <>
                <AllCancerDetBreadcrumb />
                <AllCancerTypePage />
                <BookAppointment />
                <OurNetworkOfCare />
                <RequestCallback />
              </>
            }
          />
          <Route
            path="/CancerTypes/:slug/:id"
            element={
              <>
                <CancerDetBreadcrumb />
                <CancerDetails />
                <BookAppointment />
                <OurNetworkOfCare />
                <RequestCallback />
              </>
            }
          />

          {/* Legacy cancer routes — kept so old links don't break */}
          <Route
            path="/AllCancer"
            element={
              <>
                <AllCancerDetBreadcrumb />
                <AllCancerTypePage />
                <BookAppointment />
                <OurNetworkOfCare />
                <RequestCallback />
              </>
            }
          />
          <Route
            path="/cancer/:slug/:id"
            element={
              <>
                <CancerDetBreadcrumb />
                <CancerDetails />
                <OurNetworkOfCare />
                <RequestCallback />
              </>
            }
          />

          {/* SERVICES */}
          <Route
            path="/Services/:slug/:id"
            element={
              <>
                <ServiceBreadcrumb />
                <ServicePage />
                <BookAppointment />
                <OurNetworkOfCare />
                <RequestCallback />
              </>
            }
          />
          <Route
            path="/AllService"
            element={
              <>
                <AllServiceBreadcrumb />
                <AllServicePage />
                <BookAppointment />
                <OurNetworkOfCare />
                <RequestCallback />
              </>
            }
          />

          {/* Legacy service routes — kept so old links don't break */}
          <Route
            path="/service/:slug/:id"
            element={
              <>
                <ServiceBreadcrumb />
                <ServicePage />
                <ServicesatICTC />
                <BookAppointment />
                <OurNetworkOfCare />
                <RequestCallback />
              </>
            }
          />

          {/* ABOUT */}
          <Route
            path="/aboutUs"
            element={
              <>
                <AboutUsBreadcrumb />
                <AboutUs />
                <OurNetworkOfCare />
                <RequestCallback />
              </>
            }
          />

          {/* BOOK APPOINTMENT */}
          <Route
            path="/BookAppoinment"
            element={
              <>
                <BookAppoinmentBreadcrumb />
                <BookAppoinmentFull />
                <OurNetworkOfCare />
                <RequestCallback />
              </>
            }
          >
            <Route path="success" element={null} />
          </Route>

          {/* SECOND OPINION */}
          <Route
            path="/BookSecondOpinion"
            element={
              <>
                <BookSecondAppoinmentBreadcrumb />
                <BookSecondOp />
                <OurNetworkOfCare />
                <RequestCallback />
              </>
            }
          >
            <Route path="success" element={null} />
          </Route>

          {/* PRIVACY POLICY */}
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />

          {/* ================= ADMIN ROUTES ================= */}

          <Route path="/ctrl/login" element={<AdminLogin />} />

          <Route
            path="/ctrl/*"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          />

          {/* ================= 404 ================= */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* Hide website extras in admin and on /success popup */}
      {(() => {
        const isSuccessPopup = location.pathname.endsWith("/success");
        return (
          <>
            {!isAdminRoute && !isSuccessPopup && <WhatsAppFloat />}
            {!isAdminRoute && !isSuccessPopup && <Chatbot />}
            {!isAdminRoute && <Footer />}
          </>
        );
      })()}
    </>
  );
}

export default App;