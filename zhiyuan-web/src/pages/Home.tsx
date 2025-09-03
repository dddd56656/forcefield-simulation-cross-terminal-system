// /src/pages/Home.tsx
import React, { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";

const Home: React.FC = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    fetchUser();
  }, []);

  return (
    <div>
      <h2>首页</h2>
      {user ? (
        <div>欢迎，{user.email}</div>
      ) : (
        <div>请登录。</div>
      )}
    </div>
  );
};

export default Home;
