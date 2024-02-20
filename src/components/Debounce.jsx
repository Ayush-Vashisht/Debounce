import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

export default function Debounce() {
  const [pincode, setPincode] = useState("");
  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      console.log({ pincode });
      const { data } = await axios.get(
        `https://api.postalpincode.in/pincode/${pincode}`
      );
      console.log({ data });
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [pincode]);
  return (
    <div className="w-screen  flex flex-col items-center justify-center gap-2 p-10 ">
      <span className="text-xl font-semibold ">Search your pincode</span>
      <input
        placeholder="Search pincode"
        className="border border-black rounded-md "
        value={pincode}
        onChange={(e) => setPincode(e.target.value)}
      />
    </div>
  );
}
