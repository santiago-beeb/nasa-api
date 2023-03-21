import { useState, useEffect, useRef, ImgHTMLAttributes } from "react";

//componente de react explicito

//Primera forma, se deberia usar esta forma, las otras se utilizaban anteriormente
type DateProps = {
  date?: string;
};
type ImageNative = ImgHTMLAttributes<HTMLImageElement>;

type Props = DateProps & ImageNative;

export const RandomNasa = ({ date, ...imgProps }: Props): JSX.Element => {
  const [src, setSrc] = useState(
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="
  );
  const [image, setImage] = useState<{ title: string; url: string } | null>(
    null
  );

  useEffect(() => {
    const KEY = "V2QMSwbdQw8dzQMomeULCj4rbU1IBou4nPzWg9e3";
    const apiUrl = date
      ? `https://api.nasa.gov/planetary/apod?api_key=${KEY}&date=${date}`
      : `https://api.nasa.gov/planetary/apod?api_key=${KEY}&count=1`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0 && data[0].media_type === "image") {
          setImage({
            title: data[0].title,
            url: data[0].url,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [date]);

  const node = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && image) {
          // agregamos una condición para asegurarnos de que image no sea null
          setSrc(image.url);
        }
      });
    });

    if (node.current) {
      observer.observe(node.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [image]);

  return (
    <div className="text-center">
      {image ? (
        <div>
          <h2 className="text-3xl text-white">{image.title}</h2>
          <img ref={node} src={src} {...imgProps} />
        </div>
      ) : (
        <p className="text-3xl text-white">Cargando...</p>
      )}
    </div>
  );
};

//Segunda forma
/* export const RandomNasa: FunctionComponent = () => {
  return <img />;
}; */

//Tercera forma
/* export const RandomNasa:FC = () => {
  return <img />;
}; */
