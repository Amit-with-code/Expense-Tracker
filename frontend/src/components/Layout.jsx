// src/components/Layout.jsx
import Sidebar from "./Sidebar";
import ChatBox from "./ChatBox";

export default function Layout({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-gray-100 min-h-screen p-6 ">
        {children}
      </div>
      {/* checking how it like   */}
       {/* <ChatBox /> */}
    </div>
  );
}