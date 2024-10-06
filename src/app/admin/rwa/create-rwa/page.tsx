"use client";
import React, { useEffect, useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { createNewRwa, UploadToStorage } from "@/util";
import { Formik } from "formik";
import { toast } from "react-hot-toast";


const CreateRwa: React.FC = () => {
      const [ipfsLink, updateLink] = useState<string>();

      const handleCreateNewRwaSubmit = (
        values: {
          rwaOwner: any;
          price: number;
          property_RegId: number;
          survey_zip_code: number;
          survey_number: number;
          tokenURI: string;
        },
        setSubmitting: { (isSubmitting: boolean): void; (arg0: boolean): void },
      ) => {
        setTimeout(async () => {
          values.tokenURI = ipfsLink ? ipfsLink : "";
          console.log(values);
          const response = await createNewRwa(values);
          if (response.includes("0x")) toast.success(response); // Displays a success message
          console.log(response);
          setSubmitting(false);
        }, 400);
      };

      useEffect(() => {
        console.log(ipfsLink);
      }, [ipfsLink]);


  return (
    <>
      <Breadcrumb pageName="Create RWA Token" />

      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
          <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
            <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
              Create RWA
            </h2>
            <Formik
              initialValues={{
                rwaOwner: "",
                price: 0,
                property_RegId: 0,
                survey_zip_code: 0,
                survey_number: 0,
                tokenURI: ipfsLink ? ipfsLink : '',
              }}
              onSubmit={(values, { setSubmitting }) =>
                handleCreateNewRwaSubmit(values, setSubmitting)
              }
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                /* and other goodies */
              }) => (
                <form onSubmit={handleSubmit}>
                  <UploadToStorage updateLink={updateLink} />
                  <div className="mb-4">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Owner address
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={values.rwaOwner}
                        placeholder="Owner address"
                        name="rwaOwner"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                      {errors.rwaOwner && touched.rwaOwner && errors.rwaOwner}
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Price
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Amount"
                        name="price"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.price}
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                      {errors.price && touched.price && errors.price}
                    </div>
                  </div>{" "}
                  <div className="mb-4">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Property Registration Number
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="property registration number"
                        name="property_RegId"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.property_RegId}
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                      {errors.property_RegId &&
                        touched.property_RegId &&
                        errors.property_RegId}
                    </div>
                  </div>{" "}
                  <div className="mb-4">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Survey Zip Code
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="survey zip code"
                        name="survey_zip_code"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.survey_zip_code}
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                      {errors.survey_zip_code &&
                        touched.survey_zip_code &&
                        errors.survey_zip_code}{" "}
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Survey Number
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="survey number"
                        name="survey_number"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.survey_number}
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                      {errors.survey_number &&
                        touched.survey_number &&
                        errors.survey_number}
                    </div>
                  </div>
                  <div className="mb-5">
                    <input
                      type="submit"
                      value="Create New NFT"
                      disabled={isSubmitting}
                      onClick={() => handleSubmit()}
                      className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                    />
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateRwa;
