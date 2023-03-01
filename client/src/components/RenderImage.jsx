import { useEffect, useState } from "react";
import '../assets/styles/chatGrupal.css'

function RenderImage(props) {
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    const reader = new FileReader();
    reader.readAsDataURL(props.blob);
    reader.onloadend = function () {
      setImageSrc(reader.result);
    };
  }, [props.blob]);

  return (
    <img src={imageSrc} alt={props.fileName} className="img"></img>
  );
}

export default RenderImage;