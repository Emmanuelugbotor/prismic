import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { Link } from "react-router-dom";
import jewellery from "../assets/jewellery.webp";
export default function Carousal() {
  return (
    <div className="carousal">
      <div
        className="image"
        style={{
          background: `url(${jewellery})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "bottom center",
        }}
      >
      </div>
      <div className="left">
        <button>up to 50% off</button>
        <h3>Ray Pandant lamp</h3>
        <h3>choose your comfort</h3>
        <Link to="" className="expore">
          Expore Now <ArrowRightAltIcon />
        </Link>
      </div>
    </div>
  );
}
