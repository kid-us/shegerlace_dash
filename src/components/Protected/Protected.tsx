import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import baseUrl from "../../services/request";
import useAuth from "../../store/useAuth";

interface ProtectedProps {
  children: React.ReactNode;
}

export interface UserProps {
  id: number;
  username: string;
}

const Protected = ({ children }: ProtectedProps) => {
  const access_token = localStorage.getItem("token");

  const navigate = useNavigate();

  const { login } = useAuth();

  useEffect(() => {
    if (access_token) {
      axios
        .get<UserProps>(`${baseUrl}/api/v2/auth/admin/me`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
            "Access-Control-Allow-Origin": "*",
          },
        })
        .then((response) => {
          login(response.data.id, response.data.username);
        })
        .catch(() => {
          navigate("/login");
        });
    } else {
      navigate("/login");
    }
  }, []);

  return children;
};

export default Protected;