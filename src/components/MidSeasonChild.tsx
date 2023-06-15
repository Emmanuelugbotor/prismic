import React from "react";
import { Link } from "react-router-dom";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
interface Props {
  image: string;
  title: string;
  mText: string;
  pText: string;
  linkSpan: string;
}
export default function MidSeasonChild({
  image,
  title,
  mText,
  pText,
  linkSpan,
}: Props) {
  return (
    <div className="left">
      <div className="image">
        <img src={image} alt="" />
      </div>
      <div className="text__content">
        <div className="title">{title}</div>
        <h2>{mText}</h2>
        <h2>{pText}</h2>
        <Link to="" className="arrow">
          <span>{linkSpan}</span>
          <ArrowRightAltIcon />
        </Link>
      </div>
    </div>
  );
}
