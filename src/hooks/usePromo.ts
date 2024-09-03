import { useEffect, useState } from "react";
import axios from "axios";
import baseUrl from "../services/request";

export interface BrandItem {
  id: number;
  brand_names: string;
}

export interface Brand {
  brands: BrandItem[];
}

const usePromo = () => {
  const [brands, setBrands] = useState<BrandItem[]>([]);

  useEffect(() => {
    // Fetch Brands
    const fetchBrands = async () => {
      try {
        const response = await axios.get<Brand>(`${baseUrl}store/get-brands`, {
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420",
          },
        });
        setBrands(response.data.brands);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBrands();
  }, []);

  return {
    brands,
  };
};

export default usePromo;