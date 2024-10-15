import { AuthContext } from "@src/context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Protected({ children }: any) {
  let authContext = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    if (!authContext?.isUserAuthenticated) {
      navigate("/");
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-[360px]">
        Please wait . . .
      </div>
    );
  }
  return children;
}

export default Protected;
