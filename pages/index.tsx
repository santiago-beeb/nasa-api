import Head from "next/head";
import { RandomNasa } from "@/components/RandomNasa";
import { MouseEventHandler, useState } from "react";

export default function Home() {
  const [imageCount, setImageCount] = useState(1);

  const handleAddImage: MouseEventHandler<HTMLButtonElement> = () => {
    setImageCount((count) => count + 1);
  };

  return (
    <>
      <Head>
        <title>Next React and Ts</title>
        <meta name="description" content="Generated by Santiago" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="flex-auto p-6">
          <h1 className="text-3xl font-bold underline text-center"></h1>
          <div className="mx-auto">
            <button
              className="bg-white text-black border border-black py-2 px-4 rounded hover:bg-black hover:text-white"
              onClick={handleAddImage}
            >
              Agregar otra imagen
            </button>
          </div>

          {[...Array(imageCount)].map((_, index) => (
            <RandomNasa
              key={index}
              width="320"
              height="auto"
              className="mx-auto rounded-md bg-gray-300 text-center"
              onClick={() => console.log("")}
            />
          ))}
        </div>
      </main>
    </>
  );
}
