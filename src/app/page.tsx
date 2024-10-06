"use client";
import Modal from "@/components/Modal";
import { UploadToStorage, verificationRequest, assets } from "@/util";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import { getAccount } from "@wagmi/core";
import { config } from "@/util/config";
import { toast } from "react-hot-toast";
import { NextPage } from "next";

const Home: React.FC = () => {
  const [ipfsLink, updateLink] = useState<any>();
  const [show, showform] = useState<boolean>(false);
  const [searchResult, showSearchResult] = useState<boolean>(false);
  const [account, setAccount] = useState<`0x${string}`>();
  const [property, setProperty] =
    useState<
      [
        boolean,
        boolean,
        `0x${string}`,
        `0x${string}`,
        bigint,
        bigint,
        bigint,
        bigint,
        string,
        bigint,
      ]
    >();

  useEffect(() => {
    const accountSource = getAccount(config);
    setAccount(accountSource?.address);
  }, [account]);

  const handleFindRwa = (
    values: {
      address: any;
      property_RegId: number;
    },
    setSubmitting: {
      (isSubmitting: boolean): void;
      (arg0: boolean): void;
    },
  ) => {
    setTimeout(async () => {
      console.log(values);
      const response = await assets(values);
      if (response) showSearchResult(!show);
      console.log(response);
      setProperty(response);
      //toast.success(response); // Displays a success message
      setSubmitting(false);
    }, 400);
  };

  const handleVerificationRequestSubmit = (
    values: {
      p_owner: any;
      property_RegId: number;
      survey_zip_code: number;
      survey_number: number;
      document_url: string;
    },
    setSubmitting: {
      (isSubmitting: boolean): void;
      (arg0: boolean): void;
    },
  ) => {
    setTimeout(async () => {
      values.document_url = ipfsLink;
      console.log(values);
      const response = await verificationRequest(values);
      if (response.includes("0x")) showform(!show);
      toast.success("response"); // Displays a success message
      setSubmitting(false);
    }, 400);
  };

  return (
    <div className="h-fit bg-gradient-to-r from-gray-900 via-pink-700 to-purple-900 bg-cover bg-fixed leading-normal tracking-normal text-indigo-400">
      <div className="h-full pb-50">
        <div className="container mx-auto w-full">
          <div className="flex w-full items-center justify-between pt-4">
            <a
              className="flex items-center text-2xl font-bold text-indigo-400 no-underline hover:no-underline lg:text-4xl"
              href="#"
            >
              Provenance
              <span className="bg-gradient-to-r from-green-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                Marketplace
              </span>
            </a>

            <div className="flex w-115 content-center justify-between">
              <w3m-network-button />
              <w3m-button />
            </div>
          </div>
        </div>

        <div className="container mx-auto items-center pt-24 md:pt-36">
          <div className="w-full flex-col justify-center overflow-y-hidden lg:items-start">
            <h1 className="my-4 text-center text-3xl font-bold leading-tight text-white opacity-75 md:text-left md:text-5xl">
              Ever dream of&nbsp;
              <span className="bg-gradient-to-r from-gray-900 via-pink-500 to-purple-900 bg-clip-text text-transparent">
                transforming <br />
                your property into a&nbsp;
              </span>
              Digital Asset?
            </h1>
            <p className="mb-8 text-center text-base leading-normal md:text-left md:text-2xl">
              Let’s turn that dream into reality!
            </p>

            <button
              className="mb-8 mt-4 transform rounded bg-gradient-to-r from-purple-800 to-green-500 px-4 py-2 font-bold text-white transition duration-300 ease-in-out hover:scale-105 hover:from-pink-500 hover:to-green-500 focus:ring"
              type="button"
              onClick={() => showform(!show)}
            >
              Request verification
            </button>
            <Formik
              initialValues={{
                address: "",
                property_RegId: 0,
              }}
              onSubmit={(values, { setSubmitting }) =>
                handleFindRwa(values, setSubmitting)
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
                <form
                  onSubmit={handleSubmit}
                  className="mb-4 w-full rounded-lg bg-gray-900 px-8 pb-8 pt-6 opacity-75 shadow-lg"
                >
                  <div className="mb-4">
                    <label
                      className="mb-2 block py-2 font-bold text-blue-300"
                      htmlFor={"address"}
                    >
                      Owners Address
                    </label>
                    <input
                      className="w-full transform appearance-none rounded border p-3 leading-tight text-gray-700 shadow transition duration-300 ease-in-out hover:scale-105 focus:ring"
                      id="address"
                      type="text"
                      name="address"
                      placeholder="you@somewhere.com"
                      value={values.address}
                      onChange={handleChange}
                    />
                    {errors.address && touched.address && errors.address}
                  </div>
                  <div className="mb-4">
                    <label
                      className="mb-2 block py-2 font-bold text-blue-300"
                      htmlFor={"property_RegId"}
                    >
                      Property Registration Number
                    </label>
                    <input
                      className="w-full transform appearance-none rounded border p-3 leading-tight text-gray-700 shadow transition duration-300 ease-in-out hover:scale-105 focus:ring"
                      id="property_RegId"
                      type="text"
                      placeholder="12345"
                      name="property_RegId"
                      value={values.property_RegId}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="items-center justify-between pb-8 pt-4">
                    <button
                      className="float-right transform rounded bg-gradient-to-r from-purple-800 to-green-500 px-4 py-2 font-bold text-white transition duration-300 ease-in-out hover:scale-105 hover:from-pink-500 hover:to-green-500 focus:ring"
                      type="button"
                      onClick={() => handleSubmit()}
                    >
                      Search
                    </button>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
      {show && (
        <Modal>
          <Formik
            initialValues={{
              p_owner: account,
              property_RegId: 0,
              survey_zip_code: 0,
              survey_number: 0,
              document_url: ipfsLink,
            }}
            onSubmit={(values, { setSubmitting }) =>
              handleVerificationRequestSubmit(values, setSubmitting)
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
              <form className="mb-4 w-full rounded-lg bg-gray-900 px-8 pb-8 pt-6 opacity-75 shadow-lg">
                <div className="flex justify-between">
                  <h1 className="mb-2 block py-2 font-bold text-blue-300">
                    Request For Property Verification
                  </h1>
                  <button
                    className="text-white"
                    type="button"
                    onClick={() => showform(!show)}
                  >
                    X
                  </button>
                </div>
                <UploadToStorage updateLink={updateLink} />
                <div className="mb-4">
                  <label
                    className="mb-2 block py-2 font-bold text-blue-300"
                    htmlFor={"property_RegId"}
                  >
                    Property Registration Number
                  </label>
                  <input
                    className="w-full transform appearance-none rounded border p-3 leading-tight text-gray-700 shadow transition duration-300 ease-in-out hover:scale-105 focus:ring"
                    id="property_RegId"
                    type="text"
                    name="property_RegId"
                    placeholder="12345"
                    value={values.property_RegId}
                    onChange={handleChange}
                  />
                  {errors.property_RegId &&
                    touched.property_RegId &&
                    errors.property_RegId}
                </div>
                <div className="mb-4">
                  <label
                    className="mb-2 block py-2 font-bold text-blue-300"
                    htmlFor={"survey_zip_code"}
                  >
                    Survey Zip Code
                  </label>
                  <input
                    className="w-full transform appearance-none rounded border p-3 leading-tight text-gray-700 shadow transition duration-300 ease-in-out hover:scale-105 focus:ring"
                    id="survey_zip_code"
                    type="text"
                    name="survey_zip_code"
                    placeholder="12345"
                    value={values.survey_zip_code}
                    onChange={handleChange}
                  />
                  {errors.survey_zip_code &&
                    touched.survey_zip_code &&
                    errors.survey_zip_code}
                </div>
                <div className="mb-4">
                  <label
                    className="mb-2 block py-2 font-bold text-blue-300"
                    htmlFor={"survey_number"}
                  >
                    Survey Number
                  </label>
                  <input
                    className="w-full transform appearance-none rounded border p-3 leading-tight text-gray-700 shadow transition duration-300 ease-in-out hover:scale-105 focus:ring"
                    id="survey_number"
                    type="text"
                    name="survey_number"
                    placeholder="12345"
                    value={values.survey_number}
                    onChange={handleChange}
                  />
                  {errors.survey_number &&
                    touched.survey_number &&
                    errors.survey_number}
                </div>
                <div className="flex items-center justify-between pt-4">
                  <button
                    className="transform rounded bg-gradient-to-r from-purple-800 to-green-500 px-4 py-2 font-bold text-white transition duration-300 ease-in-out hover:scale-105 hover:from-pink-500 hover:to-green-500 focus:ring"
                    type="button"
                    onClick={() => handleSubmit()}
                  >
                    Verify
                  </button>
                </div>
              </form>
            )}
          </Formik>
        </Modal>
      )}
      {searchResult && property && (
        <Modal>
          <div className="justify-center">
            <div className="flex justify-between">
              <h1 className="mb-2 font-bold text-white">
                {account}
              </h1>
              <button
                className="text-white"
                type="button"
                onClick={() => showSearchResult(!searchResult)}
              >
                X
              </button>
            </div>
            <div className="text-white">
              <p>verified: {`${property[1]}`}</p>
              <p>Owner: {`${property[2]}`}</p>
              <p>NFT Contract Address: {`${property[3]}`}</p>
              <p>Property Registration Number: {`${property[4]}`}</p>
              <p>Survey Number: {`${property[5]}`}</p>
              <p>Survey Number: {`${property[6]}`}</p>
              <p>Value: {`${property[7]}`}</p>
              <p>Ducument URL: {`${property[8]}`}</p>
              <p>verified: {`${property[9]}`}</p>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Home;

//0x8c1403f83620bc37d931749198ad78000de1957aeb8a8b2c4c85d21536921919
//123
//100112
//133
