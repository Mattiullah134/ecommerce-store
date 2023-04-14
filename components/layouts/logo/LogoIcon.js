import React from "react";
import { Link } from "@mui/material";
import Image from "next/image";
import LogoDark from "../../../public/ecommLogo.png";

const LogoIcon = () => {
  return (
    <Link href="/" className="flex items-center">
      <Image className="w-10" src={LogoDark} alt={LogoDark} />
      <span>Matti's store | Admin</span>
    </Link>
  );
};

export default LogoIcon;
