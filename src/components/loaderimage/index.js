import Image from "next/image";
import { useState } from "react";

export default function LoaderImage(props) {
  const [loading, setLoading] = useState(true);
  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Image
          src={props.src}
          alt={props.alt}
          fill
          onLoad={() => setLoading(false)}
        />
      )}
    </>
  );
}
