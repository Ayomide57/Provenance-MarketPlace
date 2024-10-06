
import { ChangeEvent } from "react";
import { useStorageUpload } from "@thirdweb-dev/react";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import { config } from "@/util/config";

import { readContract, writeContract } from "@wagmi/core";

import {
  registrarAbi,
  registrarAddresses,
} from "./constants";

interface IUploadFile {
  updateLink: (value: string) => void;
}

export const UploadToStorage = ({ updateLink }: IUploadFile) => {
  const { mutateAsync: upload } = useStorageUpload();

  const uploadFile = async (event: ChangeEvent<HTMLInputElement | null>) => {
    let file = event.currentTarget.files && event.currentTarget.files[0];
    const uris = await upload({ data: [file] });
    updateLink(uris[0]);
  };
  return (
    <label htmlFor="myfile">
      <div className={styles.logo}>
        <Image
          src="/upload.png"
          alt="upload Logo"
          height="100"
          width="250"
        />
      </div>
      <input
        className="h-[80px]"
        id="myfile"
        type="file"
        accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,text/plain, application/pdf, image/*"
        style={{ display: "none" }}
        onChange={(event) => uploadFile(event)}
        />
    </label>
  );

};



// Registrar

export const generateRwa = async (values: {
  rwaOwner: `0x${string}`;
  property_RegId: number;
  price: number;
}) => {
  const response = await writeContract(config, {
    address: registrarAddresses,
    abi: registrarAbi,
    functionName: "generateRwa",
    args: [
      values.rwaOwner,
      BigInt(values.property_RegId),
      BigInt(values.price),
    ],
  });
  return response;
};

export const createNewRwa = async (values: {
  rwaOwner: `0x${string}`;
  price: number;
  property_RegId: number;
  survey_zip_code: number;
  survey_number: number;
  tokenURI: string;
}) => {
  const response = await writeContract(config, {
    address: registrarAddresses,
    abi: registrarAbi,
    functionName: "createNewRwa",
    args: [
      values.rwaOwner,
      BigInt(values.property_RegId),
      BigInt(values.price),
      BigInt(values.survey_zip_code),
      BigInt(values.survey_number),
      values.tokenURI,
    ],
  });
  return response;
};

export const verificationRequest = async (values: {
  p_owner: `0x${string}`;
  property_RegId: number;
  survey_zip_code: number;
  survey_number: number;
  document_url: string;
}) => {
  const response = await writeContract(config, {
    abi: registrarAbi,
    functionName: "verification_request",
    args: [
      values.p_owner,
      BigInt(values.property_RegId),
      BigInt(values.survey_zip_code),
      BigInt(values.survey_number),
      values.document_url,
    ],
    address: registrarAddresses
  });
  return response;
};

/**export const transferAsset = async (values: {
  tokenId: number;
  newOwner: `0x${string}`;
  property_RegId: number;
}) => {
  const response = await writeContract(config, {
    address: registrarAddresses,
    abi: registrarAbi,
    functionName: "transferAsset",
    args: [BigInt(values.tokenId), values.newOwner, BigInt(values.property_RegId)],
  });
  return response;
};**/

export const assets = async (values: {
  address: `0x${string}`;
  property_RegId: number;
}) => {
  const response = await readContract(config, {
    address: registrarAddresses,
    abi: registrarAbi,
    functionName: "assets",
    args: [values.address, BigInt(values.property_RegId)],
  });
  return response;
};








