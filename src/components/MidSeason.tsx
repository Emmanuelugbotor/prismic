import { Link } from "react-router-dom";

import firstImage from "../assets/cms_4_1950x.webp";
import secondImage from "../assets/cms_5_1950x.webp";
import MidSeasonChild from "./MidSeasonChild";

export default function MidSeason() {
  return (
    <div className="midseason">
      <MidSeasonChild
        title="Mid Season"
        mText="Modern Dining"
        pText="Chairs"
        linkSpan="Shop Now"
        image={firstImage}
      />
      <MidSeasonChild
        title="Top Trending"
        mText="Lamps"
        pText="Upto 30%"
        linkSpan="Shop Now"
        image={secondImage}
      />
    </div>
  );
}
