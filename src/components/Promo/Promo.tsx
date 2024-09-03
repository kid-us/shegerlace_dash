import axios from "axios";
import { useState } from "react";
import baseUrl from "../../services/request";
import usePromo from "../../hooks/usePromo";

const Promo = () => {
  const [brand, setBrand] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const { brands } = usePromo();

  // Create Promo
  const handleSubmit = () => {
    if (brand.length < 3) {
      setError(true);
      return;
    }

    setError(false);

    axios
      .post(`${baseUrl}store/create-brand?brand=${brand}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Delete Promo
  const handleDelete = (id: number) => {
    axios
      .delete(`${baseUrl}store/delete-brand?brand_id=${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div>
        {/* Create Categories */}
        <label htmlFor="category" className="block mb-2 text-sm">
          Create Promo Codes
        </label>
        <input
          type="text"
          name="category"
          className="text-black bg-white rounded h-11 focus:outline-none ps-3 shadow shadow-zinc-900 lg:w-80 w-full block placeholder:text-sm"
          onChange={(e) => setBrand(e.currentTarget.value)}
          value={brand}
          placeholder="Promo Percentage"
        />
        {error && (
          <p className="text-xs mt-1 text-red-700">Category required</p>
        )}
        <button
          onClick={handleSubmit}
          className="btn-bg lg:w-80 w-full mt-3 rounded h-10 shadow shadow-zinc-900"
        >
          Create
        </button>

        {/* List of Categories */}
        <p className="mt-7">List of active Promos</p>
        <div className="bg-white  rounded shadow shadow-zinc-900 px-4 pt-3 lg:w-80 mt-3">
          {/* {promos.length > 0 ? ( */}
          {/* promos.map((p) => ( */}
          <div
            // key={p.id}
            className="grid grid-cols-12 hover:text-gray-400 mb-2"
          >
            <div className="mb-3 lg:col-span-7 col-span-11">
              {/* <p>{p.brand_names}</p> */}
              <p className="font-bold text-sm">Lorem ipsum dolor</p>
            </div>

            <div className="col-span-3">
              <p className="font-bold text-sm">2%</p>
            </div>

            <div className="lg:col-span-2 col-span-1">
              <button
                // onClick={() => handleDelete(p.id)}
                className="bi-trash-fill text-red-600"
              ></button>
            </div>
          </div>
          {/* )) */}
          {/* ) : (
            <p className="text-center pb-3">
              You haven't crate any promo codes yet
            </p>
          )} */}
        </div>
      </div>
    </>
  );
};

export default Promo;
