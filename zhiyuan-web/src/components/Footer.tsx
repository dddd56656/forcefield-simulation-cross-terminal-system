// components/Footer.tsx
import React from "react";

/** 底栏组件 */
const Footer: React.FC = () => (
  <footer className="w-full h-12 bg-white border-t flex items-center justify-center text-gray-400 text-sm">
    &copy; {new Date().getFullYear()} MyApp. All rights reserved.
  </footer>
);

export default Footer;
