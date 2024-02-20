import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
// import PostOffice from "./PostOffice";

export default function Debounce() {
  const [pincode, setPincode] = useState("");
  const [postOffice, setPostOffice] = useState([]);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    try {
      const timeoutId = setTimeout(async () => {
        const { data } = await axios.get(
          `https://api.postalpincode.in/pincode/${pincode}`
        );
        console.log(pincode);
        setPostOffice(data);
        console.log({ postOffice });
        setReady(true);
      }, 2000);
      return () => clearTimeout(timeoutId);
    } catch (error) {
      console.error(error.message);
    }
  }, [pincode]);
  return (
    <div className="w-screen  flex flex-col items-center justify-center gap-5 p-10 ">
      <div className="text-6xl text-[#f7e700ff]">Daakiya</div>
      <div className="flex flex-col items-center justify-center gap-1">
        <span className="text-xl font-bold text-white">Search your Nearby Post Office</span>
        <input
          placeholder="Search pincode"
          className="border-8 border-[#f7e700ff] rounded-md py-1 px-2 text-[#ad2924ff]  font-bold"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
        />
      </div>
      {ready && (
        <div>
          {postOffice.map((post, index) => {
            return (
              <div key={index}>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-4 ">
                  {post.Status === "Success" &&
                    post["PostOffice"].map((p, i) => {
                      return (
                        <div
                          className="flex flex-col shadow text-xl text-white  font-semibold shadow-[#f7e700ff] shadow-black items-center justify-center py-4 px-5 text-center"
                          key={i}
                        >
                          <span>Name: {p.Name}</span>
                          <span>BranchType: {p.BranchType}</span>
                          <span>DeliveryStatus: {p.DeliveryStatus}</span>
                          <span>Circle: {p.Circle}</span>
                          <span>District: {p.District}</span>
                          <span>Division: {p.Division}</span>
                          <span>Region: {p.Region}</span>
                          <span>Block: {p.Block}</span>
                          <span>State: {p.State}</span>
                          <span>Country: {p.Country}</span>
                          <span>Pincode: {p.Pincode}</span>
                        </div>
                      );
                    })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
