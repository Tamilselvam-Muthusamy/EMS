import Sidenav from "@src/components/Sidenav";
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";

function Home() {
  const date = new Date().getFullYear();
  return (
    <div className="background-pattern flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-56">
        <Sidenav />
      </div>

      <div className="relative mx-2 flex flex-grow flex-col overflow-y-hidden rounded-md bg-white p-4 shadow-md max-sm:mb-2 md:my-4">
        <motion.div
          className="absolute right-0 top-0 z-50  w-full bg-sky-50"
          initial={{ y: "-100%" }}
          animate={{ y: "100%" }}
          transition={{ duration: 1.7, ease: [0.2, 1, 0.2, 1] }}
        />
        <motion.div
          className="relative flex-grow overflow-y-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2 }}
        >
          <Outlet />
        </motion.div>
        <footer className="flex justify-center items-center text-center tracking-wider font-medium text-gray-800  bg-white mt-auto max-sm:hidden max-lg:tracking-tighter ">
          Copyright © {date} Employee Management System. All rights reserved.
        </footer>
      </div>
    </div>
  );
}

export default Home;
